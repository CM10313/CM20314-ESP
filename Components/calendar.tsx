import { Box, Grid, Typography, Divider } from "@mui/material";
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import CalendarCard from "./CalendarCard";


export default function Calendar(){
    
    // Currently the function creates as many cards as there are data
    // Only three should be filtered sorted by date
    const calendarCardData = [
        {
          id: 1,
          location: "1.1 West",
          date: "13/09/23",
          priority: "high"
        },
        {
          id: 2,
          date: "13/09/23",
          location: "2.1 West",
          priority: "low"
        },
        {
          id: 3,
          date: "13/09/23",
          location: "1.1 South",
          priority: "high"
        },
      ];

    return (
        <Box sx={{display:'flex',justifyContent:'center',width:'100%'}}>
            <Box sx={{height:'330px',width:'100%',maxWidth:'500px'}}>
            <Grid  sx={{display:'flex',justifyContent:'space-between',flexDirection:'row',width:'100%',height:'100%'}}>
                <Grid item
                    sx = {{ 
                        display:"flex", 
                        flexDirection:"column", 
                        justifyContent: "center",
                        width:"40%", 
                        height:"100%", 
                        backgroundColor: "#1F5095",
                        color:"white",
                        borderBottomLeftRadius: "0.5em",
                        borderTopLeftRadius: "0.5em",
                        }} >
                    
                    <Typography sx={{fontSize:"70px", padding: "0.1em"}}> 30th </Typography>
                    <Typography sx={{fontSize:"25px", padding: "0.1em"}}>  Nov </Typography>
                </Grid>

                <Grid item 
                    sx={{
                        backgroundColor: "#C6CFD8",  
                        width:"60%",                       
                        borderTopRightRadius: "0.5em",
                        borderBottomRightRadius: "0.5em",}}>
                    <Box
                        sx={{
                            width: '85%',
                            color: 'white',
                            padding: '1em',
                            display: 'flex',
                            justifyContent: 'space-between', // Aligns items with space between them
                            alignItems: 'center', // Aligns items vertically
                        }}
                        >
                        <Typography fontSize={25}>Dont&apos; Forget</Typography>
                        <CalendarTodayTwoToneIcon sx={{ color: 'red', width: '1.5em', height: 'auto',mr:1 }} />
                        </Box>

                   
                        <Divider orientation="horizontal"
                            sx={{ backgroundColor: "#1F5095", width: '80%', height: '2px',ml:3 }}/>
                        
                        {/* Need to think about what happens onClick */}
                        <Box sx={{width:'85%',height:'215px',overflowY:'auto',padding:2}}>
                        {calendarCardData.map((entry) => (
                            <CalendarCard key={entry.id} event = {entry} />
                        ))}
                        </Box>
                  
                </Grid>

            </Grid>
            </Box>
        </Box>
    )
}