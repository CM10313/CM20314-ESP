import { Container, Box, Grid} from '@mui/material';
import TriangleBackground from '../Components/TriangleBackground';
import Navbar from '../Components/navbar';
import Cards from '../Components/detailCards';
import Calendar from '../Components/calendar';
import { useEffect } from 'react';

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