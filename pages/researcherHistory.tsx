import { Box, Grid, Typography, Container } from "@mui/material";
import HistoryCards from "../Components/historyCards";
import SearchableList from "../Components/SearchableList";
import HiddenStudiesCards from "../Components/hiddenStudies";
import DisputeContactCard from "../Components/disputeContact";

export default function ResearherHistoryScreen() {
    const studyId = "123456";

    const historyCardList = [                    
        <HistoryCards studyID={studyId} />,
        <HistoryCards studyID={studyId} />,
        <HistoryCards studyID={studyId} />,
        <HistoryCards studyID={studyId} />,
        <HistoryCards studyID={studyId} />,
        <HistoryCards studyID={studyId} />,
        <HistoryCards studyID={studyId} />
    ]

    const hiddenStudiesList = [
        <HiddenStudiesCards studyId={studyId} />,
        <HiddenStudiesCards studyId={studyId} />,
        <HiddenStudiesCards studyId={studyId} />,
        <HiddenStudiesCards studyId={studyId} />,
        <HiddenStudiesCards studyId={studyId} />,
        <HiddenStudiesCards studyId={studyId} />
    ]

    return (
        <Grid container>
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