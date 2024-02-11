import { Container, Box, Grid} from '@mui/material';
import TriangleBackground from '../Components/TriangleBackground';
import Navbar from '../Components/navbar';
<<<<<<< HEAD:pages/researchHome.tsx
<<<<<<< HEAD:cm20314/pages/researchHome.tsx
import { useEffect } from 'react';
import Cards from '../Components/detailCards';
=======

>>>>>>> main:pages/researchHome.tsx
=======
import Cards from '../Components/detailCards';
import Calendar from '../Components/calendar';
import { useEffect } from 'react';
>>>>>>> 041e8f47abf03274336026120df6acef0af63e80:cm20314/pages/researchHome.tsx

export default function researchHome(){
    useEffect(() => {
        document.body.style.margin = '0';
        document.body.style.padding = '0';
      }, []);
    return (
        <Box maxWidth="xl">
            <Navbar />
            <TriangleBackground />
            <Cards />
            <Calendar />
        </Box>

    )
}