import {Box, Button, Grid, Link, Typography,useMediaQuery} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useRouter as useRouterWrapper } from '../Utils/router';

interface NavBarProps {
  name: string;
  rating: number;
  accountType:string;
}
export default function Navbar ({name,rating,accountType }: NavBarProps) {
  const isMobile = useMediaQuery('(max-width:1000px)');
  const router = useRouterWrapper();
  const handleHomePageRedirect =()=>{
    router.push(`/${accountType}Home`);
  }
  const handleHistoryPageRedirect =()=>{
    router.push(`/${accountType}History`);
  }
  return (
      <Grid container    
        sx={{
          display:"flex", 
          justifyContent: "space-between",
          alignItems: 'center',
          backgroundColor: '#0B254A', 
          color: '#0B254A', 
          mt: -1,
          width:'100%',
          height:'40px'}}
      
      >
          <Grid item xs={8} sx={{ 
            display: 'flex', 
            justifyContent: 'right', 
            alignItems: 'center',
             }}>
                      <Grid container columns={isMobile ? 12:14}>
                      <Grid item xs={isMobile ? 4:3}><Button onClick={handleHomePageRedirect} style={{ color: '#F6F6F6', textDecoration: 'none',whiteSpace:'nowrap',overflow:'auto' }}  >Home</Button></Grid>
                      <Grid item xs={isMobile ? 4:3}><Button onClick={handleHistoryPageRedirect} style={{ color: '#F6F6F6', textDecoration: 'none',whiteSpace:'nowrap',overflow:'auto' }} >History</Button></Grid>
                      </Grid>
          </Grid>
          
          <Grid item xs={4} sx={{ display:'flex',justifyContent:'end'}}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: '#1F5095',
                padding: '4px',
                margin: '0',
                width: '100%', //270px
                maxWidth:'270px',
                color: '#c5c5c5',
              }}
            >
              <Typography fontSize={20}>{name}</Typography>
              <Typography fontSize={20} sx={{ display: 'inline-block', verticalAlign: 'middle' }}>
                  {rating}
                  <StarIcon data-testid="star-icon" sx={{ fontSize: 20, marginRight: '5px', verticalAlign: 'middle',mb:1 }} />
              </Typography>
          </Box>
          </Grid>
      </Grid>
  );
}
//{
  /* 
  <Grid
    container
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#0B254A',
      color: '#F6F6F6',
      mt: -1,
      width: '100%',
      height: '40px',
      padding: '0 20px',
    }}
  >
    <Grid item xs={8}>
      <Grid container columns={isMobile ? 12 : 14}>
        <Grid item xs={isMobile ? 3 : 2}>
          <Link href={`/${accountType}Home`} >
            <Button component="a" style={{ textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'auto' }}>Home</Button>
          </Link>
        </Grid>
        <Grid item xs={isMobile ? 3 : 2}>
          <Link href={`/${accountType}History`} >
            <Button component="a" style={{ textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'auto' }}>History</Button>
          </Link>
        </Grid>
        <Grid item xs={isMobile ? 3 : 2}>
          <Link href="/" passHref>
            <Button style={{ textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'auto' }}>Account</Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>

    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'end' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#1F5095',
          padding: '4px',
          width: '270px',
          maxWidth: '100%',
          color: '#c5c5c5',
        }}
      >
        <Typography fontSize={20}>{name}</Typography>
        <Typography fontSize={20} sx={{ display: 'inline-block', verticalAlign: 'middle' }}>
          {rating}
          <StarIcon data-testid="star-icon" sx={{ fontSize: 20, marginRight: '5px', verticalAlign: 'middle', mb: 1 }} />
        </Typography>
      </Box>
    </Grid>
  </Grid>
  */
//}
