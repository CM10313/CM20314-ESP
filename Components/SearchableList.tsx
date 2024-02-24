import { Card, CardActionArea, CardMedia, CardContent, Typography, Box, Grid, useMediaQuery } from '@mui/material';
import * as React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { ReactNode, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import StudyMediumCard from '../Components/StudyMediumCard';
import { useRouter } from '../Utils/router';
import CardGrouper from './CardGrouping';
import SearchBar from './SearchBar';
interface SearchableListProps {
  rowSpacing:number;
  cardInputList:ReactNode[];
  numberOfItemsPerRow:number;
  width:string|number;
  title:string;
  titleSize:number;
  marginTop:number;
}

export default function SearchableList({
  cardInputList,
  width,
  rowSpacing,numberOfItemsPerRow,title,titleSize,marginTop
}: SearchableListProps) {
    const [fullCardList,setFullCardList] = useState<React.ReactNode[]>([]);
    const [currentList,setCurrentList] = useState<React.ReactNode[]>([]);

    useEffect(() => {
      setFullCardList(cardInputList);  
      setCurrentList(cardInputList);
      }, [cardInputList]);
   

      const handleSearch = (search: string) => {
        if (search.trim() === '') {
          setCurrentList(fullCardList);
          return;
        }
        const nonDuplicateList = new Set<React.ReactNode>();
      
        fullCardList.forEach(item => {
          if (item && typeof item === 'object' && 'props' in item) {
            if (typeof item.props.title === 'string') {
              if (item.props.title.toLowerCase().includes(search.toLowerCase())) {
                nonDuplicateList.add(item);
              }
            }
            if (typeof item.props.name === 'string') {
              if (item.props.name.toLowerCase().includes(search.toLowerCase())) {
                nonDuplicateList.add(item);
              }
            }
            if (typeof item.props.rating === 'number') {
                if (Math.floor(item.props.rating) == Math.floor(Number(search))){
                  nonDuplicateList.add(item);
                }
              }
          }
        });
        setCurrentList(Array.from(nonDuplicateList));
      };
    const isSmallerThanMaxSize = useMediaQuery(`(max-width:${width})`)
    return (
    
       <>
             <Box  sx={{height:'100%',width:isSmallerThanMaxSize?'100%':width}}>
                <Box  sx={{display:'flex',justifyContent:'center',ml:7,alignItems:'flex-start',flexDirection:'column',mt:marginTop}}>
                <Typography fontSize={titleSize} sx={{color:'#C5C5C5'}}>{title}</Typography>
                <SearchBar onReturn={handleSearch}></SearchBar>
                <Box sx={{ width: '100%', height: '2px', backgroundColor: '#1870A0',mt:1}} ></Box>
                <Box sx={{width:'100%',mt:5, display: 'flex', justifyContent: 'center', height: '370px', overflowY: 'scroll', '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#1F5095', borderRadius: '5px' } }}>
                    <CardGrouper rowSpacing={rowSpacing} cardInputList={currentList} numberOfItemsPerRow={isSmallerThanMaxSize?2:numberOfItemsPerRow}></CardGrouper>
                </Box>
                </Box>
            </Box>
    </>
       
        
      );
}