import { Typography, Card, CardContent } from "@mui/material";
import { useRouter } from "next/router";


  export interface ItemProps{
    borderColor: string;
    publisher:string;
    location:string;
    date:string;
    title:string;
    id:string;
  }
  export interface CalendarCardProps {
   item:ItemProps;
  }

  const CalendarCard: React.FC<CalendarCardProps> = ({item}) => {
   

    
    
    const router = useRouter();
    
    const handleClick = (id:number) => {
        console.log(id);
        router.push(`/advert-preview/${id}`)
     }

    return (
        <Card onClick={() => handleClick(0)}
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
                borderColor: item.borderColor,
                transition: "background-color 0.3s",
                "&:hover" : {backgroundColor: "lightgrey"}

                }}
                data-testid="calendar-card"
                >
            
            <CardContent>
                <Typography fontSize={12}> {item.title} </Typography>
                <Typography fontSize={11}> {item.location} </Typography>
                <Typography fontSize={11}> {item.publisher} </Typography>
                <Typography fontSize={11}> {item.id} </Typography>
            </CardContent>
            
            <CardContent>
                <Typography fontSize={15}> {item.date} </Typography>
            </CardContent>
            

        </Card>
    )
}

export default CalendarCard;