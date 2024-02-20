import {Typography, Grid } from "@mui/material";

const OverallDiversityScore: React.FC<{score: number}> = ({score}) => {
    return(
        <Grid container width="25em" height="13em" display = "flex" alignItems="center" justifyContent="center" flexDirection="column"
            sx = {{
                backgroundColor:"#F6F6F6", 
                boxShadow: "0.5em 0.5em 1em 0.1em grey"}}>
            <Typography> Overall Diversity Score </Typography>
            <Typography fontSize="3em" fontWeight="bold"> {score} / 100</Typography>
        </Grid>
    )
}

export default OverallDiversityScore;