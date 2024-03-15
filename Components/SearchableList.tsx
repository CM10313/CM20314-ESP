import { Card, CardActionArea, CardMedia, CardContent, Typography, Box, Grid, useMediaQuery, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import * as React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { ReactNode, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import StudyMediumCard from '../Components/StudyMediumCard';
import { useRouter } from '../Utils/router';
import CardGrouper from './CardGrouping';
import SearchBar from './SearchBar';
import ProgressBar from './ProgressBar';
import { Faculty } from '../DataState/UserExtraInfo';

interface SearchableListProps {
  rowSpacing:number;
  cardInputList:ReactNode[];
  numberOfItemsPerRow:number;
  width:string|number;
  title:string;
  titleSize:number;
  marginTop:number;
  searchBarEnabled:boolean;
  progressBarEnabled:boolean;
  joinedCount?:number;
  requiredCount?:number;
  barTitle?:string;
  maxHeight?:string|number;
}

export default function SearchableList({
  cardInputList,
  width,
  rowSpacing,numberOfItemsPerRow,title,titleSize,marginTop,searchBarEnabled,progressBarEnabled,joinedCount,requiredCount,barTitle,maxHeight,
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
            if (typeof item.props.department === 'string') {
              if (item.props.department.toLowerCase().includes(search.toLowerCase())){
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
                <Typography fontSize={titleSize} sx={{color:'#C5C5C5',overflow:'scroll',width:'90%'}}>{title}</Typography>
                {searchBarEnabled?<SearchBar onReturn={handleSearch}></SearchBar>:null }
                <Box sx={{ width: '100%', height: '2px', backgroundColor: '#1870A0',mt:2}} ></Box>
                {progressBarEnabled?<Box sx={{mt:2,width:'100%'}}> <ProgressBar joinedCount={joinedCount?joinedCount:0} requiredCount={requiredCount?requiredCount:0} title={barTitle?barTitle:''}></ProgressBar></Box> :null}
                <Box sx={{width:'100%',mt:5, display: 'flex', justifyContent: 'center', height: maxHeight?maxHeight:'370px', overflowY: 'scroll', '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#1F5095', borderRadius: '5px' } }}>
                    <CardGrouper rowSpacing={rowSpacing} cardInputList={currentList} numberOfItemsPerRow={isSmallerThanMaxSize?2:numberOfItemsPerRow}></CardGrouper>
                </Box>
                </Box>
            </Box>
    </>
       
        
      );
}