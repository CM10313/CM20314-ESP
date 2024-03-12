import {Grid, useMediaQuery} from "@mui/material";
import HistoryCardsStudy from "../Components/historyCardsStudy";
import HistorySmallButtons from "../Components/historySmallButtons";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchUserById, fetchDocumentById } from "../firebase/firestore";
import FeedbackForms from "./Ethics/FeedbackForms";
import { updateStudyRatedStatus } from "../Utils/studyResolutionFuncs";


const DeepHistoryRow: React.FC<{ participantId: string,name:string,isRated:boolean,publisherId:string,department:string,studyId:string,username:string }> = ({ participantId,name,isRated,publisherId,department,studyId,username }) => {
    
    const router = useRouter();
    const [rateClicked, setRateClicked] = useState(isRated);
    const [payClicked, statePayClicked] = useState(false);
    // Need to modify these functions with the backend 
    const handleRateClick = () => {
        setRateClicked(prevState => !prevState);
    };

    const handlePayChange = () => {
        statePayClicked(prevState => !prevState);
    };
    const handlePush = () => {
        router.push('/viewParticipantDetails?uid=PNeqhkPm0Le0LcfOK1caYeVoCYB3&studyId=jd1kQsORcZkDgQnlZTjt');
    };

    const handleDetailsClick = () => {
        router.push(`/viewParticipantDetails?uid=${participantId}&studyId=${studyId}`);
      };
      const markAsRated=()=>{
        setRateClicked(true)
        updateStudyRatedStatus(department,publisherId,studyId,participantId);
      };
    const isMobile = useMediaQuery('(max-width:1000px)')
    return (
        <Grid container display="flex" flexDirection="row" justifyContent="space-evenly">
            <Grid item xs={isMobile?6:4.5}><HistoryCardsStudy studyId={participantId} title={name} date="03/11/2003" author={"test"} /></Grid>
            <Grid item xs={isMobile?6:2.5}> <HistorySmallButtons background="#1F5095" title="Details" fx={handleDetailsClick} /></Grid>
            <Grid item xs={isMobile?6:2.5}> <FeedbackForms userId={participantId} destinationName={name}  usersName={username} markAsRated={markAsRated} ratingStatus={rateClicked}></FeedbackForms></Grid>
            <Grid item xs={isMobile?6:2.5}><HistorySmallButtons background={payClicked ? "#D7BE69" : "#1870A0"} title={payClicked ? "Paid" : "Payment Code"} fx={handlePayChange} /></Grid>
        </Grid>
    );

}

export default DeepHistoryRow;