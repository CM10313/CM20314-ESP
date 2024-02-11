import { Container, Box } from '@mui/material';

/* Simply creates the triangles for the background required in the pages */
/* Include below Navbar and above any other content for it to work properly */
export default function TriangleBackground(){

    return (
        <Box maxWidth="xl" 
            style = {{
                margin: '0 !important',
                position: 'absolute', 
                width: '30vw',   
                borderWidth: "45vh 35vw",
                borderStyle: "solid",
                borderColor: "white lightgrey white grey",
                zIndex: '-1',
                opacity: '20%'
            }}>  
        </Box>

    )
}