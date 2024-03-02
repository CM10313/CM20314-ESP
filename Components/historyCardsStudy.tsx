import React from "react";
import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";

const HistoryCardsStudy: React.FC<{ studyId: string, author:string, date:string }> = ({ studyId, author, date }) => {

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
            <Typography> {author} </Typography>
            <Image src="/images/smiley.png" alt="smiley image" width={30} height={30} />
          </Box>
          <Typography> <b> #{studyId} </b> </Typography>
        </Box>
        <Typography fontSize="1em" color="white" padding="0.5em" width="30%">
          {date} </Typography>
      </Grid>

    )

}

export default HistoryCardsStudy;