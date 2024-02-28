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
const ResearchHome: React.FC = () => {
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
      borderColour="#1F5095"
      onCardClick={handleCardClick}
    />,
    <StudyMediumCard
      key="2"
      name="Jane Smith"
      rating={3.8}
      pfp=""
      title="Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,v"
      link=""
      borderColour="#1F5095"
      onCardClick={handleCardClick}
    />,<StudyMediumCard
    key="1"
    name="John Doe"
    rating={4.5}
    pfp=""
    title="Lorem ipsum dolor sit amet"
    link=""
    borderColour="#1F5095"
    onCardClick={handleCardClick}
  />,
  <StudyMediumCard
    key="2"
    name="Jane Smith"
    rating={3.8}
    pfp=""
    title="Consectetur adipiscing elit"
    link=""
    borderColour="#1F5095"
    onCardClick={handleCardClick}
  />,<StudyMediumCard
  key="1"
  name="John Doe"
  rating={4.5}
  pfp=""
  title="Lorem ipsum dolor sit amet"
  link=""
  borderColour="#1F5095"
  onCardClick={handleCardClick}
/>,
<StudyMediumCard
  key="2"
  name="Jane Smith"
  rating={3.8}
  pfp=""
  title="Consectetur adipiscing elit"
  link=""
  borderColour="#1F5095"
  onCardClick={handleCardClick}
/>,<StudyMediumCard
    key="1"
    name="John Doe"
    rating={4.5}
    pfp=""
    title=" Lorem ipsum dolor sit amet"
    link=""
    borderColour="#1F5095"
    onCardClick={handleCardClick}
  />,
  <StudyMediumCard
    key="2"
    name="Jane Smith"
    rating={3.8}
    pfp=""
    title="Consectetur adipiscing elit"
    link=""
    borderColour="#1F5095"
    onCardClick={handleCardClick}
  />,
    // Add more StudyMediumCard components here as needed
  ];
  return (
    <>
     <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0} />
            <TriangleBackground />
      <div style={{ height: '810px' }}>
        <Grid container spacing={2} sx={{height:'100%'}}>
          {/* First Column */}
          <Grid item xs={isMobile?12:4.5} sx={{display:'flex',justifyContent:'center'}}>
          <SearchableList  cardInputList={cardInputList} numberOfItemsPerRow={2} rowSpacing={2} width={'1000px'} title={'Published'} titleSize={45} marginTop={10}></SearchableList>
          </Grid>
          {/* Second Column */}
          <Grid item xs={isMobile?12:3} sx={{display:'flex',justifyContent:'center'}}>

          <Grid container spacing={0} sx={{height:'100%',display:'flex'}}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                

                <Box  sx={{height:'100%'}}>
                <Box  sx={{display:'flex',justifyContent:'center',alignItems:'flex-start',flexDirection:'column',mt:10,height:'100%'}}>
                <Typography fontSize={25} sx={{ color: '#C5C5C5', width: '90%',ml:isMobile?5:2}}>Want to publish something new</Typography>
                <Box sx={{width:'100%',mt:5, display: 'flex', justifyContent: 'center', height: '100%', overflowY: 'scroll', '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#1F5095', borderRadius: '5px' } }}>
                    <AdvertCreate advertTypes={["Study","Webinar","Other"]} width={'90%'} height={400} textAreaContent={['A study requires participants to meet criteria and alows you to reject partipants. ~ Studies also require ethical approval from your departments ethics board before participants can join.',"A Webinar is a online hosted event, these are typically informational and use a link to zoom/teams etc to manage participants. ~ No particiapnt information is collected so setup is faster.",'Not sure what this is ?']}></AdvertCreate>
                </Box>
                </Box>
                
            </Box>
            </Grid>
            
        </Grid>
            
        </Grid>
    
          {/* Third Column */}
          <Grid item xs={isMobile?12:4.5} >
          <Box  sx={{height:'100%'}}>
          <Box  sx={{display:'flex',justifyContent:'center',mt:10,height:'100%'}}>
            <Calendar />
            </Box>
          </Box>
          </Grid>
        </Grid>
        {id}
      </div>
    </>
  );
  };
  
  export default ResearchHome;