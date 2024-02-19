import { Card, CardActionArea, CardMedia, CardContent, Typography, Box, Grid, useMediaQuery, TextField, Button } from '@mui/material';
import * as React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { ReactNode, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import StudyMediumCard from '../Components/StudyMediumCard';
import { useRouter } from '../Utils/router';
import CardGrouper from './CardGrouping';
interface SearchBarProps {
  onReturn:(search:string)=>void;
}

export default function SearchBar({
  onReturn,
}: SearchBarProps) {
    const [search,setSearch] = useState("");
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
      };
    
      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          onReturn(search);
        }
      };
      const handleSearchButtonClick = () => {
        onReturn(search);
      };

    return (
       <>
       <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        borderRadius: '5px',
        border: '2px solid #8BB7CF',
        p: 0.5, // Padding
        height:'26px',
        width:'240px',
      }}
    >
      <Button onClick={handleSearchButtonClick}>
        <SearchIcon />
      </Button>
      <TextField
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        sx={{
            flexGrow: 1,
            height: '100%', // Set the desired height
            
            minHeight: '0px',
            '& input': {
              padding: '3px 0',ml:1,border:'0px' // Adjust padding to keep the text vertically centered
            },
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent', // Override border color here
              },
              '& .MuiOutlinedInput:hover-notchedOutline': {
                borderColor: 'transparent', // Override border color here
              },
              '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent', // Override border color on focus
              },
              '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent', // Override border color on hover
              },
          }}
      />
    </Box>
               </>
       
        
      );
}