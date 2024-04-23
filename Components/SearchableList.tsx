import { Box, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import ProgressBar from './ProgressBar';
import CardGrouper from './CardGrouping';

interface SearchableListProps {
  rowSpacing: number;
  cardInputList: ReactNode[];
  numberOfItemsPerRow: number;
  width: string | number;
  title: string;
  titleSize: number;
  marginTop: number;
  searchBarEnabled: boolean;
  progressBarEnabled: boolean;
  joinedCount?: number;
  requiredCount?: number;
  barTitle?: string;
  maxHeight?: string | number;
}

export default function SearchableList({
  cardInputList,
  width,
  rowSpacing,
  numberOfItemsPerRow,
  title,
  titleSize,
  marginTop,
  searchBarEnabled,
  progressBarEnabled,
  joinedCount,
  requiredCount,
  barTitle,
  maxHeight,
}: SearchableListProps) {
  const [fullCardList, setFullCardList] = useState<ReactNode[]>([]);
  const [currentList, setCurrentList] = useState<ReactNode[]>([]);

  useEffect(() => {
    setFullCardList(cardInputList);
    setCurrentList(cardInputList);
  }, [cardInputList]);

  const handleSearch = (search: string) => {
    // ... (existing search logic)
  };

  const isSmallerThanMaxSize = useMediaQuery(`(max-width:${width})`);

  return (
    <Box sx={{
      height: '100%',
      width: isSmallerThanMaxSize ? '100%' : width,
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        mt: marginTop,
        width: '100%'
      }}>
        <Box sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        backgroundColor:'#1F5095',
        borderRadius: '8px'
        
      }}>
        <Box sx={{paddingLeft: '20px', minWidth: '40%'
      }}>
        <Typography variant="h6" sx={{fontWeight: 'bold', color: 'white', fontSize: '32px' }}>
          {title}
        </Typography>
      </Box>
        
      <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end',
          paddingRight: '15px',
          width: '100%'
      }}>
        {searchBarEnabled && <SearchBar onReturn={handleSearch} />}
      </Box>
        
      </Box>
        
        {progressBarEnabled && (
          <Box sx={{ mt: 2, width: '100%' }}>
            <ProgressBar
              joinedCount={joinedCount || 0}
              requiredCount={requiredCount || 0}
              title={barTitle || ''}
            />
          </Box>
        )}

        <Box sx={{
          width: '100%',
          mt: 5,
          display: 'flex',
          justifyContent: 'center',
          maxHeight: maxHeight || '370px',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px'
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'primary.dark',
            borderRadius: '5px'
          }
        }}>
          <CardGrouper
            rowSpacing={rowSpacing}
            cardInputList={currentList}
            numberOfItemsPerRow={isSmallerThanMaxSize ? 2 : numberOfItemsPerRow}
          />
        </Box>
      </Box>
    </Box>
  );
}