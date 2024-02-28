import React from "react";
import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";

const HistoryCardsStudy: React.FC<{ studyId: string }> = ({ studyId }) => {

    return (
        <Grid item display="flex" flexDirection="row" alignItems="center" justifyContent="space-between"
        sx={{
          backgroundColor: "#1F5095",
          height: "5em",
          borderRadius: "0.6em",
          padding: "0.5em",
          marginTop: "0.5%",
          marginBottom: "0.5%"

        }}>
        <Box
          sx={{
            backgroundColor: "white",
            padding: "0.2em",
            borderRadius: "0.4em",
            height: "90%"
          }}>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Typography> Dr. Adams </Typography>
            <Image src="/images/smiley.png" alt="smiley image" width={30} height={30} />
          </Box>
          <Typography> <b> #{studyId} </b> </Typography>
        </Box>
        <Typography fontSize="1em" color="white" padding="0.5em" width="30%">
          Applied: 13/02/23 </Typography>
      </Grid>

    )

}

export default HistoryCardsStudy;