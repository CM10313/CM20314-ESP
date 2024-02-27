import {Typography, Grid } from "@mui/material";

const OverallDiversityScore: React.FC<{score: number}> = ({score}) => {
    return(
        <Grid width="25em" height="16em" display = "flex" alignItems="center" justifyContent="center" flexDirection="column" sx={{ backgroundColor: '#F6F6F6', borderRadius: '5px', boxShadow: '0px 4px 4px 0px #00000040'  }}>
            <Typography> Overall Diversity Score </Typography>
            <Typography fontSize="3em" fontWeight="bold"> {score} / 100</Typography>
        </Grid>
    )
}

export default OverallDiversityScore;