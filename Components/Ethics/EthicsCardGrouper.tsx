import React from 'react';
import EthicsAdvertCard from './EthicsAdvertCard';
import CardGrouper from '../CardGrouping';

interface EthicsGridProps {
    cardInputList: {
        name: string;
        studyId: string;
        appliedDate: string;
        profilePicture:string
    }[];
    rowSpacing: number;
    numberOfItemsPerRow: number;
    CardStatus:string
}

const EthicsGridComponent: React.FC<EthicsGridProps> = ({
    cardInputList,
    rowSpacing,
    numberOfItemsPerRow,
    CardStatus

}) => {
    const ethicsCardList = cardInputList.map((data, index) => (
         
        <EthicsAdvertCard
            key={index}
            name={data.name}
            studyId={data.studyId}
            appliedDate={data.appliedDate}
            ReviewStatus={CardStatus}
            profilePicture={
                data.profilePicture === ''
                    ? "https://www.jerseyskillsshow.com/build/img/uploads/_1200x630_crop_center-center_82_none/University-of-Bath-LOGO.jpg?mtime=1613149478"
                    : data.profilePicture
            }
        /> )
        )
      
    return (
        <CardGrouper
            rowSpacing={rowSpacing}
            cardInputList={ethicsCardList}
            numberOfItemsPerRow={numberOfItemsPerRow}
        />
        );
    }
export default EthicsGridComponent;




