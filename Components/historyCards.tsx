import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import {Grid } from "@mui/material";
import HistoryCardsStudy from "./historyCardsStudy";
import HistorySmallButtons from "./historySmallButtons";

const HistoryCards: React.FC<{ studyId: string }> = ({ studyId }) => {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSeeParticipantsClick = () => {
    router.push(`/participants/${studyId}`);
  };

  const handleMarkCompleteClick = () => {
    setIsCompleted(prevState => !prevState);
  };

  const handleDiversityClick = () => {
    router.push(`/diversity/${studyId}`);
  };

  return (
    <Grid container display="flex" flexDirection="row" justifyContent="space-evenly">
      <HistoryCardsStudy studyId={studyId} />
      <HistorySmallButtons buttonWidth = "15em" background="#1F5095" title="See Participants" fx={handleSeeParticipantsClick} />
      <HistorySmallButtons buttonWidth = "15em" background={isCompleted ? "#D7BE69" : "#1870A0"} title={isCompleted ? "Done" : "Mark Completed"}  fx={handleMarkCompleteClick} />
      <HistorySmallButtons buttonWidth = "15em" background = "#5293B7" title="Diveristy" fx={handleDiversityClick} />
    </Grid>
  )
}

export default HistoryCards;
