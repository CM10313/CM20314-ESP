import {Typography, Grid } from "@mui/material";

const OverallDiversityScore: React.FC<{id: string}> = ({id}) => {
    return(
        <Grid  display = "flex" alignItems="center" justifyContent="center" flexDirection="column" sx={{ backgroundColor: '#F6F6F6', borderRadius: '5px', boxShadow: '0px 4px 4px 0px #00000040',maxWidth: '400px',width: '95%',height:'250px'  }}>
            <Typography fontSize={25} fontWeight="bold"> Study id: {id} </Typography>
            <Typography sx={{ml:1}} fontSize={18}>If you do not see any data for a graph you have enabled this could be for two reasons.</Typography>
            <Typography sx={{ml:1}} fontSize={13}>1. When you created the study you did not set income,age,race,religion,sexuality or gender as a requirement, you enabled viewing these metrics but did not request them from users</Typography>
            <Typography sx={{ml:1}} fontSize={13}>2. When signing up all users may have chosen not to input x data hence you will not be able to see it.</Typography>
        </Grid>
    )
}

export default OverallDiversityScore;