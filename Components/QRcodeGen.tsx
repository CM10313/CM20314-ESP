import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { updateDocument, fetchDocumentById } from '../firebase/firestore';

interface QrCodeProps {
    participantId: string;
    ResearcherId: string;
    studyId: string;
}

const QRCodeGenerator: React.FC<QrCodeProps> = ({ participantId, ResearcherId, studyId }) => {
    const [timerExpired, setTimerExpired] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(10 * 60); // 10 minutes in seconds

    const generateQRCodeData = () => {
        const [storedUserName, setStoredUserName] = useState<any>(null);
        const [storedUserBankData, setStoredUserBankData] = useState<any>(null);

        const fetchData = async () => {
            try {
                const user = await fetchDocumentById('users', participantId);
                setStoredUserName(user?.username);
                const bankDetails = user?.bankInfoObj.BankDetails;
                setStoredUserBankData(bankDetails);
                console.log(bankDetails)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        useEffect(() => {
            fetchData();
        }, []);

        useEffect(() => {
            const interval = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
            }, 10); // Update every second

            return () => clearInterval(interval);
        }, []);

        useEffect(() => {
            if (timeRemaining <= 0) {
                setTimerExpired(true);
            }
        }, [timeRemaining]);

        const accountNumber = storedUserBankData?.AccountNumber;
        const cardHolderName = storedUserBankData?.AccountName;
        const sortCode = storedUserBankData?.SortCode;
        const cardNumber = storedUserBankData?.CardNumber;
        const provider = storedUserBankData?.Provider;

        if (timerExpired) {
            return (
                <div>
                    <h2>Time Expired</h2>
                </div>
            );
        }

        return (
            <div style={qrContainerStyle}>
                <QRCode value={`${storedUserName}'s Details\nAccount Number: ${accountNumber}\nSort Code: ${sortCode}\nCard Number: ${cardNumber}\nCard Holder Name: ${cardHolderName} \nProvider: ${provider}`} />
            </div>
        );
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' , marginTop:'-50px'}}>
            <div style={{ marginTop: '20px', fontSize: '25px', fontWeight: 'bold', color: '#333' }}>{timerExpired ? '' : `Scan to pay`}</div>
            {generateQRCodeData()}
            <div style={{ marginTop: '10px', marginRight: '10px', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>{timerExpired ? '' : `Time remaining: ${formatTime(timeRemaining)}`}</div>
        </div>
    );
}

const qrContainerStyle = {
    backgroundColor: '#f0f0f0', 
    padding: '20px', 
    borderRadius: '10px',
};

export default QRCodeGenerator;