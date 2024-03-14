import {Grid, Box} from "@mui/material";
import { useRouter } from "next/router";
import Navbar from "../Components/navbar";
import { useAuth } from "../Context/AuthContext";
import ProgressBar from "../Components/ProgressBar";
import DeepHistoryRow from "../Components/deepHistoryRow";
import SearchableList from "../Components/SearchableList";
import HistoryCardsStudy from "../Components/historyCardsStudy";
import HistorySmallButtons from "../Components/historySmallButtons";
import { useState, useEffect, Key, ReactElement } from "react";
import { fetchAllStudiesByDepartment, fetchDocumentById, fetchUserById } from "../firebase/firestore";

interface userItem{
  userId:string;
  name:string;
  isRated:boolean;
}
export default function DeepHistoryScreen() {
  const router = useRouter();
  const {isLoggedIn,setAuth,username,overallRating,id,accountType,department} = useAuth();
  let studyId = '';

    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        studyId = urlParams.get('studyId') || '';
    }

  const [joinedParticipants,setJoinedParticipants]= useState<userItem[]>([]); 
  const [awaitingApprovalParticipants,setAwaitingApprovalParticipants]= useState<userItem[]>([]); 
  const [paidParticipants,setPaidParticipants]= useState<userItem[]>([]); 
  const [disputedParticipants,setDisputedParticipants]= useState<userItem[]>([]); 
  const [maxNoParticipants,setMaxNoParticipants]= useState(0);
  useEffect(()=>{
    const fetchUserNames = async (participantIds: string[]) => {
      const userNamesDict: { [key: string]: string } = {};
    
      // Fetch names for each participant ID
      await Promise.all(
        participantIds.map(async (participantId) => {
          const userData: any = await fetchDocumentById("users", participantId);
          if (userData) {
            userNamesDict[participantId] = userData.username;
          }
        })
      );
    
      return userNamesDict;
    };
    const fetchData = async () => {
      try {
        const studyData:any= await fetchDocumentById(`departments/${department}/Researchers/${id}/studies`,studyId);
        if(studyData){
          console.log(studyData)
          const joinedParticipantsList = studyData.studyObj.joinedParticipants
          const awaitingApprovalParticipantsList = studyData.studyObj.awaitingApprovalParticipants
          const paidParticipantsList =  studyData.studyObj.CompensationObject.paidParticipants
          const ratedParticipantsList = studyData.studyObj.CompensationObject.participantsRated
          const disputedParticipantsList = studyData.studyObj.CompensationObject.disputingParticipants
          const allParticipantIdsSet = new Set<string>();

          joinedParticipantsList.forEach((id:string) => allParticipantIdsSet.add(id));
          awaitingApprovalParticipantsList.forEach((id:string) =>
            allParticipantIdsSet.add(id)
          );
          paidParticipantsList.forEach((id:string) => allParticipantIdsSet.add(id));
          disputedParticipantsList.forEach((id:string) => allParticipantIdsSet.add(id));

          const allParticipantIds = Array.from(allParticipantIdsSet);
          const userNamesDict = await fetchUserNames(allParticipantIds);
          console.log(ratedParticipantsList)
          const getParticipantsWithNames = (participantIds: string[]) =>
            participantIds.map((participantId) => ({
              userId: participantId,
              name: userNamesDict[participantId] || "Unknown", // Use "Unknown" if name is not found
              isRated: ratedParticipantsList.includes(participantId),
          }));
          setJoinedParticipants(getParticipantsWithNames(joinedParticipantsList));
    setAwaitingApprovalParticipants(
      getParticipantsWithNames(awaitingApprovalParticipantsList)
    );
    setPaidParticipants(getParticipantsWithNames(paidParticipantsList));
    setDisputedParticipants(getParticipantsWithNames(disputedParticipantsList));
    setMaxNoParticipants(studyData.maxNoParticipants);
          
        }
      } catch (error) {
        console.error("Error fetching studies:", error);
      }
    };
    fetchData();
  },[department, id, studyId])
  

  
  
  let rowList: ReactElement[] | string[] = ["No study Found"];
  let paidList: ReactElement[] | string[] = ["No study Found"];
  let disputeList: ReactElement[] | string[] = ["No study Found"];
  let awaitingApproval: ReactElement[] | string[] = ["No study Found"];
  
  rowList = joinedParticipants.map((item:userItem, index) => (
    <DeepHistoryRow key={index} participantId={item.userId} name={item.name} isRated={item.isRated} publisherId={id} department={department} studyId={studyId} username={username} />
  ));
  
  paidList = paidParticipants.map((item:userItem, index) => (
    <HistoryCardsStudy key={index} studyId={item.userId} title={item.name} />
  ));
  
  disputeList = disputedParticipants.map((item:userItem, index) => (
    <HistoryCardsStudy key={index} studyId={item.userId} title={item.name} />
  ));
  awaitingApproval = awaitingApprovalParticipants.map((item:userItem, index) => (
    <Box key={index} sx={{ display: "flex", flexDirection: "row", marginLeft: "3em" }}>
      <HistoryCardsStudy studyId={item.userId} title={item.name}  />
      <HistorySmallButtons background="red" title="Details" fx={() => handleDetailsClick(item.userId)} />
    </Box>
  ));
  const handleDetailsClick = (participantId:string) => {
    router.push(`/viewParticipantDetails?uid=${participantId}&studyId=${studyId}`);
  };
    console.log(awaitingApproval.length);

    return (
        <Grid container > 
        <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0} accountType={accountType?accountType:"Guest Type"}/>
        
          <Grid item sm={12} md={8} sx={{width:'100%'}}>
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
                joinedCount={rowList.length}
                requiredCount={maxNoParticipants}
                barTitle="Joined"
                >  
              </SearchableList>
          </Grid>

          {/* Right hand side Paid components */}
          <Grid item xs={12} md={4} sx={{mt:5}}  >
            <Grid container sx={{mt:10}}>
              <Grid item xs={6} md={12}>
              <ProgressBar joinedCount={paidList.length} requiredCount={maxNoParticipants} title="Paid" leftMargin={115} coverage={100}/>
                <Box
                  sx={{
                    display:"flex", 
                    flexDirection:"column", 
                    overflow:"scroll", 
                    maxHeight:"14em", 
                    overflowX: "hidden",
                    ml:2,
                    width:'90%',
                  }}>
                    
                    <br />
                    {paidList}
                </Box>
              </Grid>
              <Grid item xs={6} md={12}>
              <ProgressBar joinedCount={disputeList.length} requiredCount={maxNoParticipants} title="Disputed" leftMargin={115} coverage={100}/>
            <Box
              sx={{
                display:"flex", 
                flexDirection:"column", 
                overflow:"scroll", 
                maxHeight:"14em", 
                ml:2,
                width:'90%',
                
              }}>
                
                <br />
                {disputeList}
            </Box>
              </Grid>
            </Grid>
          </Grid>
          
          {/* Approval components */}
          <Grid item xs={12} md={4} sx={{mt:5}} >
            <ProgressBar title="Awaiting Approval" requiredCount={5} joinedCount={awaitingApproval.length} leftMargin={180} coverage={60} />
            
            <Box sx={{ml:0,width:'100%',display:"flex", 
                    flexDirection:"column", 
                    overflow:"scroll", 
                    maxHeight:"14em"}} >
                  {awaitingApproval}
            </Box>
        
          </Grid>
        </Grid>
    );

}