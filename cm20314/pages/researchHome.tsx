import { Container } from '@mui/material';
import TriangleBackground from '../Components/TriangleBackground';
import Navbar from '../Components/Navbar';


export default function researchHome(){

    return (
        <Container maxWidth="xl" style={{margin:'0'}}>
            <Navbar />
            <TriangleBackground />
            <h1> Some content here</h1>   
            <h1> This is some more content </h1>   
        </Container>

    )
}