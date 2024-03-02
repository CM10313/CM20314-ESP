import { TextField, Button, Grid, Typography, Box, useMediaQuery, Paper, styled } from '@mui/material';

import StudyMediumCard from '../Components/StudyMediumCard';
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
import { useEffect } from 'react';
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
  const cardInputList = [
    <StudyMediumCard
      key="1"
      name="John Doe"
      rating={4.5}
      pfp=""
      title="Lorem ipsum dolor sit amet"
      link=""
      borderColour="#D7BE69"
      onCardClick={handleCardClick}
    />,
    <StudyMediumCard
      key="2"
      name="Jane Smith"
      rating={3.8}
      pfp=""
      title="Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,v"
      link=""
      borderColour="#C6CFD8"
      onCardClick={handleCardClick}
    />,<StudyMediumCard
    key="1"
    name="John Doe"
    rating={4.5}
    pfp=""
    title="Lorem ipsum dolor sit amet"
    link=""
    borderColour="#C6CFD8"
    onCardClick={handleCardClick}
  />,
  <StudyMediumCard
    key="2"
    name="Jane Smith"
    rating={3.8}
    pfp=""
    title="Consectetur adipiscing elit"
    link=""
    borderColour="#D7BE69"
    onCardClick={handleCardClick}
  />,<StudyMediumCard
  key="1"
  name="John Doe"
  rating={4.5}
  pfp=""
  title="Lorem ipsum dolor sit amet"
  link=""
  borderColour="#C6CFD8"
  onCardClick={handleCardClick}
/>,
<StudyMediumCard
  key="2"
  name="Jane Smith"
  rating={3.8}
  pfp=""
  title="Consectetur adipiscing elit"
  link=""
  borderColour="#C6CFD8"
  onCardClick={handleCardClick}
/>,<StudyMediumCard
    key="1"
    name="John Doe"
    rating={4.5}
    pfp=""
    title=" Lorem ipsum dolor sit amet"
    link=""
    borderColour="#C6CFD8"
    onCardClick={handleCardClick}
  />,
  <StudyMediumCard
    key="2"
    name="Jane Smith"
    rating={3.8}
    pfp=""
    title="Consectetur adipiscing elit"
    link=""
    borderColour="#D7BE69"
    onCardClick={handleCardClick}
  />,
    // Add more StudyMediumCard components here as needed
  ];
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
  
  return (
    <>
     <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0} />
            <TriangleBackground />
      <div style={{ height: '810px' }}>
        <Grid container spacing={2} sx={{height:'100%'}}>
          {/* First Column */}
          <Grid item xs={isMobile?12:7.5} sx={{display:'flex',justifyContent:'center'}}>
          <SearchableList  cardInputList={cardInputList} numberOfItemsPerRow={4} rowSpacing={2} width={'1000px'} title={'Live Studies'} titleSize={45} marginTop={3} searchBarEnabled={true} progressBarEnabled={false}></SearchableList>
          </Grid>
          {/* Second Column */}
         
            
       
    
          {/* Third Column */}
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
                      marginTop={isMobile?0:-8} searchBarEnabled={true} progressBarEnabled={false} maxHeight={isMobile?'370px':'200px'}>
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