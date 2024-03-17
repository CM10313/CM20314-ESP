import React, { useEffect, useState } from 'react';
import TriangleBackground from '../Components/TriangleBackground';
import Navbar from '../Components/navbar';
import { createFieldIfNotExists, fetchDocumentById, updateDocument } from '../firebase/firestore';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

interface PublishRejectionScreenProps {
   
}

const PublishRejectionScreen: React.FC<PublishRejectionScreenProps> = () => {
    const [userInput, setUserInput] = useState<string>('|');
    const [studyData, setStudyData] = useState<string>('');

    const router = useRouter()

    const studyId = router.query.studyId
    const department = router.query.department
    const ResearcherId = router.query.ResearcherId
    const name = router.query.name

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentStudyData = await fetchDocumentById(`departments/${department}/Researchers/${ResearcherId}/studies`, studyId);
                setStudyData(currentStudyData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    function ViewSampleDemographic() {
        return console.log(true);
    }


    const handleViewComments = () => {
        router.push({
            pathname: '/screenShotViewer',
            query: {
                studyId: studyId,
                department: department,
                ResearcherId: ResearcherId
            },

        })
    }
  
    function sendResolveRequest() {

        updateDocument(`departments/${department}/Researchers/${ResearcherId}/studies`, studyId, {
        
                'studyObj.EthicsApprovalObject.communicationHistory': [...studyData?.studyObj?.EthicsApprovalObject.communicationHistory,
                          { description: userInput, name: name, date: new Date().toDateString() }],
            
     
                'studyObj.EthicsApprovalObject.status': 'resolve Requested'
        })
        
      }
    

    return (
        <div>
            <Navbar name={''} rating={0} accountType={''}/>
            <TriangleBackground />

            <div style={{ position: 'absolute', top: '5vh', left: '150vh'}}>
                
                    <Button onClick={ViewSampleDemographic}
                        variant="contained"
                        style={{
                            backgroundImage: 'url(https://st3.depositphotos.com/1144687/18538/i/1600/depositphotos_185380192-stock-illustration-economy-and-money-concept.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            border: '2px solid #ffffff',
                            color: '#ffffff',
                            fontWeight: 'bold',
                            marginTop: '15px',
                            padding: '20px',
                            borderRadius: '20px',
                            width: '125%',
                            cursor: 'pointer',
                        }}
                    >
                        View Current Sample Demographics
                    </Button>
            </div>

            <div
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 120, 220, 0.3)',
                    height: '90vh',
                    border: '2px solid black',
                    borderRadius: '20px',
                    padding: '20px',
                }}
            >
                <h1 style={{ color: '#FFFFFF', fontSize: '2.5rem', marginBottom: '20px' }}>{studyData?.title}</h1>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        width: '100%',
                        marginTop: '20px',
                    }}
                >
                    {renderSmallBox('Rejection Reason')}
                    {renderBigBox('Provide Details of Changes')}
                    {renderDeleteBox('Delete Advert Permanently')}
                </div>
            </div>
        </div>
    );

    function renderSmallBox(title: string) {
        return (
            <div style={smallBoxStyle}>
                <p style={boxTitleStyle}>{title}</p>
                <div style={textBoxStyle}>
                    <p>{studyData?.studyObj?.EthicsApprovalObject.RejectedReason}</p>
                </div>
                <Button
                    onClick={handleViewComments}
                    variant="contained"
                    style={{
                        marginTop: '15px',
                        padding: '15px',
                        borderRadius: '20px',
                        width: '100%',
                        cursor: 'pointer',
                        backgroundColor: '#2896b5', // Change color as per your design
                        color: '#ffffff', // Change color as per your design
                        fontWeight: 'bold'
                    }}
                >
                    View Comments
                </Button>
            </div>
        );
    }
    function renderBigBox(title: string) {
        return (
            <div style={bigBoxStyle}>
                <p style={boxTitleStyle}>{title}</p>
                <div style={textBoxStyle}>
                    <p>{userInput}</p>
                </div>
                <input
                    type="text"
                    style={{ ...inputStyle, pointerEvents: 'auto' }}
                    onChange={(e) => setUserInput(e.target.value + '|')}
                />


                <Button
                    onClick={sendResolveRequest}
                    variant="contained"
                    style={{
                        marginTop: '15px',
                        padding: '15px',
                        borderRadius: '20px',
                        width: '100%',
                        cursor: 'pointer',
                        backgroundColor: 'green',
                        fontWeight: 'bold'
                    }}
                >
                    Send Resolve Request
                </Button>
            </div>

            
        );
    }

    function renderDeleteBox(title: string) {
        return (
            <div style={deleteBoxStyle}>
                <p style={boxTitleStyle}>{title}</p>
                <div style={textBoxStyle}>
                    <p>
                        <strong>Warning!</strong> Permanently deleted adverts cannot be restarted. These will remain in your history but cannot be actioned. This is not the way to edit a study; instead, use the edit functionality in your history.
                    </p>
                </div>
                <Button
                    onClick={ViewSampleDemographic}
                    variant="contained"
                    style={{
                        marginTop: '15px',
                        padding: '15px',
                        borderRadius: '20px',
                        width: '100%',
                        cursor: 'pointer',
                        backgroundColor:'#D94A4E',
                        fontWeight:'bold'
                    }}
                >
                    Delete Study
                </Button>
            </div>
        );
    }
}

    const smallBoxStyle: React.CSSProperties = {
        flex: '1',
        width: '30%',
        margin: '10px',
        border: '3px solid #19586b',
        borderRadius: '20px',
        padding: '20px',
        height: '70vh',
        overflowY: 'auto',
        wordWrap: 'break-word',
        backgroundColor: '#dfe6e8',
        fontFamily: 'monospace, sans-serif',
        fontSize: '1.5rem',
    };

    const bigBoxStyle: React.CSSProperties = {
        flex: '1',
        width: '40%',
        margin: '10px',
        border: '3px solid #19586b',
        borderRadius: '20px',
        padding: '20px',
        height: '65vh',
        overflowY: 'auto',
        wordWrap: 'break-word',
        backgroundColor: '#dfe6e8',
        fontFamily: 'sans-serif',
        fontSize: '1rem',
    };

    const deleteBoxStyle: React.CSSProperties = {
        ...smallBoxStyle,
        height: '45vh',
        fontSize: '1.5rem',
        color: 'white',
    };

    const boxTitleStyle: React.CSSProperties = {
        fontWeight: 'bold',
        fontSize: '1.8rem',
        color: '#2896b5',
    };

    const textBoxStyle: React.CSSProperties = {
        backgroundColor: '#2896b5',
        borderRadius: '12px',
        padding: '10px',
        margin: '10px 0',
        color: 'white',
    };

    const inputStyle: React.CSSProperties = {
        backgroundColor: '#fff',
        borderRadius: '8px',
        margin: '10px 0',
        fontSize: '0.3rem',
        opacity: '0',
        pointerEvents: 'auto',
    };

export default PublishRejectionScreen;