import React from "react";
import {Grid, Button } from "@mui/material";

interface smallButtonProps{
    buttonWidth: string,
    background: string,
    title: string,
    fx: () => void,
}

const HistorySmallButtons: React.FC<smallButtonProps> = ({buttonWidth, background, title, fx }:smallButtonProps) => {

    return (
        <Grid item display="flex" flexDirection="column" alignItems="center"
        sx = {{
            marginTop: "0.5%",
            marginBottom: "0.5%"
        }}>
        <Button variant="contained"
          onClick={fx}
          sx={{
            backgroundColor: background,
            fontWeight: "bold",
            height: "5em",
            width: buttonWidth,
            borderRadius: "0.6em",
          }}>
          {title} <br /> ...
        </Button>
      </Grid>
    )

}


export default HistorySmallButtons;