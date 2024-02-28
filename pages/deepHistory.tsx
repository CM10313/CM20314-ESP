import {Grid} from "@mui/material";
import SearchableList from "../Components/SearchableList";
import DeepHistoryRow from "../Components/deepHistoryRow";
import Navbar from "../Components/navbar";

export default function DeepHistoryScreen() {

    const allUserId = [
      "123456",
      "223456",
      "789300",
      "123456",
      "223456",
      "789300",
    ]

    const rowList = allUserId.map((userId) => (
      <DeepHistoryRow studyId={userId} />
    ))

    return (
      <Grid container>
        <Navbar />
        <Grid item sm={12} md={8}>
            <SearchableList 
                rowSpacing={0} 
                cardInputList={rowList} 
                numberOfItemsPerRow={1} 
                width={"100%"} 
                title={"Deep History"} 
                titleSize={45} 
                marginTop={5}>  
            </SearchableList>
          </Grid>
        </Grid>

    );

}