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
                width: "90%",
                height: "60px",
                border: "solid 0.3em",
                borderRadius: "0.5em",
                borderColor: borderColor,
                transition: "background-color 0.3s",
                "&:hover" : {backgroundColor: "lightgrey"}

                }}
                data-testid="calendar-card"
                >
            
            <CardContent>
                <Typography fontSize={12}> Study {event.id} </Typography>
                <Typography fontSize={11}> {event.location} </Typography>
            </CardContent>
            
            <CardContent>
                <Typography fontSize={15}> {event.date} </Typography>
            </CardContent>
            

        </Card>
    )
}

export default CalendarCard;