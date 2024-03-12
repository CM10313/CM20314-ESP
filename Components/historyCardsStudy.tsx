import React from "react";
import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";


interface HistoryRowProps { 
  studyId: string;
  author?:string;
  date?: string;
  isPaid?: boolean;
  title:string;
  location?:string;
}

const HistoryCardsStudy: React.FC<HistoryRowProps> = ({ studyId, author, date, isPaid,title,location }) => {

    return (
        <Grid item display="flex" flexDirection="row" alignItems="center" justifyContent="space-between"
        sx={{
          backgroundColor: "#1F5095",
          height: "80px",
          borderRadius: "0.6em",
          marginTop: "1%",
          marginBottom: "5%",
          maxWidth:'350px'
        }}>
        <Box
          sx={{
            backgroundColor: "white",
            mt:1,
            ml:0.5,
            mb:1,
            borderRadius: "5px 0 0 5px",
            height: "90%",
            width:'60%',
          }}>
          <Box display="flex" flexDirection="row" justifyContent="space-between">

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
        
        {date &&(<Typography fontSize="1em" color="white" padding="0.5em" width="30%">{date} </Typography>)}
      </Grid>

    )
}

export default HistoryCardsStudy;