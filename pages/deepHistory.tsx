import {Grid, Box} from "@mui/material";
import { useRouter } from "next/router";
import Navbar from "../Components/navbar";
import { useAuth } from "../Context/AuthContext";
import ProgressBar from "../Components/ProgressBar";
import HistoryCardsStudy from "../Components/historyCardsStudy";
import HistorySmallButtons from "../Components/historySmallButtons";
import DeepHistoryRow from "../Components/deepHistoryRow";
import SearchableList from "../Components/SearchableList";

interface QueryParams {
  participantStudyIDs: string[];
  paidUserIDs: string[],
  disputedUserIDs: string[],
  approvalUserIDs: string[],
  studyId: string;
}

export default function DeepHistoryScreen() {
  
  const router = useRouter();
  
  const {
    studyId,
    participantStudyIDs, 
    paidUserIDs,
    disputedUserIDs,
    approvalUserIDs,
  }:QueryParams = router.query;
  
  //participantStudyIDs ? participantStudyIDs : ["123456"]

  const paidJoinedCount = 10;
  const paidRequiredCount = 10;
  const disputeJoinedCount = 5;
  const disputeRequiredCount = 10;
  const approvalJoinedCount = 20;
  const approvalRequiredCount = null;

  
  // should be Same as the details click in deepHistoryRow
  const handleDetailsClick = (studyId: string) => {
    router.push(`/details/${studyId}`);
  };
  
  const {isLoggedIn,setAuth,username,overallRating,id} = useAuth();
    
    // Create a row for all of the userIds in the list above
    const rowList = participantStudyIDs.map((userId,index) => (
      <DeepHistoryRow key={index} studyId={userId} /> 
    ))

    return (
      <Box>
        <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0} />

        <Grid container>
          <Grid item sm={12} md={8} display={"flex"} flexDirection={"row"} marginBlockEnd={3}>
              <SearchableList 
                rowSpacing={0}
                cardInputList={rowList}
                numberOfItemsPerRow={1}
                width={"100%"}
                title={studyId}
                titleSize={45}
                marginTop={5} 
                searchBarEnabled={false} 
                progressBarEnabled={true}
                joinedCount={15}
                requiredCount={20}
                barTitle="Joined"
                >  
              </SearchableList>
          </Grid>

          {/* Right hand side Paid components */}
          <Grid item sm={12} md={3} display={"flex"} flexDirection={"column"} justifyContent={"center"} padding="1em">
            <br />

            <ProgressBar joinedCount={paidJoinedCount} requiredCount={paidRequiredCount} title="Paid" leftMargin={115} coverage={60}/>
            
            <Box
              sx={{
                display:"flex", 
                flexDirection:"column", 
                overflow:"scroll", 
                maxHeight:"14em", 
                overflowX: "hidden"
                
              }}>
                
                <br />
                {paidUserIDs.map((userId,index) => (
                  <HistoryCardsStudy key={index} studyId={userId} author={"John Doe"} date="03/11/2003" />
                ))}
            </Box>
            
            <br />
            <br />

            <ProgressBar joinedCount={disputeJoinedCount} requiredCount={disputeRequiredCount} title="Disputed" leftMargin={115} coverage={60}/>
            <Box
              sx={{
                display:"flex", 
                flexDirection:"column", 
                overflow:"scroll", 
                maxHeight:"14em", 
                overflowX: "hidden"
                
              }}>
                
                <br />
                {disputedUserIDs.map((userId,index) => (
                <HistoryCardsStudy  key={index} studyId={userId} author="John Doe" date="03/11/2003" />
                ))}
            </Box>

          </Grid>
          
          {/* Approval components */}
          <Grid item sm={12} md={4} display={"flex"} flexDirection={"column"} justifyContent="flex-start" marginLeft={"3%"}>
            <ProgressBar title="Awaiting Approval" requiredCount={approvalRequiredCount} joinedCount={approvalJoinedCount} leftMargin={180} coverage={60} />
            
            <Box sx={{display:"flex", flexDirection:"column", overflow:"scroll", maxHeight:"7em", overflowX:"hidden"}} >
              {approvalUserIDs.map((userId,index) => (
                <Box  key={index} sx={{display:"flex", flexDirection:"row", marginLeft:"3em"}}>
                  <HistoryCardsStudy   studyId={userId} author={"John Doe"} date={"Some Date"} />
                  <HistorySmallButtons  background="red" title="Details" fx={() => handleDetailsClick(userId)} />
                </Box>
              ))}
            </Box>
        
          </Grid>
        </Grid>
      </Box>
    );

}