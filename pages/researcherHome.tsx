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
const ResearchHome: React.FC = () => {

  const {isLoggedIn, setAuth, username, overallRating, department, id,accountType} = useAuth();
  const isMobile = useMediaQuery('(max-width:1000px)')
  const router = useRouter();
  const [studies, setStudies] = useState([]);
  const [studiesCalendar, setStudiesCalendar] = useState([]);
  const handleCardClick =  async (studyid: string,publisherId:string,department:string) => {
    router.push(`/advertPreview?studyId=${studyid}&publisherId=${publisherId}&department=${department}&eventType=study&status=Accept`);
  };
  useEffect(() => {
    fetchData();

  },[])
  const fetchData = async () => {
    try{
      const studies_arr = await fetchDocuments(`departments/${department}/Researchers/${id}/studies`)///swQ90URzscZLubKOh6t8hSAXr1V2/studies
      const currentDate = new Date();
      const filteredAndSortedStudies = studies_arr
        .filter(study => new Date(study.closingDate) >= currentDate)
        .sort((a,b) => new Date(a.closingDate) - new Date(b.closingDate));
        setStudies(studies_arr);
      setStudiesCalendar(filteredAndSortedStudies);
    }catch (error){
      console.error(error)
    }

  }
const handlePush=()=>{
  router.push(`/editAdvert?studyId=jd1kQsORcZkDgQnlZTjt`)
}
  const itemPropsArray = studiesCalendar.map(study => ({
    borderColor: "#1F5095", // Adjust based on your study object
    publisher: study.publisherName || "Default Publisher", // Adjust based on your study object
    location: study.location || "Default Location", // Adjust based on your study object
    date: study.preliminaryDate || "No Date Provided", // Adjust based on your study object
    title: study.title || "No Title", // Adjust based on your study object
    id: study.id, // Assuming id is directly available
    publisherId:study.publisherId,
    department:study.department,
}));
const studiesArray = studies.map((study,index) => (
  <StudyMediumCard key={index} name={username} rating={overallRating} title={study.title} borderColour={'#1F5095'} onCardClick={()=>handleCardClick(study.id,id,department)} department={department} id={study.id} publisherId={id}></StudyMediumCard>
));

  return (
    <>
     <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0} />
            <TriangleBackground />
      <div style={{ height: '810px' }}>
        <Grid container spacing={0} sx={{height:'100%'}}>
          {/* First Column */}
          <Grid item xs={isMobile?12:4.5} sx={{display:'flex',justifyContent:'center'}}>
          <SearchableList  cardInputList={studiesArray} numberOfItemsPerRow={2} rowSpacing={2} width={'1000px'} title={'Published Studies'} titleSize={45} marginTop={10} searchBarEnabled={true} progressBarEnabled={false} ></SearchableList>
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