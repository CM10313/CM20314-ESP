import {Box, Grid} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export default function Navbar() {

  const aTagDecorations = {
    textDecoration: 'none', 
    padding: '10px', 
    color: 'grey' 
  }

  return (
    <Box sx={{ backgroundColor: '#0B254A', color: '#0B254A', padding: '5px', margin: '0'}}>
      <Grid container justifyContent = "space-between" alignItems = 'center'>
        <Grid item>
          <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
            <li style={{ display: 'inline' }}>
              <a href="#" style={aTagDecorations}>
                Home
              </a>
            </li>
            <li style={{ display: 'inline' }}>
              <a href="#" style={aTagDecorations}>
                History
              </a>
            </li>
            <li style={{ display: 'inline' }}>
              <a href="#" style={aTagDecorations}>
                Account
              </a>
            </li>
          </ul>
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
              width: '10em',
              color: 'darkgray',
            }}
          >
            <span>John Doe</span>
            <StarIcon data-testid="star-icon" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}