import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import {Grid} from "@mui/material";
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

  return (
      <Grid container display="flex" flexDirection="row" justifyContent="space-evenly">
        <HistoryCardsStudy studyId={studyId} author={author} date={date} />
        <HistorySmallButtons buttonWidth = "15em" background="#1F5095" title="Dispute" fx={handleDisputeClick} />
        <HistorySmallButtons buttonWidth = "15em" background={rateClicked ? "#D7BE69" : "#1870A0"} title={rateClicked ? "Rated" : "Rate"}  fx={handleRateChange} />
        <HistorySmallButtons buttonWidth = "15em" background = "#CD386B" title="Withdraw" fx={handleWithdrawClick} />
      </Grid>
  )
}

export default ParticipantHistoryRow;
