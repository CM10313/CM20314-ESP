import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { AuthContext } from '../Context/AuthContext';
import { fetchDocumentById, updateDocument } from '../firebase/firestore';
import { useRouter } from 'next/router';
import { useAuth } from '../Context/AuthContext';
import { arrayUnion } from 'firebase/firestore';




export default function RequirementsCardForEthics() {
    const [checkboxes, setCheckboxes] = useState({
        'Pre-Existing conditions': false,
        'Cognitive impairments': false,
        'Medication/Prescriptions': false,
        'Mental Health Conditions': false,
        'Disabilities - UK Disability Act': false,
        'Pregnancy/Breastfeeding Status': false,
        'Smoking and Alcohol Use': false,
    });

    const [awaitingApprovalList, setAwaitingApprovalList] = useState([]);
    const router = useRouter();
    const studyDetails = router.query;

    useEffect(() => {
        // Fetch the data from the database
        const fetchData = async () => {
            try {
                const documentData = await fetchDocumentById(`departments/${studyDetails.department}/Researchers/${studyDetails.researcherId}/studies`, studyDetails.studyId);
                setAwaitingApprovalList(documentData?.studyObj.awaitingApprovalParticipants)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    const handleCheckboxChange = (event: any) => {
        const { name, checked } = event.target;
        setCheckboxes((prevCheckboxes) => ({ ...prevCheckboxes, [name]: checked }));
    };

    return (
        <Box
            sx={{
                border: '4px solid #D3D3D3',
                display: 'block',
                justifyContent: 'center',
                alignContent: 'center',
                backgroundColor: '#FFFFFF',
                padding: '8px',
                height: 400 * 0.9, // 90% of the original height
                width: 350,  // 80% of the original width
                borderRadius: 4,
            }}
        >
        
           
                <Typography align="center" sx={{ color: 'white', fontSize: '1.3rem' }}>
                    <h1 style={{ fontSize: '1.3rem' }}>Thank you for your interest!</h1>
                    <p style={{ fontSize: '1rem' }}>The researcher will review your application.</p>
                </Typography>
                <>
                    <Typography align="center" sx={{ color: 'black', fontSize: '1.3rem' }}>
                        <h1 style={{ fontSize: '1.3rem' , marginTop:'-75px' }}>Want to take part?</h1>
                        <p style={{ fontSize: '1rem' }}>You should know this study requires your data</p>
                    </Typography>
                    <Box
                        sx={{
                            display: 'block',
                            justifyContent: 'center',
                            alignContent: 'center',
                            backgroundColor: '#D3D3D3',
                            padding: '8px',
                            height: 240 * 0.9,  // 90% of the original height
                            width: 335,  // 80% of the original width
                            borderRadius: 4,
                        }}
                    >
                        <h3 style={{ fontSize: '1.2rem' }}>Health</h3>
                        <Box
                            sx={{
                                backgroundColor: '#4169E1',
                                padding: '12px',
                                height: 140 * 0.9,  // 90% of the original height
                                width: 310,  // 80% of the original width
                                borderRadius: 4,
                                overflowY: 'auto',
                            }}
                        >
                            <Typography variant="h6" align="left" sx={{ color: '#FFFFFF', fontSize: '1.2rem' }}>
                                {Object.entries(checkboxes).map(([name, checked]) => (
                                    <React.Fragment key={name}>
                                        <input type="checkbox" name={name} checked={checked} onChange={handleCheckboxChange} />
                                        {name}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </Typography>
                        </Box>
                    </Box>
                    <br />
                   
                </>
        </Box>
    );
}