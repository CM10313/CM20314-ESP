import React from "react";
import Image from "next/image";
import { Box, Button, Grid, Typography } from "@mui/material";


interface HistoryRowProps { 
  studyId: string;
  author?:string;
  date?: string;
  isPaid?: boolean;
  title:string;
  location?:string;
  backgroundColor?:string;
  status?:string;
  textColor?:string;
  onClick?:()=>void;
}

const HistoryCardsStudy: React.FC<HistoryRowProps> = ({ studyId, author, date, isPaid,title,location,backgroundColor,status,textColor,onClick }) => {

    const handleClick=()=>{
      if(onClick){onClick();}
    }
    return (
        <Grid item display="flex" flexDirection="row" alignItems="center" justifyContent="space-between"
        sx={{
          backgroundColor: "#1F5095",
          height: "80px",
          borderRadius: "0.6em",
          marginTop: "1%",
          marginBottom: "5%",
          maxWidth:'250px',
        }}>
        {onClick?(<Button onClick={handleClick} variant="contained" sx={{backgroundColor: backgroundColor?backgroundColor:"white",
            mt:1,
            ml:0.5,
            mb:1,
            borderRadius: "5px 0 0 5px",
            height: "90%",
            width:'60%',
            padding:0,
            overflowX:'scroll',
            }}>
        <Box
          sx={{
            backgroundColor: backgroundColor?backgroundColor:"white",
           padding:0,
            height: "100%",
            width:'100%',
            mt:1,
            mb:1,
            color:textColor?textColor:'black',
            fontWeight:'bold',
          }}>
          <Box display="flex" flexDirection="row" justifyContent="space-between" >
            <Typography noWrap sx={{ overflow: "hidden", textOverflow: "ellipsis"}}> {title} </Typography>

            {isPaid && (
              <Typography sx={{ backgroundColor: "yellow", color: "white", fontSize: "1em", padding: "0.1em", marginTop: "0.3em" }}>
                  Paid
            </Typography>)}
          </Box>
          {author && (<Typography fontSize={10} sx={{wordWrap:"break-word"}}> <b> {author} </b> </Typography>)}
         {location &&(<Typography fontSize={10} sx={{wordWrap:"break-word"}}> <b> {location} </b> </Typography>)} 
          <Typography fontSize={10} sx={{wordWrap:"break-word"}}> <b> #{studyId} </b> </Typography>
        </Box></Button>):(
          <Box
            sx={{
              backgroundColor: backgroundColor?backgroundColor:"white",
              mt:1,
              ml:0.5,
              mb:1,
              borderRadius: "5px 0 0 5px",
              height: "90%",
              width:'60%',
              color:textColor?textColor:'black',
              fontWeight:'bold',
              overflowX:'scroll',
            }}>
            <Box display="flex" flexDirection="row" justifyContent="space-between" >
              <Typography noWrap sx={{ overflow: "hidden", textOverflow: "ellipsis"}}> {title} </Typography>
  
              {isPaid && (
                <Typography sx={{ backgroundColor: "yellow", color: "white", fontSize: "1em", padding: "0.1em", marginTop: "0.3em" }}>
                    Paid
              </Typography>)}
            </Box>
            {author && (<Typography fontSize={10} sx={{wordWrap:"break-word"}}> <b> {author} </b> </Typography>)}
           {location &&(<Typography fontSize={10} sx={{wordWrap:"break-word"}}> <b> {location} </b> </Typography>)} 
            <Typography fontSize={10} sx={{wordWrap:"break-word"}}> <b> #{studyId} </b> </Typography>
          </Box>
        )}
        <Box display="flex" flexDirection="column" justifyContent="space-between" >
        {status &&(<Typography fontSize="15px" color="white" width="80%">{status} </Typography>)}
        {date &&(<Typography fontSize="13px" color="white" width="80%" >Published: </Typography>)}
        {date &&(<Typography fontSize="13px" color="white" width="90%">{date} </Typography>)}
        
        </Box>
      </Grid>

    )
}

export default HistoryCardsStudy;