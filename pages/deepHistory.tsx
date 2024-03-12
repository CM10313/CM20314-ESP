import {Grid, Box} from "@mui/material";
import { useRouter } from "next/router";
import Navbar from "../Components/navbar";
import { useAuth } from "../Context/AuthContext";
import ProgressBar from "../Components/ProgressBar";
import DeepHistoryRow from "../Components/deepHistoryRow";
import SearchableList from "../Components/SearchableList";
import HistoryCardsStudy from "../Components/historyCardsStudy";
import HistorySmallButtons from "../Components/historySmallButtons";
import { useState, useEffect } from "react";
import { fetchAllStudiesByDepartment, fetchUserById } from "../firebase/firestore";

interface QueryParams {
  studyId: string;
  studyTitle: string,
  studyDate: string,
  studyDepartment: string,
}

export default function DeepHistoryScreen() {
  const router = useRouter();
  const {isLoggedIn,setAuth,username,overallRating,id} = useAuth();
  
  const {
    studyId,
    studyTitle,
    studyDate,
    studyDepartment,
  }:QueryParams = router.query;
  
  const paidJoinedCount = 10;
  const paidRequiredCount = 10;
  const disputeJoinedCount = 5;
  const disputeRequiredCount = 10;
  const approvalJoinedCount = 20;
  const approvalRequiredCount = null;

  const [studies, setStudies] = useState([]); // State to store fetched studies
  
  const fetchData = async () => {
    try {
      const fetchedStudies = await fetchAllStudiesByDepartment(studyDepartment);
      const filteredStudies = fetchedStudies.filter(study => study.studyId === studyId);
      setStudies(filteredStudies);

    } catch (error) {
      console.error("Error fetching studies:", error);
    }
  };
  

  useEffect(() => {
    if (studyId && studyDepartment) {
      fetchData();
    }
  }, [studyId, studyDepartment]);
  
  let rowList = ["No study Found"];
  let paidList;
  let disputeList;
  let awaitingApproval = ["No study Found"];

  if (studies.length > 0) {
    const study = studies[0]; // Assuming you're interested in the first study
    // Create a row for each userId in the joinedParticipants list of the first study
    rowList = study.studyData.studyObj.joinedParticipants.map((userId:string, index) => (
      <DeepHistoryRow key={index} participantId={userId} /> 
    ));

    paidList = study.studyData.studyObj.CompensationObject.paidParticipants.map((userId:string, index) => (
      <HistoryCardsStudy key={index} studyId={userId} author={studyTitle} date={studyDate} />
    ));


    disputeList = study.studyData.studyObj.CompensationObject.disputingParticipants.map((userId:string, index) => (
      <HistoryCardsStudy studyId={userId} author="John Doe" date="03/11/2003" />
    ));   

    awaitingApproval = study.studyData.studyObj.awaitingApprovalParticipants.map((userId:string, index) => (
      <Box sx={{display:"flex", flexDirection:"row", marginLeft:"3em"}}>
      <HistoryCardsStudy studyId={userId} title={"John Doe"} date={"Some Date"} />
      <HistorySmallButtons background="red" title="Details" fx={() => handleDetailsClick(userId)} />
    </Box>
    )); 
  }
  
    // should be Same as the details click in deepHistoryRow
    const handleDetailsClick = (studyId: string) => {
      router.push(`/details/${studyId}`);
    };



    return (
      <Box>
        <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0} accountType={accountType?accountType:"Guest Type"}/>

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
                {paidList}
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
                {disputeList}
            </Box>

          </Grid>
          
          {/* Approval components */}
          <Grid item sm={12} md={4} display={"flex"} flexDirection={"column"} justifyContent="flex-start" marginLeft={"3%"}>
            <ProgressBar title="Awaiting Approval" requiredCount={approvalRequiredCount} joinedCount={approvalJoinedCount} leftMargin={180} coverage={60} />
            
            <Box sx={{display:"flex", flexDirection:"column", overflow:"scroll", maxHeight:"7em", overflowX:"hidden"}} >
                  {awaitingApproval}
            </Box>
        
          </Grid>
        </Grid>
      </Box>
    );

}