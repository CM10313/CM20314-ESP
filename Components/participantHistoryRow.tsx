import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import {Grid, useMediaQuery} from "@mui/material";
import HistoryCardsStudy from "./historyCardsStudy";
import HistorySmallButtons from "./historySmallButtons";
import { fetchDocumentById, updateDocument } from "../firebase/firestore";
import FeedbackForms from "./Ethics/FeedbackForms";
import { addStudyToUsersDisputed, addUserToDisputedInStudy, removeStudyFromUsersJoined, removeUserFromJoinedInStudy, updateStudyRatedStatus } from "../Utils/studyResolutionFuncs";


const ParticipantHistoryRow: React.FC<{ studyId: string, author:string, date:string,location:string,title:string,publisherId:string,isPaid:boolean,userId:string,department:string,triggerGetStudies: () => void; username:string,isRated:boolean}> = ({ studyId, author, date,title,publisherId,isPaid,location,userId,department,triggerGetStudies,username,isRated }) => {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);  
  const [rateClicked, setRateClicked] = useState(isRated);

  const handleDisputeClick = async () => {
    try {
      // Call the asynchronous functions and await their completion
      await Promise.all([addStudyToUsersDisputed(department,publisherId,studyId,userId), addUserToDisputedInStudy(department,publisherId,studyId,userId)]);
      
      // Once both asynchronous functions are completed, triggerGetStudies
      triggerGetStudies();
    } catch (error) {
      console.error('Error handling dispute:', error);
      // Handle errors appropriately
    }
  };
  
  const handleWithdrawClick = async() => {
    try {
      // Call the asynchronous functions and await their completion
      await Promise.all([removeStudyFromUsersJoined(department,publisherId,studyId,userId), removeUserFromJoinedInStudy(department,publisherId,studyId,userId)]);
      
      // Once both asynchronous functions are completed, triggerGetStudies
      triggerGetStudies();
    } catch (error) {
      console.error('Error handling withdrawl:', error);
      // Handle errors appropriately
    }
  };
   const markAsRated=()=>{
    setRateClicked(true)
    updateStudyRatedStatus(department,publisherId,studyId,userId);
  };
  
const isMobile = useMediaQuery('(max-width:1000px)')

  return (
      <Grid container display="flex" flexDirection="row" justifyContent="space-evenly">
        <Grid item xs={isMobile?6:4.5}><HistoryCardsStudy studyId={studyId} author={author} date={date} isPaid={isPaid} title={title} location={location}/></Grid>
        <Grid item xs={isMobile?6:2.5}> <HistorySmallButtons background="#1F5095" title="Dispute" fx={handleDisputeClick} /></Grid>
        <Grid item xs={isMobile?6:2.5}> <FeedbackForms userId={publisherId} destinationName={author}  usersName={username} markAsRated={markAsRated} ratingStatus={rateClicked}></FeedbackForms></Grid>
        <Grid item xs={isMobile?6:2.5}><HistorySmallButtons background = "#CD386B" title="Withdraw" fx={handleWithdrawClick} /></Grid>
      </Grid>
  )
}

export default ParticipantHistoryRow;


