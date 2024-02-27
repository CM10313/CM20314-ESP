import {Typography, Grid } from "@mui/material";

const OverallDiversityScore: React.FC<{score: number}> = ({score}) => {
    return(
        <Grid width="25em" height="16em" display = "flex" alignItems="center" justifyContent="center" flexDirection="column">
            <Typography> Overall Diversity Score </Typography>
            <Typography fontSize="3em" fontWeight="bold"> {score} / 100</Typography>
        </Grid>
    )
}

export default OverallDiversityScore;