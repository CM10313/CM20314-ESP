import { TextField, Button, Grid, Typography, Box, useMediaQuery, Paper, styled } from '@mui/material';

import StudyMediumCard, {StudyMediumCardProps} from '../Components/StudyMediumCard';
import CardGrouper from '../Components/CardGrouping';
import CardGrouping from '../Components/CardGrouping';
import { useRouter } from 'next/router';
import AdvertCreate from '../Components/AdvertCreate';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from '../Components/navbar';
import TriangleBackground from '../Components/TriangleBackground';
import Calendar from '../Components/Calendar';
import SearchableList from '../Components/SearchableList';
import { useAuth } from '../Context/AuthContext';
import { useEffect, useState } from 'react';
import { fetchDocumentById, fetchDocuments, fetchUserByDepartment, fetchUsersByDepartment } from '../firebase/firestore';
import DisputeRow, { DisputeRowProps } from '../Components/pDisputeRow';
import { departments, fetchData, getAllStudies } from '../Utils/RetrieveStudyData';
import { StudentData } from './register';
import CalendarCard, { CalendarCardProps, ItemProps } from '../Components/CalendarCard';


const ParticipantHome: React.FC<{ testBypass1?: StudyMediumCardProps[], testBypass2?: DisputeRowProps[],testBypass3?: ItemProps[] }> = ({ testBypass1 = [], testBypass2 = [],testBypass3 = [] }) => {
  const [liveStudies, setLiveStudies] = useState<StudyMediumCardProps[]>(testBypass1);
  const [rejectedStudies, setRejectedStudies] = useState<DisputeRowProps[]>(testBypass2);
  const {isLoggedIn,setAuth,username,overallRating,id,accountType} = useAuth();
  const [upcomingStudies, setUpcomingStudies] = useState<ItemProps[]>(testBypass3);
  const isMobile = useMediaQuery('(max-width:1000px)')
  const router = useRouter();
  const handleCardClick =  async (studyid: string,publisherId:string,department:string) => {
    // Push the user to the desired page using the title (replace '/advert/' with your desired route)
    router.push(`/advertPreview?studyId=${studyid}&publisherId=${publisherId}&department=${department}&eventType='study'`);
      
      
  };
 
  useEffect(() => {
    const getRejectedStudies = async () => {
      try {
        // Fetch user information
        const userInfo: any = await fetchDocumentById('users',id);
        if (userInfo) { // Check if userInfo is not undefined
          let tempRejected: Promise<any>[] = [];
          const extractedRejections: DisputeRowProps[] = [];
          const rejectedStudyKey = userInfo.rejectedStudies || [];
          let tempUpcoming: Promise<any>[] = [];
          const extractedUpcoming: ItemProps[] = [];
          const upcomingStudyKey = userInfo.joinedStudies || [];
          // Fetch data for each rejected study
          rejectedStudyKey.forEach((studyKey: any) => {
            const studyId = studyKey.id || "No Id";
            const studyPublisherId = studyKey.publisherId || "No Publisher ID"
            const studyDepartment = studyKey.department || "No Department"
            tempRejected.push(fetchDocumentById(`departments/${studyDepartment}/Researchers/${studyPublisherId}/studies/`,studyId));
          });
          upcomingStudyKey.forEach((studyKey: any) => {
            const studyId = studyKey.id || "No Id";
            const studyPublisherId = studyKey.publisherId || "No Publisher ID"
            const studyDepartment = studyKey.department || "No Department"
            tempUpcoming.push(fetchDocumentById(`departments/${studyDepartment}/Researchers/${studyPublisherId}/studies/`,studyId));
          });
  
          // Wait for all promises to resolve
          const rejectedStudiesData = await Promise.all(tempRejected);
          console.log(rejectedStudiesData)
          // Process fetched data and create DisputeRowProps objects
          rejectedStudiesData.forEach((study: any) => {
            const rejectedProps: DisputeRowProps = {
              studyTitle: study.title || "No Title",
              studyId: study.Id || "No Id",
              publisher: study.publisherName || "No Publisher",
              date: study.preliminaryDate || "No date",
              buttonTitle:"See Study",
              department:study.department,
              publisherId:study.publisherId,
              buttonFunction:()=>handleCardClick(study.id,study.publisherId,study.department),
            }
            extractedRejections.push(rejectedProps);
          });
  
          // Update the state with extracted rejected studies
          setRejectedStudies(extractedRejections);

          const upcomingStudiesData = await Promise.all(tempUpcoming);
          // Process fetched data and create DisputeRowProps objects
          upcomingStudiesData.forEach((study: any) => {
            const upcomingProps: ItemProps = {
              title: study.title || "No Title",
              id: study.Id || "No Id",
              publisher: study.publisherName || "No Publisher",
              date: study.preliminaryDate || "No date",
              location: study.location || "No Location",
              borderColor:(study.publisherRating >=4 )?"#D7BE69":"#C6CFD8",
            }
            extractedUpcoming.push(upcomingProps);
          });
  
          // Update the state with extracted rejected studies
          setUpcomingStudies(extractedUpcoming);
        } else {
          console.error("User info is undefined");
        }
      } catch (error) {
        console.error('Error fetching study list:', error);
      }
    }
    getRejectedStudies();
  }, []);

useEffect(() => {
  const fetchStudyList = async () => {
    try {
      const studyDict = await getAllStudies(true,true,true);
      console.log(studyDict)
      const extractedStudies: StudyMediumCardProps[] = [];
      for (const departmentStudies of Object.values(studyDict)) {
        // Iterate over studies in the current department
        departmentStudies.forEach((studyList: any) => { // Using 'any' temporarily, replace with appropriate type
          // Iterate over studies in the current study list
          studyList.forEach((study: any) => {
            console.log(study)
            const status = study.hasOwnProperty('studyObj') && study.studyObj !== null ? study.studyObj.EthicsApprovalObject.status : study.EthicsApprovalObject.status;
            // Extract the data you need from the study object and create StudyMediumCardProps

            const studyProps: StudyMediumCardProps = {
              name: study.publisherName || "No name for publisher", // Ensure you have a default value if properties are missing professor name
              rating: study.publisherRating || 0 , // Example rating, adjust accordingly
              department:study.department || "No department",
              title: study.title || "No Title", // Ensure you have a default value if properties are missing
              borderColour: (study.publisherRating >=4 )?"#D7BE69":"#C6CFD8", // Example border colour, adjust accordingly
              id:study.id || "No id",
              publisherId:study.publisherId || "No publisher id",
              onCardClick: handleCardClick // Assuming handleCardClick is defined somewhere
            };
            // Add the created StudyMediumCardProps to extractedStudies
            if(status=="Accept"){
              extractedStudies.push(studyProps);
            }
          });
        });
      }
        
      // Update the liveStudies state with the extractedStudies
      setLiveStudies(extractedStudies);
    } catch (error) {
      console.error('Error fetching study list:', error);
    }
  };
  
  fetchStudyList();
}, []); // Run effect only once on component mount






  return (
    <>
     <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0}  accountType={accountType?accountType:"Guest Type"}/>
            <TriangleBackground />
      <div style={{ height: '810px' }}>
        <Grid container spacing={2} sx={{height:'100%'}}>
          <Grid item xs={isMobile?12:7.5} sx={{display:'flex',justifyContent:'center'}}>
          <SearchableList  cardInputList={liveStudies.map((study, index) => (
        <StudyMediumCard
          key={index}
          name={study.name}
          rating={study.rating}
          title={study.title}
          id={study.id}
          publisherId={study.publisherId}
          department={study.department}
          borderColour={study.borderColour}
          onCardClick={study.onCardClick}
        />
      ))} numberOfItemsPerRow={4} rowSpacing={2} width={'1000px'} title={'Live Studies'} titleSize={45} marginTop={3} searchBarEnabled={true} progressBarEnabled={false} ></SearchableList>
          </Grid>
          <Grid item xs={isMobile?12:4.5} >
            <Grid container spacing={2} sx={{height:'100%'}}>
              <Grid item xs={12} >
                  <Box  sx={{height:'100%'}}>
                    <Box  sx={{display:'flex',justifyContent:'center',mt:7,height:'100%'}}>
                    <Calendar
  cardInputList={upcomingStudies.map((study, index) => ({
    publisher: study.publisher,
    location: study.location,
    title: study.title,
    date: study.date,
    id: study.id,
    borderColor:study.borderColor,
  }))}
/>
                    </Box>
                  </Box>
              </Grid>
              <Grid item xs={12} >
                <Box sx={{ml:isMobile?0:-7}}>
                <SearchableList
                      rowSpacing={0}
                      cardInputList={rejectedStudies.map((study,index)=>(<DisputeRow key={index} studyTitle={study.studyTitle} publisher={study.publisher} date={study.date} studyId={study.studyId} buttonTitle='View Study' department={study.department} publisherId={study.publisherId} buttonFunction={()=>handleCardClick(study.studyId,study.publisherId,study.department)}></DisputeRow>))}
                      numberOfItemsPerRow={1}
                      width={"100%"}
                      title={"Rejections"}
                      titleSize={30}
                      marginTop={isMobile?0:-8} searchBarEnabled={true} progressBarEnabled={false} maxHeight={isMobile?'370px':'200px'} >
                  </SearchableList>
                  </Box>
                </Grid>
              </Grid>
              
            </Grid>
        </Grid>
      </div>
    </>
  );
  };
  
  export default ParticipantHome;