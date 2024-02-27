import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Box, Button, Grid, Typography } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';

const HistoryCards: React.FC<{ studyID: string }> = ({ studyID }) => {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSeeParticipantsClick = () => {
    router.push(`/participants/${studyID}`);
  };

  const handleMarkCompleteClick = () => {
    setIsCompleted(prevState => !prevState);
  };

  const handleDiversityClick = () => {
    router.push(`/diversity/${studyID}`);
  };

  return (
    <Grid container display="flex" flexDirection="row" justifyContent="space-evenly">
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
          <Typography> <b> #{studyID} </b> </Typography>
        </Box>
        <Typography fontSize="1em" color="white" padding="0.5em" width="30%">
          Applied: 13/02/23 </Typography>
      </Grid>

      <Grid item display="flex" flexDirection="column" alignItems="center"
        sx = {{
            marginTop: "0.5%",
            marginBottom: "0.5%"
        }}>
        <Button variant="contained"
          onClick={handleSeeParticipantsClick}
          sx={{
            backgroundColor: "#1F5095",
            fontWeight: "bold",
            height: "5em",
            width: "15em",
            borderRadius: "0.6em",
          }}>
          See Participants <br /> ...
        </Button>
      </Grid>

      <Grid item display="flex" flexDirection="column" alignItems="center"
        sx = {{
            marginTop: "0.5%",
            marginBottom: "0.5%"
        }}>
        <Button variant="contained"
          onClick={handleMarkCompleteClick}
          sx={{
            backgroundColor: isCompleted ? "#D7BE69" : "#1870A0",
            fontWeight: "bold",
            height: "5em",
            width: "15em",
            borderRadius: "0.6em",
          }}>
          {isCompleted ? "Done"  : "Mark Completed"} <br />
          {isCompleted ? <DoneIcon /> : "..."}
        </Button>
      </Grid>

      <Grid item display="flex" flexDirection="column" alignItems="center"         
      sx = {{
            marginTop: "0.5%",
            marginBottom: "0.5%"
        }}>
        <Button variant="contained"
          onClick={handleDiversityClick}
          sx={{
            backgroundColor: "#5293B7",
            fontWeight: "bold",
            height: "5em",
            width: "15em",
            borderRadius: "0.6em",
          }}>
          Diversity <br /> ...
        </Button>
      </Grid>
    </Grid>
  )
}

export default HistoryCards;
