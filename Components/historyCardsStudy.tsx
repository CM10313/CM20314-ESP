import React from "react";
import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";


interface HistoryRowProps { 
  studyId: string;
  title: string;
  date: string;
  isPaid?: boolean;

}

const HistoryCardsStudy: React.FC<HistoryRowProps> = ({ studyId, title, date, isPaid=false }) => {

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
            <Image src="/images/smiley.png" alt="smiley image" width={30} height={30} />
          </Box>
          <Typography fontSize={"0.75em"} sx={{wordWrap:"break-word"}}> <b> #{studyId} </b> </Typography>
        </Box>
        
        <Typography fontSize="1em" color="white" padding="0.5em" width="30%">
          {date} </Typography>
      </Grid>

    )
}

export default HistoryCardsStudy;