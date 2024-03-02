import {Grid, Box} from "@mui/material";
import SearchableList from "../Components/SearchableList";
import DeepHistoryRow from "../Components/deepHistoryRow";
import Navbar from "../Components/navbar";
import ProgressBar from "../Components/deepHistoryJoined";
import { useAuth } from "../Context/AuthContext";

export default function DeepHistoryScreen() {
  const {isLoggedIn,setAuth,username,overallRating,id} = useAuth();
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
        <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0} />
        <Grid item sm={12} md={8}>
          <Box sx={{width:"100%", height:"10%", justifyContent:"start", display:"flex", alignItems:"center"}}> 
            <ProgressBar joinedCount={20} requiredCount={20} title="Joined" />
          </Box>
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