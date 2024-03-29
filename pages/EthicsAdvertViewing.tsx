import { Button } from "@mui/material";
import AdvertReviewOptions from "../Components/Ethics/AdvertReviewOptions";
import AdvertViewer from "../Components/Ethics/AdvertViewer";
import TriangleBackground from "../Components/TriangleBackground";
import Navbar from "../Components/navbar";
import  {createFieldIfNotExists} from "../firebase/firestore";
import {fetchDocumentById} from "../firebase/firestore";
import  {fetchDocuments} from "../firebase/firestore";
import  {updateDocument} from "../firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../Context/AuthContext";
import Highlighter from "../Components/Ethics/Highlighter";
import RequirementsCardForEthics from "../Components/studyRequrimentsCardForEthics";





interface EthicsAdvertViewingProps {
    name: string;
    appliedDate: string;
    studyId: string;
    ReviewStatus: string;
    profilePicture: string;
}

const EthicsAdvertViewing: React.FC = () => {
    const {isLoggedIn,username,overallRating,id,department,accountType} = useAuth();
    const handleAddDocument = async () => {

    };

    const router = useRouter();
    const testAdvertCardProps = router.query as unknown as EthicsAdvertViewingProps;
    const [storedStudyData, setStoredStudyData] = useState<any>(null);
    const [storedUserData, setStoredUserData] = useState<any>(null);


    const fetchData = async () => {
        try {
            const studyDocs = await fetchDocuments('Studies');

            for (const doc of studyDocs || []) {
                await updateDocument(
                    `departments/${doc.Department}/Researchers/${doc.ResearcherID}/studies`,
                    doc.departmentStudyId,
                    {
                        'studyObj.EthicsApprovalObject.status': doc.Status,
                    }
                );
            }

            const specStudy = await fetchDocumentById('Studies', testAdvertCardProps.studyId);
            const specResearcherID = specStudy?.ResearcherID;
            createFieldIfNotExists('users', specResearcherID, 'Feedback', 'array')
            const specDepartment = specStudy?.Department;

            // Return the result of fetchDocumentById
            return fetchDocumentById(
                `departments/${specDepartment}/Researchers/${specResearcherID}/studies`,
                testAdvertCardProps.studyId
            );
        } catch (error) {
            console.error('Error updating documents:', error);
        }
    };

    useEffect(() => {
    
        const fetchDataAndStore = async () => {
            try {
                const result = await fetchData();

                if (!storedStudyData) {
                    setStoredStudyData(result);
                }

                const userData = await fetchDocumentById('users', result?.publisherId);

                if (userData) {
                    setStoredUserData(userData);
                } else {
                    console.warn('User data not available');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataAndStore();

        console.log(storedUserData?.reviewObject.reviews)

    }, []);



    return (
        <div>
            <Highlighter department={department} studyId={testAdvertCardProps.studyId} ResearcherId={storedStudyData?.publisherId}/>
            <TriangleBackground />
            <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0} accountType={accountType?accountType:"Guest Type"}/>
            {testAdvertCardProps && storedStudyData && storedUserData && (
                <div style={{ marginTop: '5px' }}>
                    <AdvertViewer
                        name={storedStudyData?.title}

                        Compensation={["Amount: " + storedStudyData?.studyObj.CompensationObject.currency + storedStudyData?.studyObj.CompensationObject.amount,
                        storedStudyData?.studyObj.CompensationObject.description]}

                        studyDescription={storedStudyData?.description || ''}
                        subjectRelatedFields={storedStudyData?.relatedFields}
                        dates={[
                            "Start date: " + storedStudyData?.preliminaryDate,
                            "Closing date: " + storedStudyData?.closingDate,
                        ]}
                        contactDetailsAndExtLinks={[storedUserData.email, storedUserData.phoneNumber, storedStudyData.externalLink]}
                        ResearcherFeedBack={storedUserData?.reviewObject.reviews}
                    />
                </div>
            )}

            {testAdvertCardProps && storedStudyData && storedUserData && (
                <div style={{ marginTop: '-10px' }}>
                    <AdvertReviewOptions AdvertCardProps={testAdvertCardProps} ResearcherId={storedStudyData?.publisherId} Department={storedStudyData?.department} communicationsList={storedStudyData?.studyObj.EthicsApprovalObject.communicationHistory} />
                </div>
            )}
            <div>
                <Button onClick={handleAddDocument}
                    variant="contained"
                    style={{
                        backgroundImage: 'url(https://st3.depositphotos.com/1144687/18538/i/1600/depositphotos_185380192-stock-illustration-economy-and-money-concept.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        border: '2px solid #ffffff',
                        color: '#ffffff',
                        fontWeight: 'bold',
                        marginTop: '15px',
                        padding: '15px',
                        borderRadius: '20px',
                        width: '22%',
                        bottom: '110vh',
                        left: '150vh',
                        cursor: 'pointer',
                    }}
                >
                    View Current Sample Demographics
                </Button>

                <div style={{ position: 'absolute', top: '140px', right: '75px' }}>
                    <RequirementsCardForEthics />
                </div>

            </div>
        </div>
    );
};

export default EthicsAdvertViewing;