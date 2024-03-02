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
import { fetchDocuments, fetchUserByDepartment, fetchUsersByDepartment } from '../firebase/firestore';
import DisputeRow from '../Components/pDisputeRow';


const ParticipantHome: React.FC = () => {
  const {isLoggedIn,setAuth,username,overallRating,id} = useAuth();
  const isMobile = useMediaQuery('(max-width:1000px)')
  const router = useRouter();
  const handleCardClick = (title: string) => {
    // Push the user to the desired page using the title (replace '/advert/' with your desired route)
    router.push(`/advert-preview/${title}`); // change to a generated key
  };
  const hiddenIdList = [
    "123456",
    "7890123",
    "23433423",
    "34324423", 
    "432423423"
]

  const hiddenStudiesList = hiddenIdList.map((hiddenStudyId) => (
    <DisputeRow studyId={hiddenStudyId} author={"study author"} date={"study date"} />
))
const fetchData = async (uid: string, department: string) => {
  try {
    const studies = await fetchDocuments(`departments/${department}/Researchers/${uid}/studies`);
    return studies;
  } catch (error) {
    console.error(error);
  }
};

const getDepartmentStudies = async (department: string) => {
  let departmentStudies = [];
  try {
    const users = await fetchUsersByDepartment(department);
    for (const user of users) {
      departmentStudies.push(await fetchData(user.id, department));
    }
    return departmentStudies;
  } catch (error) {
    console.error('Error:', error);
  }
};

let departments:{[key: string]: any} = {
  "Architecture & Civil Engineering": null,
  "Chemical Engineering": null,
  "Electronic & Electrical Engineering": null,
  "Mechanical Engineering": null,
  "Economics": null,
  "Education": null,
  "Health": null,
  "Politics, Languages & International Studies": null,
  "Psychology": null,
  "Social & Policy Sciences": null,
  "Chemistry": null,
  "Computer Science": null,
  "Life Sciences": null,
  "Mathematical Sciences": null,
  "Natural Sciences": null,
  "Physics": null,
  "Accounting, Finance & Law": null,
  "Marketing, Business & Society": null,
  "Information, Decisions & Operations": null,
  "Strategy & Organisation": null
};

const getAllStudies = async () => {
  for (const department of Object.keys(departments)) {
    departments[department] = await getDepartmentStudies(department);
  }
  return departments;
};

useEffect(() => {
  const fetchStudyList = async () => {
    try {
      const studyDict = await getAllStudies();
      const extractedStudies: StudyMediumCardProps[] = [];
      for (const departmentStudies of Object.values(studyDict)) {
        // Iterate over studies in the current department
        departmentStudies.forEach((studyList: any) => { // Using 'any' temporarily, replace with appropriate type
          // Iterate over studies in the current study list
          studyList.forEach((study: any) => {
            console.log(study)
            // Extract the data you need from the study object and create StudyMediumCardProps
            const studyProps: StudyMediumCardProps = {
              name: study.publisherName || "No name for publisher", // Ensure you have a default value if properties are missing professor name
              rating: study.publisherRating || 0 , // Example rating, adjust accordingly
              department:study.department || "No department",
              title: study.title || "No Title", // Ensure you have a default value if properties are missing
              borderColour: (study.publisherRating >=4 )?"#D7BE69":"#C6CFD8", // Example border colour, adjust accordingly
              onCardClick: handleCardClick // Assuming handleCardClick is defined somewhere
            };
            
            // Add the created StudyMediumCardProps to extractedStudies
            extractedStudies.push(studyProps);
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


const [liveStudies, setLiveStudies] = useState<StudyMediumCardProps[]>([]);



  return (
    <>
     <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0} />
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
                      <Calendar />
                    </Box>
                  </Box>
              </Grid>
              <Grid item xs={12} >
                <Box sx={{ml:isMobile?0:-7}}>
                <SearchableList
                      rowSpacing={0}
                      cardInputList={hiddenStudiesList}
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