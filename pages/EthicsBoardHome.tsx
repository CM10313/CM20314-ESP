import React, { useEffect, useState } from 'react';
import EthicsGridComponent from '../Components/Ethics/EthicsCardGrouper';
import TriangleBackground from '../Components/TriangleBackground';
import Navbar from '../Components/navbar';
import { Box } from '@mui/material';
import SearchBar from '../Components/SearchBar';
import YourScreenComponent2 from '../Components/Ethics/shiftPage';
import '../Components/Ethics/EthicsStyle.css';
import {fetchAllStudiesByDepartment}  from '../firebase/firestore';
import {addMultipleDocuments} from '../firebase/firestore';
import  {clearCollection} from '../firebase/firestore';
import {setupDatabaseListener} from '../firebase/firestore';
import SearchableList from '../Components/SearchableList';
import { useAuth } from '../Context/AuthContext';

type StudyData = {
    name: string;
    studyId: string;
    appliedDate: string;
    profilePicture: string;
    Status?: string;
};

const EthicsBoardHomeLayout: React.FC = () => {
    const [studyData, setStudyData] = useState<any[]>([]);
    const [mergedData, setMergedData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await clearCollection('Studies');
                const DepartmentStudiesData = await fetchAllStudiesByDepartment('Computer Science');
                console.log(DepartmentStudiesData);
                if (DepartmentStudiesData) {
                    // Map and extract specific fields
                    const extractedData = DepartmentStudiesData.map((study) => ({
                        Department: study.studyData.department,
                        Name: study.studyData.publisherName,
                        ResearcherID: study.studyData.publisherId,
                        AppliedDate: study.studyData.dateOfPublish,
                        departmentStudyId: study.studyId,
                        Status: study.studyData.studyObj.EthicsApprovalObject.status,
                    }));

                    // Now 'extractedData' contains an array of objects with only the specified fields
                    addMultipleDocuments('Studies', extractedData, 'departmentStudyId');
                } else {
                    console.error('DepartmentStudiesData is undefined.');
                }
            } catch (error) {
                console.error('Error fetching department studies:', error);
            }
        };

        fetchData(); // Fetch data every time the component mounts

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []); // Empty dependency array triggers the effect only on mount

    useEffect(() => {
        const unsubscribeStudies = setupDatabaseListener('Studies', (data: any) => {
            setStudyData(data || []);
        });

        return () => {
            unsubscribeStudies();
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const merged = await Promise.all(
                    studyData.map((entry) => ({
                        name: entry.Name, // Use the existing username from entry
                        studyId: entry.departmentStudyId,
                        appliedDate: entry.AppliedDate,
                        profilePicture: '',
                        Status: entry.Status,
                    }))
                );
                setMergedData(merged);
            } catch (error) {
                console.error('Error fetching study information:', error);
            }
        };

        fetchData();
    }, [studyData]);

    const DepartmentStudiesDataList: StudyData[] = mergedData;

    const StudyReviewDataList: StudyData[] = mergedData.filter((item) => item.Status === 'In review');

    const StudyDisputeDataList: StudyData[] = mergedData.filter((item) => item.Status === 'Dispute'  || item.Status === 'resolve Requested');

    const [DepartmentSearchResults, setDepartmentSearchResults] = useState<StudyData[]>([]);
    const [DisputedSearchResults, setDisputedSearchResults] = useState<StudyData[]>([]);
    const [ReviewSearchResults, setReviewSearchResults] = useState<StudyData[]>([]);

    const handleSearchReturn = (searchTerm: string, dataList: StudyData[], setResults: React.Dispatch<React.SetStateAction<StudyData[]>>) => {
        const newSearchResults = dataList.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setResults(newSearchResults);
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        // Your cleanup code here
        console.log('Component will unmount or page is about to be unloaded.');

        // Optionally, you can provide a custom message for confirmation
        const confirmationMessage = 'Are you sure you want to leave?';
        event.returnValue = confirmationMessage; // Standard for most browsers
        return confirmationMessage; // For some older browsers
    };

    useEffect(() => {
        // Attach the beforeunload event listener
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className="container">
            <TriangleBackground />

            <div className="horizontalBoxes">
                <Box className="box">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h1 style={{ textAlign: 'center', color: 'black', marginTop: '-2vh' }}>Department Studies</h1>
                        <SearchBar onReturn={(searchTerm) => handleSearchReturn(searchTerm, DepartmentStudiesDataList, setDepartmentSearchResults)} />
                    </div>
                    <YourScreenComponent2
                        itemsPerPage={6}
                        GridComponent={<EthicsGridComponent rowSpacing={2} cardInputList={DepartmentStudiesDataList} numberOfItemsPerRow={3} CardStatus="Department" />}
                    />
                </Box>

                <Box className="box">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h1 style={{ textAlign: 'center', color: 'black', marginTop: '-2vh' }}>Review</h1>
                        <SearchBar onReturn={(searchTerm) => handleSearchReturn(searchTerm, StudyReviewDataList, setReviewSearchResults)} />
                    </div>
                    <YourScreenComponent2
                        itemsPerPage={6}
                        GridComponent={<EthicsGridComponent rowSpacing={2} cardInputList={StudyReviewDataList} numberOfItemsPerRow={3} CardStatus="Review" />}
                    />
                </Box>
            </div>

            <div>
                <Box className="DisputeBox">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h1 style={{ textAlign: 'center', color: 'black', marginTop: '-2vh' }}>Disputed</h1>
                        <SearchBar onReturn={(searchTerm) => handleSearchReturn(searchTerm, StudyDisputeDataList, setDisputedSearchResults)} />
                        <YourScreenComponent2
                            itemsPerPage={6}
                            GridComponent={<EthicsGridComponent rowSpacing={2} cardInputList={StudyDisputeDataList} numberOfItemsPerRow={6} CardStatus="Disputed" />}
                        />
                    </div>
                </Box>
            </div>
        </div>
    );
};

const EthicsBoardHome: React.FC = () => {
    const {isLoggedIn,username,overallRating,id,department,accountType} = useAuth();
    return (
        <div>
            <TriangleBackground />
            <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0} accountType={accountType?accountType:"Guest Type"} />
            <EthicsBoardHomeLayout />
        </div>
    );
};

export default EthicsBoardHome;