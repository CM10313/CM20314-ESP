import { Grid} from "@mui/material";
import HistoryCards from "../Components/historyCards";
import SearchableList from "../Components/SearchableList";
import HiddenStudiesCards from "../Components/hiddenStudies";
import DisputeContactCard from "../Components/disputeContact";
import Navbar from "../Components/navbar";
import { useAuth } from "../Context/AuthContext";

export default function ResearherHistoryScreen() {
    const {isLoggedIn,setAuth,username,overallRating,id} = useAuth();
    
    // Once data is fetched all we need is ID of those to be inseerted into these accordingly
    // front end will need to be modified below to retrieve the author and date from the IDs in <HistoryCards /> and <HiddenStudiesCards />
    const studyIdList = [
        "123456",
        "7890123",
        "23433423",
        "34324423", 
        "432423423"
    ]

    const hiddenIdList = [
        "123456",
        "7890123",
        "23433423",
        "34324423", 
        "432423423"
    ]

    const historyCardList = studyIdList.map((studyId,index) => (
        <HistoryCards key={index} studyId={studyId} author={"study author"} date={"study date"} />
    ))

    const hiddenStudiesList = hiddenIdList.map((hiddenStudyId,index) => (
        <HiddenStudiesCards  key={index} studyId={hiddenStudyId} author={"study author"} date={"study date"} />
    ))

    return (
        <Grid container>
            <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0}/>
            <Grid item sm={12} md={8}>
                <SearchableList 
                    rowSpacing={0}
                    cardInputList={historyCardList}
                    numberOfItemsPerRow={1}
                    width={"100%"}
                    title={"History"}
                    titleSize={45}
                    marginTop={5} searchBarEnabled={true} progressBarEnabled={false} >  
                </SearchableList>
            </Grid>

            <Grid item sm={12} md={4}>
                <SearchableList
                    rowSpacing={0}
                    cardInputList={hiddenStudiesList}
                    numberOfItemsPerRow={1}
                    width={"100%"}
                    title={"Hidden"}
                    titleSize={45}
                    marginTop={5} searchBarEnabled={true} progressBarEnabled={false}  >
                </SearchableList>
            </Grid>

            <Grid item 
                sm={12} md={12} 
                display = {"flex"}
                justifyContent={"center"}
                alignItems={"center"} > 
                <DisputeContactCard /> 
            </Grid>
        </Grid>
    );

}