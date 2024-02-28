import {Typography, Grid } from "@mui/material";

const OverallDiversityScore: React.FC<{score: number}> = ({score}) => {
    return(
        <Grid  display = "flex" alignItems="center" justifyContent="center" flexDirection="column" sx={{ backgroundColor: '#F6F6F6', borderRadius: '5px', boxShadow: '0px 4px 4px 0px #00000040',maxWidth: '400px',width: '95%',height:'250px'  }}>
            <Typography> Overall Diversity Score </Typography>
            <Typography fontSize="3em" fontWeight="bold"> {score} / 100</Typography>
        </Grid>
    )
}

export default OverallDiversityScore;