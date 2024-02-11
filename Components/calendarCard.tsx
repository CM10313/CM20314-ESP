import { Typography, Card, CardContent } from "@mui/material";
import { useRouter } from "next/router";

interface CalendarEvent {
    id: number;
    date: string;
    location: string;
    priority: string;
  }
  
  interface CalendarCardProps {
    event: CalendarEvent;
    borderColor?: string;
  }

  const CalendarCard: React.FC<CalendarCardProps> = ({ event }) => {
   
    const goldBorder = "#D7BE69";
    const greyBorder = "#C6CFD8";
    let borderColor = "grey";
    
    switch (event.priority){
        case "high":
            borderColor = goldBorder;
            break;
        case "low": 
            borderColor = greyBorder 
            break;    
    }
    
    const router = useRouter();
    
    const handleClick = (id:number) => {
        console.log(id);
        router.push(`/advert-preview/${id}`)
     }


    return (
        <Card onClick={() => handleClick(event.id)}
            sx={{ 
                display:"flex", 
                flexDirection:"row", 
                justifyContent:"space-between", 
                alignItems: "center",
                backgroundColor:"white",
                margin: "0.5em",
                minWidth: "20em",
                height: "4em",
                border: "solid 0.3em",
                borderRadius: "0.5em",
                borderColor: borderColor,
                transition: "background-color 0.3s",
                "&:hover" : {backgroundColor: "lightgrey"}

                }}>
            
            <CardContent>
                <Typography> Study {event.id} </Typography>
                <Typography> {event.location} </Typography>
            </CardContent>
            
            <CardContent>
                <Typography> {event.date} </Typography>
            </CardContent>
            

        </Card>
    )
}

export default CalendarCard;