import { TextField, Button, Grid, Typography, Box, useMediaQuery, Paper, styled } from '@mui/material';
import Navbar from '../Components/navbar';
import StudyMediumCard from '../Components/StudyMediumCard';
import CardGrouper from '../Components/CardGrouping';
import CardGrouping from '../Components/CardGrouping';
import { useRouter } from 'next/router';
import AdvertCreate from '../Components/AdvertCreate';
import SearchIcon from '@mui/icons-material/Search';
const ResearchHome: React.FC = () => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
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
  />,
    // Add more StudyMediumCard components here as needed
  ];
  return (
    <>
      <div style={{ height: '810px' }}>
        <Grid container spacing={2} sx={{height:'100%'}}>
          {/* First Column */}
          <Grid item xs={isMobile?12:5} sx={{display:'flex',justifyContent:'center'}}>
            <Grid container spacing={0} sx={{height:'100%'}}>
                <Grid item xs={12} sx={{display:'flex',justifyContent:'center',ml:7,alignItems:'flex-start',flexDirection:'column'}}>
                <Typography fontSize={45} sx={{color:'#C5C5C5'}}>Published</Typography>
                <Box sx={{ width: '240px', height: '26px', backgroundColor: '#F7F7F7',color:'white',borderRadius:'5px',border:'2px solid #8BB7CF'}} ><SearchIcon sx={{color:'#D9D9D9'}}></SearchIcon></Box>
                <Box sx={{ width: '100%', height: '2px', backgroundColor: '#1870A0',color:'white',mt:1}} ></Box>
                </Grid>
                <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}>
                <Box sx={{ display: 'flex', justifyContent: 'center', height: '370px', overflowY: 'scroll', '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#1F5095', borderRadius: '5px' }, '&::-webkit-scrollbar-track': { backgroundColor: '#F3F3F3' } }}>
                    <CardGrouper rowSpacing={2} cardInputList={cardInputList} numberOfItemsPerRow={2}></CardGrouper>
                </Box>
                </Grid>
            </Grid>
          </Grid>
          {/* Second Column */}
          <Grid item xs={isMobile?12:3} sx={{backgroundColor:'yellow',display:'flex',justifyContent:'center'}}>

          <Grid container spacing={0} sx={{height:'100%'}}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mr: 2 }}>
                    <Typography fontSize={25} sx={{ color: '#C5C5C5', width: '90%' }}>Want to publish something new</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}>
                <Box sx={{ display: 'flex', justifyContent: 'center', height: '370px' }}>
                <AdvertCreate advertTypes={["Study","Webinar","Other"]} width={'90%'} height={370} textAreaContent={['A study requires participants to meet criteria and alows you to reject partipants. ~ Studies also require ethical approval from your departments ethics board before participants can join.',"A Webinar is a online hosted event, these are typically informational and use a link to zoom/teams etc to manage participants. ~ No particiapnt information is collected so setup is faster.",'Not sure what this is ?']}></AdvertCreate>
                </Box>
            </Grid>
        </Grid>
            
        </Grid>
    
          {/* Third Column */}
          <Grid item xs={isMobile?12:4} sx={{backgroundColor:'green'}}>
            {/* Content for the third column */}
          </Grid>
        </Grid>
      </div>
    </>
  );
  };
  
  export default ResearchHome;