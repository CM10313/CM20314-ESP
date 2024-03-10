import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {Grid, useMediaQuery} from "@mui/material";
import HistoryCardsStudy from "./historyCardsStudy";
import HistorySmallButtons from "./historySmallButtons";
import { fetchAllStudiesByDepartment } from "../firebase/firestore";

const HistoryCards: React.FC<{ studyId: string, title:string, date:string, department:string }> = ({ studyId, title, date, department}) => {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);
  
  const queryData = {
    studyId: studyId,
    studyTitle: title,
    studyDate: date, 
    studyDepartment: department
  }

  const handleSeeParticipantsClick = () => {
    router.push({
      pathname: `/deepHistory/`,
      query: queryData
    });
  };

  const handleMarkCompleteClick = () => {
    setIsCompleted(prevState => !prevState);
  };

  const handleDiversityClick = () => {
    router.push(`/diversity/${studyId}`);
  };
  
  
  const isMobile = useMediaQuery('(max-width:1000px)')
  return (
      <Grid container display="flex" flexDirection="row" justifyContent="space-evenly">
        <Grid item xs={isMobile?6:4.5}><HistoryCardsStudy studyId={studyId} title={title} date={date} /></Grid>
        <Grid item xs={isMobile?6:2.5}> <HistorySmallButtons background="#1F5095" title="See Participants" fx={handleSeeParticipantsClick} /></Grid>
        <Grid item xs={isMobile?6:2.5}> <HistorySmallButtons background={isCompleted ? "#D7BE69" : "#1870A0"} title={isCompleted ? "Done" : "Mark Completed"}  fx={handleMarkCompleteClick} /></Grid>
        <Grid item xs={isMobile?6:2.5}><HistorySmallButtons background = "#5293B7" title="Diveristy" fx={handleDiversityClick} /></Grid>
      </Grid>
  )
}

export default HistoryCards;
