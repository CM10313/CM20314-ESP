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
import { useEffect, useState } from 'react';
import { fetchDocuments, fetchUserByDepartment, fetchUsersByDepartment } from '../firebase/firestore';
import CircularProgress from '@mui/material/CircularProgress';

const ResearchHome: React.FC = () => {
  //const {isLoggedIn, setAuth, username, overallRating, department, id} = useAuth();
  const [department, setDepartment] = useState('');
  const [username, setUsername] = useState('');
  const [overallRating, setOverallRating] = useState();
  const [id, setId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width:1000px)')
  const router = useRouter();
  const [studies, setStudies] = useState([]);
  const handleCardClick = (title: string) => {
    // Push the user to the desired page using the title (replace '/advert/' with your desired route)
    router.push(`/advert-preview/${title}`); // change to a generated key
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const authObj = JSON.parse(storedAuth);
      const {isLoggedIn, username, overallRating, department, account_type, id} = authObj;
      setUsername(username);
      setOverallRating(overallRating);
      setDepartment(department);
      setId(id);
      fetchStudies(department, id);
      
    }
    
    setIsLoading(false);

  }, []);
  const fetchStudies = async (dept, id_) => {
    try{
      const studies_arr = await fetchDocuments(`departments/${dept}/Researchers/${id_}/studies`)
      const currentDate = new Date();
      const filteredAndSortedStudies = studies_arr
        .filter(study => new Date(study.closingDate) >= currentDate)
        .sort((a,b) => new Date(a.closingDate) - new Date(b.closingDate));

      setStudies(filteredAndSortedStudies);
      console.log(studies_arr);
    }catch (error){
      console.error(error)
    }
  }

  const itemPropsArray = studies.map(study => ({
    borderColor: "#1F5095", // Adjust based on your study object
    publisher: study.publisherName || "Default Publisher", // Adjust based on your study object
    location: study.location || "Default Location", // Adjust based on your study object
    date: study.preliminaryDate || "No Date Provided", // Adjust based on your study object
    title: study.title || "No Title", // Adjust based on your study object
    id: study.id // Assuming id is directly available
}));

  const cardInputList = [
    <StudyMediumCard
      key="1"
      name="John Doe"
      rating={4.5}
      title="Lorem ipsum dolor sit amet"
      borderColour="#1F5095"
      id="id"
      publisherId='pid'
      onCardClick={handleCardClick} department={''}    />,
    <StudyMediumCard
      key="2"
      name="Jane Smith"
      rating={3.8}
      id="id"
      title="Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,v"
      borderColour="#1F5095"
      publisherId='pid'
      onCardClick={handleCardClick} department={''}    />,<StudyMediumCard
      key="1"
      name="John Doe"
      rating={4.5}
      id="id"
      title="Lorem ipsum dolor sit amet"
      borderColour="#1F5095"
      publisherId='pid'
      onCardClick={handleCardClick} department={''}  />,
  <StudyMediumCard
    key="2"
    name="Jane Smith"
    rating={3.8}
    id="id"
    title="Consectetur adipiscing elit"
    borderColour="#1F5095"
    publisherId='pid'
    onCardClick={handleCardClick} department={''}  />,<StudyMediumCard
    key="1"
    name="John Doe"
    rating={4.5}
    id="id"
    title="Lorem ipsum dolor sit amet"
    borderColour="#1F5095"
    publisherId='pid'
    onCardClick={handleCardClick} department={''}/>,
<StudyMediumCard
  key="2"
  name="Jane Smith"
  id="id"
  rating={3.8}
  title="Consectetur adipiscing elit"
  borderColour="#1F5095"
  publisherId='pid'
  onCardClick={handleCardClick} department={''}/>,<StudyMediumCard
  key="1"
  id="id"
  name="John Doe"
  rating={4.5}
  publisherId='pid'
  title=" Lorem ipsum dolor sit amet"
  borderColour="#1F5095"
  onCardClick={handleCardClick} department={''}  />,
  <StudyMediumCard
    key="2"
    name="Jane Smith"
    rating={3.8}
    id="id"
    publisherId='pid'
    title="Consectetur adipiscing elit"
    borderColour="#1F5095"
    onCardClick={handleCardClick} department={''}  />,
    // Add more StudyMediumCard components here as needed
  ];
const handlePush = () => {
    router.push('/viewParticipantDetails?uid=PNeqhkPm0Le0LcfOK1caYeVoCYB3&studyId=jd1kQsORcZkDgQnlZTjt');
};//used to mock params  needed for participant view
const handleDivPush = () => {
  router.push('/diversityView?studyId=2XHxM1QPyu2Xmd7YsiaW');
};//used to mock push for diversity view

if (isLoading) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );
}


  return (
    <>
     <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0} />
            <TriangleBackground />
      <div style={{ height: '810px' }}>
        <Grid container spacing={0} sx={{height:'100%'}}>
          {/* First Column */}
          <Grid item xs={isMobile?12:4.5} sx={{display:'flex',justifyContent:'center'}}>
          <SearchableList  cardInputList={cardInputList} numberOfItemsPerRow={2} rowSpacing={2} width={'1000px'} title={'Published Studies'} titleSize={45} marginTop={10} searchBarEnabled={true} progressBarEnabled={false} ></SearchableList>
          </Grid>
          {/* Second Column */}
          <Grid item xs={isMobile?12:3} sx={{display:'flex',justifyContent:'center'}}>

          <Grid container spacing={0} sx={{height:'100%',display:'flex'}}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Box  sx={{height:'100%'}}>
                <Box  sx={{display:'flex',justifyContent:'center',alignItems:'flex-start',flexDirection:'column',mt:10,height:'100%'}}>
                <Box sx={{width:'100%', display: 'flex', justifyContent: 'center', height: '100%', overflowY: 'scroll', '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#1F5095', borderRadius: '5px' } }}>
                    <AdvertCreate advertTypes={["Study","Webinar","Other"]} width={'100%'} height={450} textAreaContent={[
                      "A study involves selecting participants who fit certain requirements, and you can dismiss those who don't qualify. Before starting, your study must get ethical approval from your department's ethics board.",
                    "A webinar is an online event that provides information and is usually conducted through platforms like Zoom or Teams to organize attendees. Participant details are not collected, the setup is faster.",
                    'Create another type of event.']}></AdvertCreate>
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
            <Calendar cardInputList={itemPropsArray} />
            </Box>
          </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
  };
  
  export default ResearchHome;