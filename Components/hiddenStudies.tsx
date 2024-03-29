import {Grid, useMediaQuery} from "@mui/material";
import { useRouter } from "next/router";
import HistoryCardsStudy from "./historyCardsStudy";
import HistorySmallButtons from "./historySmallButtons";


const HiddenStudiesCards: React.FC<{ studyId: string, author:string, date:string,title:string,location:string,department:string,publisherId:string }> = ({ studyId, author, date,title,location,department,publisherId }) => {


    const router = useRouter();
    const handleReview = () => {
        router.push({
            pathname: '/publishRejectionScreen',
            query: {
                studyId:studyId,
                department:department,
                ResearcherId:publisherId,
                name:author
             
            },

        })
    }
    const isMobile = useMediaQuery('(max-width:1000px)')
    return (
        <Grid container display="flex" flexDirection="row" justifyContent="space-evenly">
            <Grid item xs={isMobile?6:8}><HistoryCardsStudy studyId={studyId} author={author} date={date} title={title} location={location}/></Grid>
            <Grid item xs={isMobile?6:4}><HistorySmallButtons background="#1F5095" title="Review" fx={handleReview} /></Grid>
        </Grid>
    
    )
    

}

export default HiddenStudiesCards;