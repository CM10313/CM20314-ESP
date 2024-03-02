import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import {Grid, useMediaQuery} from "@mui/material";
import HistoryCardsStudy from "./historyCardsStudy";
import HistorySmallButtons from "./historySmallButtons";

const ParticipantHistoryRow: React.FC<{ studyId: string, author:string, date:string }> = ({ studyId, author, date }) => {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);  
  const [rateClicked, stateRateClicked] = useState(false);

  const handleDisputeClick = () => {
    router.push(`/dispute/${studyId}`);
  };

  const handleWithdrawClick = () => {
    setIsCompleted(prevState => !prevState);
    router.push(`/withdraw/${studyId}`);
  };

  const handleRateChange = () => {
    stateRateClicked(prevState => !prevState);
};
const isMobile = useMediaQuery('(max-width:1000px)')
  return (
      <Grid container display="flex" flexDirection="row" justifyContent="space-evenly">
        <Grid item xs={isMobile?6:4.5}><HistoryCardsStudy studyId={studyId} author={author} date={date} /></Grid>
        <Grid item xs={isMobile?6:2.5}> <HistorySmallButtons background="#1F5095" title="Dispute" fx={handleDisputeClick} /></Grid>
        <Grid item xs={isMobile?6:2.5}> <HistorySmallButtons  background={rateClicked ? "#D7BE69" : "#1870A0"} title={rateClicked ? "Rated" : "Rate"}  fx={handleRateChange} /></Grid>
        <Grid item xs={isMobile?6:2.5}><HistorySmallButtons background = "#CD386B" title="Withdraw" fx={handleWithdrawClick} /></Grid>
      </Grid>
  )
}

export default ParticipantHistoryRow;
