import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import {Grid, useMediaQuery} from "@mui/material";
import HistoryCardsStudy from "./historyCardsStudy";
import HistorySmallButtons from "./historySmallButtons";

const HistoryCards: React.FC<{ studyId: string, author:string, date:string,title:string,location:string }> = ({ studyId, author, date ,title, location}) => {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);

  // This is the data that is passed to the deep History page when participants is clicked
  // At the moment only all the list of the participants and the ID of the study is sent
  // Data for paid, disputed and approval needs to be considered
  const queryData = {
    studyId: studyId,
    participantStudyIDs: ["123456", "789012", "234566"],
    paidUserIDs: ["1234234", "234324", "32432", "23423"],
    disputedUserIDs: ["1234234", "234324", "32432", "23423"],
    approvalUserIDs: ["1234234", "234324", "32432", "23423"],
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
        <Grid item xs={isMobile?6:4.5}><HistoryCardsStudy studyId={studyId} author={author} date={date} title={title} location={location} /></Grid>
        <Grid item xs={isMobile?6:2.5}> <HistorySmallButtons background="#1F5095" title="See Participants" fx={handleSeeParticipantsClick} /></Grid>
        <Grid item xs={isMobile?6:2.5}> <HistorySmallButtons background={isCompleted ? "#D7BE69" : "#1870A0"} title={isCompleted ? "Done" : "Mark Completed"}  fx={handleMarkCompleteClick} /></Grid>
        <Grid item xs={isMobile?6:2.5}><HistorySmallButtons background = "#5293B7" title="Diveristy" fx={handleDiversityClick} /></Grid>
      </Grid>
  )
}

export default HistoryCards;
