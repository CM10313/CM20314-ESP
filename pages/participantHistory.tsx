import { Grid, Box, Typography} from "@mui/material";
import HistoryCards from "../Components/historyCards";
import SearchableList from "../Components/SearchableList";
import HiddenStudiesCards from "../Components/hiddenStudies";
import DisputeContactCard from "../Components/disputeContact";
import Navbar from "../Components/navbar";
import ParticipantHistoryRow from "../Components/participantHistoryRow";
import DisputeRow from "../Components/pDisputeRow";
import { useAuth } from "../Context/AuthContext";
import { useEffect, useState } from "react";
import { fetchDocumentById, updateDocument } from "../firebase/firestore";
import { departments } from "../Utils/RetrieveStudyData";
import { handleResolvedStudies } from "../Utils/studyResolutionFuncs";

export interface JoinedProps{
    publisher:string;
    location:string;
    date:string;
    title:string;
    id:string;
    publisherId:string;
    isPaid:boolean;
    department:string;
    isRated:boolean;
  }
 
const ParticipantHistory: React.FC<{testBypass1?: JoinedProps[],testBypass2?: JoinedProps[] }> = ({ testBypass1 = [],testBypass2 = [] }) => {
    const {isLoggedIn,setAuth,username,overallRating,id,accountType} = useAuth();
    const [joinedStudies, setJoinedStudies] = useState<JoinedProps[]>(testBypass1);
    const [disputedStudies, setDisputedStudies] = useState<JoinedProps[]>(testBypass2);
    // Once data is fetched all we need is ID of those to be inserted into these accordingly
    // front end will need to be modified below to retrieve the author and date from the IDs in <HistoryCards /> and <HiddenStudiesCards />
    const getStudies = async () => {
        try {
          // Fetch user information
          const userInfo: any = await fetchDocumentById('users',id);
          if (userInfo) { // Check if userInfo is not undefined
            let tempJoined: Promise<any>[] = [];
            const extractedJoined: JoinedProps[] = [];
            const joinedStudyKey = userInfo.joinedStudies || [];
            let tempDisputed: Promise<any>[] = [];
            const extractedDisputed: JoinedProps[] = [];
            const disputedStudyKey = userInfo.disputedStudies || [];
            
            joinedStudyKey.forEach((studyKey: any) => {
              const studyId = studyKey.id || "No Id";
              const studyPublisherId = studyKey.publisherId || "No Publisher ID"
              const studyDepartment = studyKey.department || "No Department"
              tempJoined.push(fetchDocumentById(`departments/${studyDepartment}/Researchers/${studyPublisherId}/studies/`,studyId));
            });
            const joinedStudiesData = await Promise.all(tempJoined);

            disputedStudyKey.forEach((studyKey: any) => {
                console.log(studyKey)
              const studyId = studyKey.id || "No Id";
              const studyPublisherId = studyKey.publisherId || "No Publisher ID"
              const studyDepartment = studyKey.department || "No Department"
              tempDisputed.push(fetchDocumentById(`departments/${studyDepartment}/Researchers/${studyPublisherId}/studies/`,studyId));
            });
            const disputedStudiesData = await Promise.all(tempDisputed);
            
            // Process fetched data and create DisputeRowProps objects
            joinedStudiesData.forEach((study: any) => {
                
              const JoinedProps: JoinedProps = {
                title: study.title || "No Title",
                id: study.id || "No Id",
                publisher: study.publisherName || "No Publisher",
                date: study.preliminaryDate || "No date",
                location: study.location || "No Location",
                publisherId:study.publisherId,
                isPaid:study.studyObj.CompensationObject.paidParticipants.includes(id),
                isRated:study.studyObj.CompensationObject.participantsHaveRated.includes(id),
                department:study.department,
              }
              extractedJoined.push(JoinedProps);
            });
    
            // Update the state with extracted rejected studies
            setJoinedStudies(extractedJoined);

            disputedStudiesData.forEach((study: any) => {
                console.log(study)
              const disputedProps: JoinedProps = {
                title: study.title || "No Title",
                id: study.id || "No Id",
                publisher: study.publisherName || "No Publisher",
                date: study.preliminaryDate || "No date",
                location: study.location || "No Location",
                publisherId:study.publisherId,
                isPaid:study.studyObj.CompensationObject.paidParticipants.includes(id),
                isRated:study.studyObj.CompensationObject.participantsHaveRated.includes(id),
                department:study.department,
              }
              extractedDisputed.push(disputedProps);
            });
    
            // Update the state with extracted rejected studies
            setDisputedStudies(extractedDisputed);
          } else {
            console.error("User info is undefined");
          }
        } catch (error) {
          console.error('Error fetching study list:', error);
        }
      }
    const triggerGetStudies = () => {
        // Call getStudies to trigger the useEffect hook
        getStudies();
      };
    useEffect(() => {
      
        getStudies();
      }, []);

    const historyCardList = joinedStudies.map((study,index) => (
        <ParticipantHistoryRow key={index} studyId={study.id} author={study.publisher} date={study.date}  title={study.title} location={study.location} publisherId={study.publisherId} isPaid={study.isPaid} userId={id} department={study.department} triggerGetStudies={triggerGetStudies} username={username} isRated={study.isRated}/>
    ))

    const hiddenStudiesList = disputedStudies.map((study,index) => (
        <DisputeRow key={index} studyId={study.id} publisher={study.publisher} date={study.date} studyTitle={study.title} buttonTitle="Resolve" buttonFunction={()=>handleResolvedStudies(id,study.id,study.publisherId,study.department,triggerGetStudies)} department={study.department} publisherId={study.publisherId}/>
    ))

    return (
        <Grid container>
            <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0} accountType={accountType?accountType:"Guest Type"} />
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
                    title={"Disputed"}
                    titleSize={45}
                    marginTop={5} searchBarEnabled={true} progressBarEnabled={false}  >
                </SearchableList>
            </Grid>

            <Grid item 
                sm={12} md={12} 
                display = {"flex"}
                justifyContent={"center"}
                alignItems={"center"} > 

                <Grid container height={"10em"}
                    sx = {{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#1F5095",
                        borderRadius: "0.5em",
                        color: "White",
                        padding: "0.5em",
                        margin: "0.5em"
                    }}>
                    
                    <Typography fontWeight={"bold"} > If you dispute an activity, it will appear in your disputed column 
                    along with the person who manages it until you resolve the dispute 
                    Handle disputes by contacting the organiser to request payment.</Typography>
                </Grid>

                <DisputeContactCard />   
            </Grid>

        </Grid>
    );

}
export default ParticipantHistory;