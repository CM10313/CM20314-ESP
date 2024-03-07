import {Grid, useMediaQuery} from "@mui/material";
import { useRouter } from "next/router";
import HistoryCardsStudy from "./historyCardsStudy";
import HistorySmallButtons from "./historySmallButtons";

export interface DisputeRowProps{
    studyTitle:string;
    publisher:string;
    date:string;
    studyId:string;
}
const DisputeRow: React.FC<DisputeRowProps> = ({ studyTitle, publisher, date,studyId }) => {
    const router = useRouter();
    const handleReview = () => {
        router.push(`/review/${studyId}`);
    }
    const isMobile = useMediaQuery('(max-width:1000px)')
    return (
        <Grid container display="flex" flexDirection="row" justifyContent="space-evenly">
            <Grid item xs={isMobile?6:8}><HistoryCardsStudy studyId={studyTitle} author={publisher} date={date} /></Grid>
            <Grid item xs={isMobile?6:4}> <HistorySmallButtons background="#1870A0" title="Review" fx={handleReview} /></Grid>
        </Grid>
    )
}

export default DisputeRow;