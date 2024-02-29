import {Grid} from "@mui/material";
import { useRouter } from "next/router";
import HistoryCardsStudy from "./historyCardsStudy";
import HistorySmallButtons from "./historySmallButtons";

const HiddenStudiesCards: React.FC<{ studyId: string, author:string, date:string }> = ({ studyId, author, date }) => {
    const router = useRouter();
    const handleReview = () => {
        router.push(`/review/${studyId}`);
    }

    return (
        <Grid container display="flex" flexDirection="row" justifyContent="space-evenly">
            <HistoryCardsStudy studyId={studyId} author={author} date={date} />
            <HistorySmallButtons buttonWidth="10em" background="#1F5095" title="Review" fx={handleReview} />
        </Grid>
    
    )
    

}

export default HiddenStudiesCards;