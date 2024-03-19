import React, { useEffect, useState } from 'react';
import QRCodeGenerator from './QRcodeGen';
import Paypal from './PayPal';
import PaypalMeLink from './paypalMe';
import { fetchDocumentById } from '../firebase/firestore';

interface TransactionProps {
    studyId: string;
    ResearcherId: string;
    department: string;
    participantId: string;
    name: string;
}

const PaymentWindow: React.FC<TransactionProps> = ({ studyId, ResearcherId, department, participantId, name }) => {
    const [generateQR, setGenerateQR] = useState(false);
    const [qrStatus, setQRStatus] = useState('Scan To Pay');
    const [closeClicked, setCloseClicked] = useState(false);
    const [storedStudyData, setStoredStudyData] = useState<any>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const study = await fetchDocumentById(`departments/${department}/Researchers/${ResearcherId}/studies`, studyId);
                const scanned = study?.studyObj?.CompensationObject.paidParticipants.includes(participantId)
                if (scanned){
                    setQRStatus('You are now unable to generate this QR code');
                    setCloseClicked(scanned);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData(); // Call fetchData here

    }, []);


    const handleGenerateQR = () => {
        
        setQRStatus('');
        setGenerateQR(true);
        setCloseClicked(false);
    };

    const handleCloseQR = () => {
        setGenerateQR(false);
        setQRStatus('You are now unable to generate this QR code');
        setCloseClicked(true);
    };

    return (
        <div style={{ border: '5px black solid',margin:'20px', width: 550, fontFamily: 'sans-serif', borderRadius: '20px', backgroundColor: '#E5EFF0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ margin: '10px' }}>
                <h2 style={{ textAlign: 'center', border: '4px solid black', borderRadius: 15, fontSize: '24px', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif', backgroundColor: 'white', maxWidth: 400 }}>Please Choose a form of Payment {name}</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div style={QrCodeStyle}>
                    {!closeClicked ? (
                        <>
                            <h2>{qrStatus}</h2>
                            {generateQR ? (
                                <div>
                                    <QRCodeGenerator participantId={participantId} ResearcherId={ResearcherId} studyId={studyId} />
                                    <button onClick={handleCloseQR} style={closeButtonStyle}>Close</button>
                                </div>
                            ) : (
                                <button onClick={handleGenerateQR} style={GeneratebuttonStyle}>Generate QR Code</button>
                            )}
                        </>
                    ) : (
                        <h2>{qrStatus}</h2>
                    )}
                </div>
               
                <div style={PaypalStyle}>
                    <Paypal studyId={studyId} ResearcherId={ResearcherId} department={department} participantId={participantId} />
                </div>
            </div>
            <div style={PaypalMeStyle}>
                <PaypalMeLink email={''} ParticipantUsername={name} />
            </div>
        </div>
    );
};

const QrCodeStyle = {
    width: '300px',
    height: '300px',
    border: '4px solid #000',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Roboto, sans-serif',
    textAlign: 'center',
    backgroundColor: '#EBF5F8'
};

const PaypalMeStyle = {
    width: '230px',
    height: '130px',
    border: '4px solid #000',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Roboto, sans-serif',
    textAlign: 'center',
    backgroundColor: '#EBF5F8',
    marginRight:'-275px',
    marginTop:'-180px'
};

const PaypalStyle = {
    width: '300px',
    height: '120px',
    border: '4px solid #000',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Roboto, sans-serif',
    textAlign: 'center',
    backgroundColor: '#EBF5F8'
};

const GeneratebuttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0px 4px 100px rgba(0, 0, 0, 0.1)'
};

const closeButtonStyle = {
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

export default PaymentWindow;