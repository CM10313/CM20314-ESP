import { Container, Box } from '@mui/material';

export default function TriangleBackground(){

    return (
        <Container maxWidth="xl" 
            style = {{
                position: 'absolute', 
                width: '97vw',   
                borderWidth: "45vh 35vw",
                borderStyle: "solid",
                borderColor: "white lightgrey white grey",
                zIndex: '-1',
                opacity: '20%'
            }}>  
        </Container>

    )
}