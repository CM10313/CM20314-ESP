import { Button } from "@mui/material";
import AdvertReviewOptions from "../Components/Ethics/AdvertReviewOptions";
import AdvertViewer from "../Components/Ethics/AdvertViewer";
import TriangleBackground from "../Components/TriangleBackground";
import Navbar from "../Components/navbar";
import { addDocument, createFieldIfNotExists, fetchDocumentById, fetchDocuments, updateDocument, updateDocumentWithArray } from "../firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FeedbackForms from "../Components/Ethics/FeedbackForms";
import RequirementsCard from "../Components/studyRequirementsCard";
import HighlightDetector from "../Components/Ethics/Highlighter";


interface EthicsAdvertViewingProps {
    name: string;
    appliedDate: string;
    researcherId:string;
    department:string;
    studyId: string;
    ReviewStatus: string;
    profilePicture: string;
}

const ParticipantAdvertScreen: React.FC = () => {

    const router = useRouter();
    const testAdvertCardProps = router.query as unknown as EthicsAdvertViewingProps;
    const [storedStudyData, setStoredStudyData] = useState<any>(null);
    const [storedUserData, setStoredUserData] = useState<any>(null);


    console.log(testAdvertCardProps)

    const fetchStudyData = async () => {
        try {
            const studyDocs = await fetchDocumentById(`departments/${testAdvertCardProps.department}/Researchers/${testAdvertCardProps.researcherId}/studies`,testAdvertCardProps.studyId);
            setStoredStudyData(studyDocs)
        
            const specResearcherID = testAdvertCardProps?.researcherId;
            createFieldIfNotExists('users', specResearcherID, 'Feedback', 'array')
        

        } catch (error) {
            console.error('Error updating documents:', error);
        }
    }


    const fetchUserData = async () => {
        try {
            const studyDocs = await fetchDocumentById('users',testAdvertCardProps.researcherId);
            setStoredUserData(studyDocs)

        } catch (error) {
            console.error('Error updating documents:', error);
        }
    }
    

    useEffect(() => {
        const fetchDataAndStore = async () => {
            try {
              fetchStudyData()
              fetchUserData()
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataAndStore();

    }, []);
    console.log(storedStudyData)
    console.log(storedUserData)
    return (
        <div>
            <TriangleBackground />
            <Navbar name={""} rating={0} />
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
                        ResearcherFeedBack={storedUserData.Feedback}
                    />
                </div>
            )}
            <div>
           
                <div style={{ position: 'absolute', top: '150px', right: '75px' }}>
                     <RequirementsCard />
                </div>
            </div>
        </div>
    );
};

export default ParticipantAdvertScreen;