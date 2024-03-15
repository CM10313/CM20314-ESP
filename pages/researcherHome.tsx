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

  const itemPropsArray = studiesCalendar.map(study => ({
    borderColor: "#1F5095", // Adjust based on your study object
    publisher: study.publisherName || "Default Publisher", // Adjust based on your study object
    location: study.location || "Default Location", // Adjust based on your study object
    date: study.preliminaryDate || "No Date Provided", // Adjust based on your study object
    title: study.title || "No Title", // Adjust based on your study object
    id: study.id // Assuming id is directly available
}));
const studiesArray = studies.map((study,index) => (
  <StudyMediumCard key={index} name={username} rating={overallRating} title={study.title} borderColour={'#1F5095'} onCardClick={()=>handleCardClick(study.id,id,department)} department={department} id={study.id} publisherId={id}></StudyMediumCard>
));

  return (
    <>
     <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0}  accountType={accountType?accountType:"Guest Type"}/>
            <TriangleBackground />
      <div style={{ height: '810px' }}>
        <Grid container spacing={2} sx={{height:'100%'}}>
          {/* First Column */}
          <Grid item xs={isMobile?12:4.5} sx={{display:'flex',justifyContent:'center'}}>
          <SearchableList  cardInputList={studiesArray} numberOfItemsPerRow={2} rowSpacing={2} width={'1000px'} title={'Published'} titleSize={45} marginTop={10} searchBarEnabled={true} progressBarEnabled={false} ></SearchableList>
          </Grid>
          {/* Second Column */}
          <Grid item xs={isMobile?12:3} sx={{display:'flex',justifyContent:'center'}}>

          <Grid container spacing={0} sx={{height:'100%',display:'flex'}}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                

                <Box  sx={{height:'100%'}}>
                <Box  sx={{display:'flex',justifyContent:'center',alignItems:'flex-start',flexDirection:'column',mt:10,height:'100%'}}>
                <Typography fontSize={25} sx={{ color: '#C5C5C5', width: '90%',ml:isMobile?5:2}}>Want to publish something new</Typography>
                <Box sx={{width:'100%',mt:5, display: 'flex', justifyContent: 'center', height: '100%', overflowY: 'scroll', '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#1F5095', borderRadius: '5px' } }}>
                    <AdvertCreate advertTypes={["Study","Webinar"]} width={'90%'} height={400} textAreaContent={['A study requires participants to meet criteria and alows you to reject partipants. ~ Studies also require ethical approval from your departments ethics board before participants can join.',"A Webinar is a online hosted event, these are typically informational and use a link to zoom/teams etc to manage participants. ~ No particiapnt information is collected so setup is faster."]}></AdvertCreate>
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