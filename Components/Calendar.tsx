import { Box, Grid, Typography, Divider } from "@mui/material";
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import CalendarCard, { ItemProps } from "./CalendarCard";
import { ReactNode, useEffect, useState } from "react";

interface CalendarProps {
    cardInputList: ItemProps[] | Promise<ItemProps[]>; // Adjust the type to accept both ItemProps array and Promise of ItemProps array
}

export default function Calendar({ cardInputList }: CalendarProps) {
    const [currentList, setCurrentList] = useState<ItemProps[]>([]);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentDate = new Date();
    const currentMonth = months[currentDate.getMonth()]; // Get the current month as a string
    const currentDay = currentDate.getDate()


    function getDaySuffix(day: number) {
        if (day >= 11 && day <= 13) {
            return "th";
        }
        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }

    useEffect(() => {
        if (Array.isArray(cardInputList)) {
            setCurrentList(cardInputList);
        } else {
            cardInputList.then((resolvedList) => {
                setCurrentList(resolvedList);
            });
        }
    }, [cardInputList]);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Box sx={{ height: '330px', width: '100%', maxWidth: '500px' }}>
                <Grid sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '100%', height: '100%' }}>
                    <Grid item
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            width: "40%",
                            height: "100%",
                            backgroundColor: "#1F5095",
                            color: "white",
                            borderBottomLeftRadius: "0.5em",
                            borderTopLeftRadius: "0.5em",
                        }}>

                        <Typography sx={{ fontSize: "70px", padding: "0.1em" }}> {currentDay}{getDaySuffix(currentDay)} </Typography>
                        <Typography sx={{ fontSize: "25px", padding: "0.1em" }}> {currentMonth} </Typography>
                    </Grid>

                    <Grid item
                        sx={{
                            backgroundColor: "#C6CFD8",
                            width: "60%",
                            borderTopRightRadius: "0.5em",
                            borderBottomRightRadius: "0.5em",
                        }}>
                        <Box
                            sx={{
                                width: '85%',
                                color: 'white',
                                padding: '1em',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            <Typography fontSize={25}>Dont&apos; Forget</Typography>
                            <CalendarTodayTwoToneIcon sx={{ color: 'red', width: '1.5em', height: 'auto', mr: 1 }} />
                        </Box>

                        <Divider orientation="horizontal"
                            sx={{ backgroundColor: "#1F5095", width: '80%', height: '2px', ml: 3 }} />

                        <Box sx={{ width: '85%', height: '215px', overflowY: 'auto', padding: 2 }}>
                            {currentList.map((item, index) => (
                                <CalendarCard key={index} item={item} />
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
