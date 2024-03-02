import {Grid, useMediaQuery} from "@mui/material";
import HistoryCardsStudy from "../Components/historyCardsStudy";
import HistorySmallButtons from "../Components/historySmallButtons";
import { useState } from "react";
import { useRouter } from "next/router";

const DeepHistoryRow: React.FC<{ studyId: string }> = ({ studyId }) => {
    
    const router = useRouter();
    

    const [rateClicked, stateRateClicked] = useState(false);
    const [payClicked, statePayClicked] = useState(false);
    
    const handleRateChange = () => {
        stateRateClicked(prevState => !prevState);
    };

    const handlePayChange = () => {
        statePayClicked(prevState => !prevState);
    };
    
    
    const handleDetailsClick = () => {
        router.push(`/details/${studyId}`);
      };
      const isMobile = useMediaQuery('(max-width:1000px)')
    return (
        <Grid container display="flex" flexDirection="row" justifyContent="space-evenly">
             <Grid item xs={isMobile?6:4.5}><HistoryCardsStudy studyId={studyId} author="Dr. Adams" date="03/11/2003" /></Grid>
        <Grid item xs={isMobile?6:2.5}> <HistorySmallButtons background="#1F5095" title="Details" fx={handleDetailsClick} /></Grid>
        <Grid item xs={isMobile?6:2.5}> <HistorySmallButtons  background={rateClicked ? "#D7BE69" : "#1870A0"} title={rateClicked ? "Rated" : "Rate"}  fx={handleRateChange} /></Grid>
        <Grid item xs={isMobile?6:2.5}><HistorySmallButtons background={payClicked ? "#D7BE69" : "#1870A0"} title={payClicked ? "Paid" : "Payment Code"} fx={handlePayChange} /></Grid>
        </Grid>
    );

}

export default DeepHistoryRow;