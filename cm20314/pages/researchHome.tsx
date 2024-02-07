import { Container, Box, Grid, Card } from '@mui/material';
import TriangleBackground from '../Components/TriangleBackground';
import Navbar from '../Components/navbar';
import { useEffect } from 'react';
import Cards from '../Components/detailCards';

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
        </Box>

    )
}