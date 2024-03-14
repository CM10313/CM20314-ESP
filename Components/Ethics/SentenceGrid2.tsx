import React from 'react';
import { Card, CardContent, Typography, Divider } from '@mui/material';
import CardGrouper from '../CardGrouping';

interface SentenceGridProps {
    title: string;
    sentences: string[];
    rowSpacing: number;
    numberOfItemsPerRow: number;
}

const SentenceGrid2: React.FC<SentenceGridProps> = ({ title, sentences, rowSpacing, numberOfItemsPerRow }) => {
    // Calculate dynamic heights for each sentence individually
    const dynamicCardHeights = sentences.map((sentence) => {
        const lines = sentence.split('\n').length;
        return Math.max(lines * 20, 30); // Minimum height of 30px
    });

    return (
        <div style={{ backgroundColor: '#0d5382', borderRadius: '30px' }}>
            <Typography variant="h6" gutterBottom style={{ color: 'white', textAlign: 'center' }}>
                {title}
            </Typography>
            <CardGrouper
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
            />
            <Divider style={{ backgroundColor: 'white', marginTop: '10px' }} />
        </div>
    );
};

export default SentenceGrid2;