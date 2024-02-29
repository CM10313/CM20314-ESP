import React, { useEffect, useState } from 'react';
import EthicsGridComponent from '../Components/Ethics/EthicsCardGrouper';
import TriangleBackground from '../Components/TriangleBackground';
import Navbar from '../Components/navbar';
import { Box } from '@mui/material';
import SearchBar from '../Components/SearchBar';
import YourScreenComponent2 from '../Components/Ethics/shiftPage';
import '../Components/Ethics/EthicsStyle.css';
import { fetchDocuments, fetchDocumentById } from '../firebase/firestore';
import setupDatabaseListener from '../firebase/firebaseListener';
import SearchableList from '../Components/SearchableList';

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
                    studyData.map(async (entry) => {
                        const userData: any = await fetchDocumentById('users', entry.ResearcherID);
                        return {
                            name: userData.username,
                            studyId: entry.id,
                            appliedDate: entry.AppliedDate,
                            profilePicture: '',
                            Status: entry.Status
                        };
                    })
                );
                setMergedData(merged);
            } catch (error) {
                console.error('Error fetching study information:', error);
            }
        };

        fetchData();
    }, [studyData]);

    console.log(mergedData)

    const DepartmentStudiesDataList: StudyData[] = mergedData;

    const StudyReviewDataList: StudyData[] = mergedData.filter(item => item.Status === 'In review');

    const StudyDisputeDataList: StudyData[] = mergedData.filter(item => item.Status === 'Dispute');


    const [DepartmentSearchResults, setDepartmentSearchResults] = useState<StudyData[]>([]);
    const [DisputedSearchResults, setDisputedSearchResults] = useState<StudyData[]>([]);
    const [ReviewSearchResults, setReviewSearchResults] = useState<StudyData[]>([]);

    const handleSearchReturn = (searchTerm: string, dataList: StudyData[], setResults: React.Dispatch<React.SetStateAction<StudyData[]>>) => {
        
            const newSearchResults = dataList.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setResults(newSearchResults);
    };

    
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
                        GridComponent={<EthicsGridComponent rowSpacing={2} cardInputList={DepartmentStudiesDataList} numberOfItemsPerRow={3} CardStatus='Department' />}
                    />
                </Box>

                <Box className="box">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h1 style={{ textAlign: 'center', color: 'black', marginTop: '-2vh' }}>Review</h1>
                        <SearchBar onReturn={(searchTerm) => handleSearchReturn(searchTerm, StudyReviewDataList, setReviewSearchResults)} />
                    </div>
                    <YourScreenComponent2
                        itemsPerPage={6}
                        GridComponent={<EthicsGridComponent rowSpacing={2} cardInputList={StudyReviewDataList} numberOfItemsPerRow={3} CardStatus='Review' />}
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
                            GridComponent={<EthicsGridComponent rowSpacing={2} cardInputList={StudyDisputeDataList} numberOfItemsPerRow={6} CardStatus='Disputed' />}
                        />
                    </div>
                </Box>
            </div>
        </div>
    );
};

const EthicsBoardHome: React.FC = () => {
    return (
        <div>
            <TriangleBackground />
            <Navbar name={''} rating={0} />
            <EthicsBoardHomeLayout />
        </div>
    );
};

export default EthicsBoardHome;