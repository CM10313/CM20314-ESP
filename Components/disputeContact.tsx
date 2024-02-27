import { Grid, Typography } from "@mui/material";


export default function DisputeContactCard(){
    return(
        <Grid container height={"10em"} width={"80%"}
            sx = {{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#1F5095",
                borderRadius: "0.5em",
                color: "White",
                padding: "0.5em",
                margin: "0.5em"
                }}>
            <Typography fontSize={40} fontWeight={"bold"}> Having Issues With A Dispute?</Typography>
            <Typography> Resolve this via a department coordinator</Typography>
            <Typography> Contact: departmentname@ac.uk </Typography>
        </Grid>
    )
}