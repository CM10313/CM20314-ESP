import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { TextField, Button, Grid, Typography, Box, useMediaQuery } from '@mui/material';
import CardGrouper from '../Components/CardGrouping';
import SearchIcon from '@mui/icons-material/Search';
import StudyMediumCard from '../Components/StudyMediumCard';
import { useRouter } from '../Utils/router';
import SearchableList from '../Components/SearchableList';
const Testpage: React.FC = () => {
    const router = useRouter();
    const handleCardClick = (title: string) => {
        // Push the user to the desired page using the title (replace '/advert/' with your desired route)
        router.push(`/advert-preview/${title}`); // change to a generated key
      };
    const cardInputList = [
        <StudyMediumCard
          key="1"
          name="John Doe"
          rating={4.5}
          pfp=""
          title="Test"
          link=""
          borderColour="#1F5095"
          onCardClick={handleCardClick}
        />,
        <StudyMediumCard
          key="2"
          name="Jane Smith"
          rating={3.8}
          pfp=""
          title="Test Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,Consectetur adipiscing elit,v"
          link=""
          borderColour="#1F5095"
          onCardClick={handleCardClick}
        />,<StudyMediumCard
        key="1"
        name="John Doe"
        rating={4.5}
        pfp=""
        title="Lorem ipsum dolor sit amet"
        link=""
        borderColour="#1F5095"
        onCardClick={handleCardClick}
      />,
      <StudyMediumCard
        key="2"
        name="Jane Smith"
        rating={3.8}
        pfp=""
        title="Consectetur adipiscing elit"
        link=""
        borderColour="#1F5095"
        onCardClick={handleCardClick}
      />,<StudyMediumCard
      key="1"
      name="John Doe"
      rating={4.5}
      pfp=""
      title="Lorem ipsum dolor sit amet"
      link=""
      borderColour="#1F5095"
      onCardClick={handleCardClick}
    />,
    <StudyMediumCard
      key="2"
      name="Jane Smith"
      rating={3.8}
      pfp=""
      title="test Consectetur adipiscing elit"
      link=""
      borderColour="#1F5095"
      onCardClick={handleCardClick}
    />,<StudyMediumCard
        key="1"
        name="John Doe"
        rating={4.5}
        pfp=""
        title="tes Lorem ipsum dolor sit amet"//delete when 2
        link=""
        borderColour="#1F5095"
        onCardClick={handleCardClick}
      />,
      <StudyMediumCard
        key="2"
        name="Jane Smith"
        rating={3.8}
        pfp=""
        title="Consectetur adipiscing elit"
        link=""
        borderColour="#1F5095"
        onCardClick={handleCardClick}
      />,
        // Add more StudyMediumCard components here as needed//when num rows == num to dispaly sie breaks
      ];
return (
  <>
            <SearchableList  cardInputList={cardInputList} numberOfItemsPerRow={3} rowSpacing={2} width={'600px'} title={'Published'} titleSize={45} marginTop={10}></SearchableList>

  </>
);
};

export default Testpage;