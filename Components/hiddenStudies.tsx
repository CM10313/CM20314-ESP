import { Box, Grid, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";

const HiddenStudiesCards: React.FC<{ studyId: string }> = ({ studyId }) => {
    
    studyId = "123456";

    const router = useRouter();
    const handleReview = () => {
        router.push(`/review/${studyId}`);
    }

    return (
        <Grid container display="flex" flexDirection="row" justifyContent="space-evenly">
            <Grid item width={"50%"} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between"
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

            <Grid item display="flex" flexDirection="column" alignItems="center"
                sx = {{
                    marginTop: "0.5%",
                    marginBottom: "0.5%"
                }}>
                <Button variant="contained" onClick={handleReview}
                    sx={{
                        backgroundColor: "#1F5095",
                        fontWeight: "bold",
                        height: "5.5em",
                        width: "10em",
                        borderRadius: "0.6em",
                    }}>
                    Review <br /> ...
                </Button>
            </Grid>
        </Grid>
    
    )
    

}

export default HiddenStudiesCards;