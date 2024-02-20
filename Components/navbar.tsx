import {Box, Button, Grid, Link, Typography, useMediaQuery} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
interface NavBarProps{
  name:string;
  rating:number;
}
const Navbar: React.FC<NavBarProps> = ({ name, rating}: NavBarProps) => {

  const isMobile = useMediaQuery('(max-width:1000px)');
  return (
    <Box sx={{backgroundColor: '#0B254A', color: '#0B254A', margin: '0',height:'40px'}}>
      <Grid container justifyContent = "space-between" alignItems = 'center'>
        
        <Grid item xs={12} sm={8} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center',ml:10 }}>
                     <Grid container spacing={isMobile ? 3:2} columns={isMobile ? 12:14}>
                     <Grid item xs={isMobile ? 3:2}><Button ><Link style={{ color: '#C5C5C5', textDecoration: 'none' }}  href={"/profile"}>Home</Link></Button></Grid>
                     <Grid item xs={isMobile ? 3:2}><Button><Link style={{ color: '#F6F6F6', textDecoration: 'none',whiteSpace:'nowrap',overflow:'auto' }}  href={"/"}>History</Link></Button></Grid>
                     <Grid item xs={isMobile ? 3:2}><Button ><Link style={{ color: '#F6F6F6', textDecoration: 'none',whiteSpace:'nowrap',overflow:'auto' }} href={"/session-startup"}> Account</Link></Button></Grid>
                     </Grid>
        </Grid>
        <Grid item>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center !important',
              backgroundColor: '#1F5095',
              padding: '5px',
              margin: '0',
              width: '270px',
              color: '#c5c5c5',
            }}
          >
            <Typography fontSize={20}>{name}</Typography> <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography fontSize={20}>{rating}</Typography>
          <StarIcon data-testid="star-icon" sx={{ fontSize: '20', marginRight: '5px' }} />
        </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Navbar;