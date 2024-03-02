import React from "react";
import {Grid, Button } from "@mui/material";

interface smallButtonProps{
    background: string,
    title: string,
    fx: () => void,
}

const HistorySmallButtons: React.FC<smallButtonProps> = ({ background, title, fx }:smallButtonProps) => {

    return (
        <Grid item display="flex" flexDirection="column" alignItems="center"
        sx = {{
            marginTop: "1%",
            marginBottom: "2%"
        }}>
        <Button variant="contained"
          onClick={fx}
          sx={{
            backgroundColor: background,
            fontWeight: "bold",
            height: "80px",
            width: "96%",
            maxWidth:'250px',
            borderRadius: "0.6em",
          }}>
          {title} <br /> ...
        </Button>
      </Grid>
    )

}


export default HistorySmallButtons;