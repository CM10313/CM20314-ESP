import {Grid} from "@mui/material";
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

    return (
        <Grid container display="flex" flexDirection="row" justifyContent="space-evenly">
            <HistoryCardsStudy studyId={studyId} author="Dr. Adams" date="03/11/2003" />
            <HistorySmallButtons buttonWidth = "15em" background="#1F5095" title="Details" fx={handleDetailsClick} />
            <HistorySmallButtons buttonWidth = "15em" background={rateClicked ? "#D7BE69" : "#1870A0"} title={rateClicked ? "Rated" : "Rate"}  fx={handleRateChange} />
            <HistorySmallButtons buttonWidth = "15em" background={payClicked ? "#D7BE69" : "#1870A0"} title={payClicked ? "Paid" : "Payment Code"} fx={handlePayChange} />
        </Grid>
    );

}

export default DeepHistoryRow;