import React, { useEffect, useState } from 'react';
import {    FeedbackListViewer , FeedbackViewingContainerProps} from './RatingFeedBackViewer';
import { fetchDocumentById } from '../../firebase/firestore';
import SentenceGrid2 from './SentenceGrid2';

interface AdvertViewerProps {
    name: string;
    studyDescription: string;
    subjectRelatedFields: string[];
    dates: string[];
    contactDetailsAndExtLinks: string[];
    Compensation : string[]
    ResearcherFeedBack?: FeedbackViewingContainerProps

}



const AdvertViewer: React.FC<AdvertViewerProps> = ({
    name,
    studyDescription,
    subjectRelatedFields,
    dates,
    contactDetailsAndExtLinks,
    ResearcherFeedBack,
    Compensation
}) => {
    

    return (
        <div
            style={{
                display: 'flex',
                height: '60vh',
                width: '71.5vw',
            }}
        >
            {/* Left side (70%) with white background */}
            <div
                style={{
                    flex: '70%',
                    backgroundColor: '#f0f5f1',
                    border: '2px turquoise solid',
                    borderRadius: '20px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Content for the left side */}
                <div>
                    <h2>{name}</h2>
                    <div
                        style={{
                            border: '3px solid black',
                            borderRadius: '20px',
                            padding: '10px',
                            height: '45vh',
                            width: '85vh',
                            overflowY: 'auto',
                            wordWrap: 'break-word',
                            backgroundColor: 'white',
                        }}
                    >
                        <p>
                            <strong>Description:</strong>
                        </p>
                        <p>{studyDescription}</p>
                    </div>
                </div>
            </div>

            <div
                style={{
                    flex: '30%',
                    backgroundColor: '#0B254A',
                    border: '2px black solid',
                    borderRadius: '20px',
                    height: '92vh',
                }}
            >
                <div style={{ margin: '20px' }}>
                    <SentenceGrid2 sentences={dates} title={'Study Dates'} rowSpacing={1} numberOfItemsPerRow={2} />
                </div>

                <div>
                    <div style={{ margin: '15px' }}>
                        <SentenceGrid2 sentences={subjectRelatedFields} rowSpacing={1} numberOfItemsPerRow={3} title = {'Related Fields'}/>
                    </div>

                    <div style={{ margin: '15px' }}>
                        <SentenceGrid2 sentences={Compensation} rowSpacing={1} numberOfItemsPerRow={1} title={'Compensation'} />
                    </div>

                    <div style={{ margin: '15px', fontStyle: 'sans-serif' }}>
                        <SentenceGrid2 sentences={contactDetailsAndExtLinks}rowSpacing={1} numberOfItemsPerRow={2} title = {'Contact Details and External Links'}/>
                    </div>

                    {ResearcherFeedBack?<div style={{ margin: '15px' }}>
                        
                        <FeedbackListViewer feedbackList={ResearcherFeedBack} />
                        
                    </div>:null}
                </div>
            </div>
        </div>
    );
};

export default AdvertViewer;