import {Box, Button, Grid, Link, Typography, useMediaQuery} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface NavBarProps{
  name:string;
  rating:number;
}
const Navbar: React.FC<NavBarProps> = ({ name, rating}: NavBarProps) => {

  const isMobile = useMediaQuery('(max-width:1000px)');
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
                      <Grid item xs={isMobile ? 3:2}><Button ><Link style={{ color: '#C5C5C5', textDecoration: 'none' }}  href={"/profile"}>Home</Link></Button></Grid>
                      <Grid item xs={isMobile ? 3:2}><Button><Link style={{ color: '#F6F6F6', textDecoration: 'none',whiteSpace:'nowrap',overflow:'auto' }}  href={"/"}>History</Link></Button></Grid>
                      <Grid item xs={isMobile ? 3:2}><Button ><Link style={{ color: '#F6F6F6', textDecoration: 'none',whiteSpace:'nowrap',overflow:'auto' }} href={"/session-startup"}> Account</Link></Button></Grid>
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
export default Navbar;