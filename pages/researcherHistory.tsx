import { Box, Grid, Typography, Container } from "@mui/material";
import HistoryCards from "../Components/historyCards";
import SearchableList from "../Components/SearchableList";
import HiddenStudiesCards from "../Components/hiddenStudies";
import DisputeContactCard from "../Components/disputeContact";
import Navbar from "../Components/navbar";

export default function ResearherHistoryScreen() {
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

    const historyCardList = studyIdList.map((studyId) => (
        <HistoryCards studyId={studyId} />
    ))

    const hiddenStudiesList = hiddenIdList.map((hiddenStudyId) => (
        <HiddenStudiesCards studyId={hiddenStudyId} />
    ))

    return (
        <Grid container>
            <Navbar />
            <Grid item sm={12} md={8}>
                <SearchableList 
                    rowSpacing={0} 
                    cardInputList={historyCardList} 
                    numberOfItemsPerRow={1} 
                    width={"100%"} 
                    title={"History"} 
                    titleSize={45} 
                    marginTop={5}>  
                </SearchableList>
            </Grid>

            <Grid item sm={12} md={4}>
                <SearchableList
                    rowSpacing = {0}
                    cardInputList={hiddenStudiesList} 
                    numberOfItemsPerRow={1} 
                    width={"100%"} 
                    title={"Hidden"} 
                    titleSize={45} 
                    marginTop={5}>
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