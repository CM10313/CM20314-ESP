import { Card, CardActionArea, CardMedia, CardContent, Typography, Box, Grid, Button, ToggleButton, ToggleButtonGroup, makeStyles, styled } from '@mui/material';
import * as React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { ReactNode } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useRouter as useRouterWrapper } from '../Utils/router';
interface AdvertCreateProps {
  advertTypes: string [];
  width:number|string;
  height:number|string;
  textAreaContent:string[];
}
const CustomToggleButton = styled(ToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: '#8BB7CF'
  }
});

export default function AdvertCreate({
  advertTypes,
  width,
  height,
  textAreaContent,
}: AdvertCreateProps) {
 
  const [alignment, setAlignment] = React.useState<string | null>('left');
  const primary = "#8BB7CF";
  const [currentText, setCurrentText] = React.useState(-1);
  const handleSelection = (event: React.MouseEvent<HTMLElement>,newAlignment: string | null,newNumber:number)=>{
    handleAlignment(event,newAlignment);
    setCurrentText(newNumber)
  }
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  };
  const router = useRouterWrapper();
  const handleCreateAdvertRedirect=(data:string)=>{
    switch(data){
      case "Study":
        router.push('/studyCreator');
        break;
      case "Webinar":
        router.push('/webinarCreator');
        break;
      case "Other":
        router.push('/otherCreator');
        break;
    }
  }
    return (
    
       <>
        <Box sx={{width:width, height:height,backgroundColor:'#F6F6F6',borderRadius:'10px',boxShadow: '0px 4px 4px 0px #00000040',maxWidth:'500px'}}>
          <Grid container rowSpacing={0} columnSpacing={0} sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
            <Grid item xs={12} sx={{display:'flex',justifyContent:'center',width:'100%'}}>
              <Box  sx={{width:'80%',backgroundColor:'#C5DBE7',borderRadius:'5px',height:'29px'}}>
              <Grid container rowSpacing={0} columnSpacing={0} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}>
                <ToggleButtonGroup  value={alignment} exclusive onChange={handleAlignment} sx={{width:'100%'}}>
                {advertTypes.map((item, index) => (
                  <Grid item xs={12 / advertTypes.length} key={index} sx={{ display: 'flex', justifyContent: 'center',height:'100%' }}>
                    <CustomToggleButton
                     
                      value={item}
                      aria-label={item}
                      onChange={(e)=>handleSelection(e,item,index)}  
                      selected={alignment === item}  
                      sx={{width:'100%',height:'29px',
                      }}
                    >
                      <Typography sx={{ color:'white'}} fontSize={'15px'}>{item}</Typography>
                    </CustomToggleButton>
                  </Grid>
                ))}
                </ToggleButtonGroup>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}>
            <Box sx={{height:'140px',borderRadius:'5px',width:'80%',backgroundColor:'#DAE1E9',display:'flex',flexDirection: 'column',overflowY:'auto'}}>
            {currentText >= 0 ? textAreaContent[currentText].split('~').map((line, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography fontSize={12} sx={{ ml: 1, mr: 1, mt: index > 0 ? 2 : 1 }}>
                        {line.trim()}
                    </Typography>
                </div>
            )) : <Typography fontSize={12} sx={{ ml: 1, mr: 1,mt:1 }}>
                Please Select an advert type to continue
                </Typography>}
          </Box>
            </Grid>
            <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}>
              <Button disabled={currentText<=-1} onClick={()=>handleCreateAdvertRedirect(advertTypes[currentText])}variant='contained' sx={{height:'80px',borderRadius:'10px',width:'80%',backgroundColor:'#1870A0',display:'flex',justifyContent:'center'}}>
                  <Typography sx={{ fontSize: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    Create
                    <AddIcon />
                  </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
       </>
       
        
      );
}