import {Grid, Box} from "@mui/material";
import SearchableList from "../Components/SearchableList";
import DeepHistoryRow from "../Components/deepHistoryRow";
import Navbar from "../Components/navbar";
import ProgressBar from "../Components/ProgressBar";
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
          <Box sx={{width:"100%", height:"100px", justifyContent:"start", display:"flex", alignItems:"center"}}> 
            <SearchableList 
            rowSpacing={0}
            cardInputList={rowList}
            numberOfItemsPerRow={1}
            width={"100%"}
            title={"Study Title"}
            titleSize={45}
            marginTop={5} 
            searchBarEnabled={false} 
            progressBarEnabled={true}
            joinedCount={15}
            requiredCount={20}
            barTitle="Joined"
            >  
            </SearchableList>
            </Box>
          </Grid>
        </Grid>

    );

}