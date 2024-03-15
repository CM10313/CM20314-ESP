import React from 'react';
import { Card, CardContent, Typography, Divider, Box } from '@mui/material';
import CardGrouper from '../CardGrouping';

interface SentenceGridProps {
    sentences: string[];
    rowSpacing: number;
    numberOfItemsPerRow: number;
}

const SentenceGrid: React.FC<SentenceGridProps> = ({  sentences, rowSpacing, numberOfItemsPerRow }) => {
    // Calculate dynamic heights for each sentence individually
  
    const dynamicCardHeights = sentences ? 
    sentences.map((sentence) => {
        const lines = sentence.split('\n').length;
        return Math.max(lines * 20, 30); // Minimum height of 30px
    }) :
    []; 
    
    return (
        <div style={{ backgroundColor: '#5293B7' }}>
            {sentences?<CardGrouper
                rowSpacing={rowSpacing}
                cardInputList={sentences.map((sentence, index) => (
                    
                    <Card key={index} style={{ height: `${dynamicCardHeights[index]}px`, borderRadius: '20px', textAlign: 'center', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CardContent style={{ padding: '10px' }}>
                        <Typography variant="body2" style={{ fontWeight: 'bold', fontSize: 10 }}>
                            {sentence}
                        </Typography>
                    </CardContent>
                </Card>
                ))}
                numberOfItemsPerRow={numberOfItemsPerRow}
            />:null}
        </div>
    );
};

export default SentenceGrid;
//*<Box key={index} style={{ height: `${dynamicCardHeights[index]}px`, textAlign: 'start', minHeight:'40px', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                        
//<Typography variant="body2" style={{ fontSize: 15,color:'FFFFFF' }}>
//{"- " +sentence}
//</Typography>

//</Box>}