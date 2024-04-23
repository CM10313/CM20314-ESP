import { Box, Typography, ToggleButton, ToggleButtonGroup, styled } from '@mui/material';
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useRouter as useRouterWrapper } from '../Utils/router';

interface AdvertCreateProps {
  advertTypes: string[];
  width: number | string;
  height: number | string;
  textAreaContent: string[];
}

const CustomToggleButton = styled(ToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "#1F5095",
    backgroundColor: 'white'
  },
  "&:not(.Mui-selected)": {
    color: "white",
  }
});

export default function AdvertCreate({
  advertTypes,
  width,
  height,
  textAreaContent,
}: AdvertCreateProps) {
  const [alignment, setAlignment] = React.useState<string | null>(null);
  const [currentText, setCurrentText] = React.useState(-1);

  const handleSelection = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null, newNumber: number) => {
    setAlignment(newAlignment);
    setCurrentText(newNumber);
  }

  const router = useRouterWrapper();
  const handleCreateAdvertRedirect = (data: string) => {
    switch (data) {
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
    <Box sx={{ width, height, backgroundColor: '#F5F5F5', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', minWidth: '600px',maxWidth: '600px' }}>
      <Box sx={{ backgroundColor: '#1F5095', color: 'white', padding: '16px', display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup value={alignment} exclusive onChange={(e, value) => handleSelection(e, value, advertTypes.indexOf(value))} sx={{ width: '100%' }}>
          {advertTypes.map((item, index) => (
            <CustomToggleButton key={index} value={item} aria-label={item} sx={{fontSize: '16px', fontWeight: 'bold', borderRadius: '8px' }}>
              {item}
            </CustomToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ minHeight: '200px', padding: '24px', overflowY: 'auto' }}>
        {currentText >= 0 ? textAreaContent[currentText].split('~').map((line, index) => (
          <Typography key={index} variant="body1" sx={{ marginBottom: '8px' }}>
            {line.trim()}
          </Typography>
        )) : (
          <Typography variant="body1" sx={{ color: '#888' }}>
            Please select an advert type to continue
          </Typography>
        )}
      </Box>
      <Box sx={{ padding: '24px', display: 'flex', justifyContent: 'center' }}>
        <Box
          component="button"
          disabled={currentText < 0}
          onClick={() => handleCreateAdvertRedirect(advertTypes[currentText])}
          sx={{
            borderWidth: '0px',
            backgroundColor: currentText >= 0 ? '#1F5095' : '#CCC',
            color: 'white',
            borderRadius: '8px',
            padding: '16px 32px',
            display: 'flex',
            alignItems: 'center',
            cursor: currentText >= 0 ? 'pointer' : 'default',
            '&:hover': {
              backgroundColor: currentText >= 0 ? '#1F5095' : '#CCC',
            }
          }}
        ><Typography variant="button" sx={{ fontWeight: 'bold', marginRight: '8px' }}>
        Create
      </Typography>
      <AddIcon />
      </Box>
      </Box>
      </Box>
        )
      }