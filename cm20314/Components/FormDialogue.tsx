import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { Button } from '@mui/material';
import { ReactNode, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface InputSliderProps {
  width: number | string;
  height: number | string;
  currentPage: number;
  children?: ReactNode;
  onFormSubmit:() => void;
}

export default function BoxedNumber({
  width,
  height,
  currentPage,
  children,
  onFormSubmit,
}: InputSliderProps) {
  const [activePage, setActivePage] = useState(currentPage);

  const handleFormSubmit = () => {
    onFormSubmit()
  };

  enum PageMoveDirection {
    Forward = 1,
    Backward = -1,
  }

  const handlePageMove = (direction: PageMoveDirection): void => {
    let pageValue = activePage + direction;

    if (pageValue < 0 || pageValue >= React.Children.count(children)) {
      return;
    }
    setActivePage(pageValue);
  };

  return (
    <Box
      sx={{
        width: width,
        height: height,
        backgroundColor: '#F6F6F6',
        border: '1px solid grey',
        boxShadow: '10px 10px 10px 10px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        display: 'flex', justifyContent: 'center',
      }}
    >
      <Grid container spacing={2} sx={{ display:'flex',justifyContent:'center',height: '100%',width:'80%',overflow:'auto' }}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', height: '70%' ,overflow: 'auto'}}>
          <Box sx={{padding:0.5,display: 'flex', justifyContent: 'center'}}>{React.Children.toArray(children)[activePage]}</Box>
          
        </Grid>
        <Grid item xs={12}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={4} sx={{ display:'flex',justifyContent:'center'}}>
            <Button onClick={()=>handlePageMove(-1)}><ArrowBackIosIcon></ArrowBackIosIcon></Button>
            </Grid>
            <Grid item xs={4} sx={{ display:'flex',justifyContent:'center',mt:3}}>
            <Typography>{`${activePage + 1}/${React.Children.count(children)}`}</Typography>
            </Grid>
            <Grid item xs={4}  sx={{ display:'flex',justifyContent:'center',alignContent:'center'}}>
            <Button onClick={()=>handlePageMove(+1)}><ArrowForwardIosIcon></ArrowForwardIosIcon></Button>
            </Grid>
        </Grid>
        {(activePage+1) == React.Children.count(children) ? (
            <Button
              variant={'contained'}
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'auto',
                width: '60%',
                height: '55px',
                backgroundColor: '#0B254A',
                borderRadius: '10px',
              }}
              type="submit"
              onClick={handleFormSubmit}
            >
              Submit
            </Button>
          ) : null}
          
          
        

        </Grid>
      </Grid>
    </Box>
  );
}
