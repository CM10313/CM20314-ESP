import {Grid, useMediaQuery} from "@mui/material";
import { useRouter } from "next/router";
import HistoryCardsStudy from "./historyCardsStudy";
import HistorySmallButtons from "./historySmallButtons";

export interface DisputeRowProps{
    studyTitle:string;
    publisher:string;
    date:string;
    studyId:string;
    buttonTitle:string;
    buttonFunction:()=>void;
    department:string;
    publisherId:string;
}
const DisputeRow: React.FC<DisputeRowProps> = ({ studyTitle, publisher, date,studyId,buttonFunction,department,buttonTitle}) => {
    const handleClick = () => {
       buttonFunction();
    }
    const isMobile = useMediaQuery('(max-width:1000px)')
    return (
        <Grid container display="flex" flexDirection="row" justifyContent="space-evenly">
            <Grid item xs={isMobile?6:8}><HistoryCardsStudy studyId={studyId} author={publisher} date={date} title={studyTitle} /></Grid>
            <Grid item xs={isMobile?6:4}> <HistorySmallButtons background="#1870A0" title={buttonTitle} fx={handleClick} /></Grid>
        </Grid>
    )
}

export default DisputeRow;