import { Box, Grid, Typography, Divider } from "@mui/material";
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import CalendarCard, { ItemProps } from "./CalendarCard";
import { ReactNode, useEffect, useState } from "react";

interface CalendarProps {
    cardInputList: ItemProps[] | Promise<ItemProps[]>;
}

export default function Calendar({ cardInputList }: CalendarProps) {
    const [currentList, setCurrentList] = useState<ItemProps[]>([]);

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
            <Box sx={{ height: '450px', width: '100%', maxWidth: '600px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <Grid container sx={{ height: '100%' }}>
                    <Grid item xs={4} sx={{ backgroundColor: '#1F5095', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                        <Typography variant="h1" sx={{ fontSize: '96px', lineHeight: '96px', fontWeight: 'bold' }}>30</Typography>
                        <Typography variant="h4" sx={{ fontSize: '36px', lineHeight: '36px', fontWeight: 'bold' }}>Nov</Typography>
                    </Grid>
                    <Grid item xs={8} sx={{ backgroundColor: '#F5F5F5', position: 'relative' }}>
                        <Box sx={{ padding: '24px', display: 'flex', alignItems: 'center' }}>
                            <CalendarTodayTwoToneIcon sx={{ color: '#1F5095', fontSize: '32px', marginRight: '12px' }} />
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1F5095' }}>Upcoming Events</Typography>
                        </Box>
                        <Divider sx={{ backgroundColor: '#1F5095', height: '2px', marginBottom: '16px' }} />
                        <Box sx={{ height: '240px', overflowY: 'auto', padding: '0 24px' }}>
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