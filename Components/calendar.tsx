import { Box, Grid, Typography, Divider } from "@mui/material";
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import CalendarCard from "./calendarCard";


export default function Calendar(){
    
    // Currently the function creates as many cards as there are data
    // Only three should be filtered sorted by date
    const calendarCardData = [
        {
          id: 1,
          location: "1.1 West",
          date: "2024-02-10T09:00:00",
          priority: "high"
        },
        {
          id: 2,
          date: "2024-02-12T12:30:00",
          location: "2.1 West",
          priority: "low"
        },
        {
          id: 3,
          date: "2024-02-15T17:00:00",
          location: "1.1 South",
          priority: "high"
        },
      ];

    return (
        <Box width="30em" sx = {{borderRadius: "10px", boxShadow: "0.1em 0.4em 0.8em grey"}}>
            <Grid height = "20em" display="flex" flexDirection="row" justifyContent = "space-between">
                <Grid item
                    sx = {{ 
                        display:"flex", 
                        flexDirection:"column", 
                        justifyContent: "center",
                        width:"8em", 
                        height:"100%", 
                        backgroundColor: "#1F5095",
                        color:"white",
                        borderBottomLeftRadius: "0.5em",
                        borderTopLeftRadius: "0.5em",
                        }} >
                    
                    <Typography sx={{fontSize:"3.5em", padding: "0.1em"}}> 30th <br/> Nov </Typography>
                </Grid>

                <Grid item width = "22em" 
                    sx={{
                        backgroundColor: "#C6CFD8",                        
                        borderTopRightRadius: "0.5em",
                        borderBottomRightRadius: "0.5em",}}>
                    <Box 
                        sx= {{
                            display:"flex", 
                            flexDirection:"row",
                            justifyContent:"space-evenly",
                            fontSize: "2em",
                            color: "white",
                            padding: "0.1em"
                        }}>

                        Dont' Forget
                        < CalendarTodayTwoToneIcon sx={{color:"red", width:"1.5em", height:"auto"}} />
                    </Box>

                    <Box 
                        sx={{
                            display:"flex", 
                            justifyContent:"space-evenly", 
                            flexDirection:"column", 
                            padding: "0.1em"
                            }}>
                        
                        <Divider orientation="horizontal" variant="inset"
                            sx={{ backgroundColor: "#1F5095", width: '55%', height: '0.1em' }}/>
                        
                        {/* Need to think about what happens onClick */}
                        {calendarCardData.map((entry) => (
                            <CalendarCard key={entry.id} event = {entry} />
                        ))}
                    </Box>
                </Grid>

            </Grid>

        </Box>
    )
}