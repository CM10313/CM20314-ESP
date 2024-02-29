import React, { use, useEffect, useState } from 'react';
import { deleteDocument, fetchDocumentById, updateDocument } from '../../firebase/firestore';
import setupDatabaseListener from '../../firebase/firebaseListener';
import AdvertViewer from './AdvertViewer';
import { useRouter } from 'next/router';


interface EthicsAdvertCardProps {
    name: string;
    studyId: string;
    appliedDate: string;
    ReviewStatus: string;
    profilePicture: string;
}

const EthicsAdvertCard: React.FC<EthicsAdvertCardProps> = ({
    
    name,
    studyId,
    appliedDate,
    ReviewStatus,
    profilePicture
}) => {

    const [clickedReView, setClickedReView] = useState<boolean>(false)
    const [clickedView, setClickedView] = useState<boolean>(false)
    const [clickedAccept, setClickedAccept] = useState<boolean>(false);
    const [clickedReject, setClickedReject] = useState<boolean>(false);
    const [originalColor, setOriginalColor] = useState<string>('#0c6a7d');
    const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
    const [studyStatus, setStudyStatus] = useState<string | null>(null);
    const router = useRouter();
    useEffect(() => {
        // Fetch study status when the component mounts
        const fetchStudyStatus = async () => {
            try {
                const studyDoc = await fetchDocumentById('Studies', studyId);
                setStudyStatus((prevStatus) => {
                    const newStatus = studyDoc?.Status || null;
                    setClickedView(newStatus === 'Waiting');
                    return newStatus;
                });
            } catch (error) {
                console.error('Error fetching study status:', error);
            }
        };

        fetchStudyStatus();

        
        const unsubscribeStudyListener = setupDatabaseListener('Studies', (data: any) => {
            const updatedStudy = data.find((study: { id: string; }) => study.id === studyId);
            if (updatedStudy) {
                setStudyStatus(updatedStudy.Status || null);
            }
        });

        return () => {
            unsubscribeStudyListener();
        };
    }, [studyId]);

    
    const handleRemove = async() => {
        // await deleteDocument('Studies' , studyId)
        await updateDocument('Studies', studyId, { Status: 'Rejected' })
    }

    

    const handleReView = async() => {
        setClickedReView((prevState) => !prevState);
        setOriginalColor('#0c6a7d');

        
        if (studyStatus=== 'Waiting'){
            await updateDocument('Studies',studyId, {Status:'In review'})
            setClickedView(false)
        }
        else if(studyStatus==='In review'){
            await updateDocument('Studies', studyId, { Status: 'Waiting' })
            setClickedView(false)
            setOriginalColor('#0c6a7d');
        }
        else {
            await updateDocument('Studies', studyId, { Status: 'Waiting' })
            setClickedView(false)
}
        
    };
    const handleView = async (ethicsArguments : EthicsAdvertCardProps, router:any) => {
        console.log('Button clicked');
        setClickedView((prevState) => !prevState);
        setClickedAccept(false);
        setClickedReject(false);
        setOriginalColor('#0c6a7d');
        setConfirmVisible(false);

        await router.push({
            pathname: '/home',
            query: {
                name: ethicsArguments.name,
                studyId: ethicsArguments.studyId,
                appliedDate: ethicsArguments.appliedDate,
                ReviewStatus: 'Reading',
                profilePicture: ethicsArguments.profilePicture    
            },
            
        })
    
    };

    const updateQueryParam = (paramName: string, paramValue: string) => {
        const url = new URL(router.asPath, window.location.origin);

        // Update the specific query parameter
        url.searchParams.set(paramName, paramValue);

        // Use the push method to update the URL
        router.push(url.pathname + url.search, undefined, { shallow: true });
    };


    const handleExit = async (router: any) => {
        console.log('Button clicked');
        setOriginalColor('#0c6a7d');
   

        await router.push({
            pathname: '/EthicsBoardHome'
        })
       
    };



    const handleAccept = async() => {
        setClickedView(false);
        setClickedAccept((prevState) => !prevState);
        setClickedReject(false);
        setOriginalColor('#0c6a7d');
        
        if (ReviewStatus === 'Review') {
              setConfirmVisible(clickedView || !clickedAccept || clickedReject);
        }
        else{
            updateQueryParam('clickedAccept', clickedAccept.toString());
        }
    }

    const handleReject = () => {
        setClickedView(false);
        setClickedAccept(false);
        setClickedReject((prevState) => !prevState);
        setOriginalColor('#0c6a7d');
        if (ReviewStatus==='Review'){
        setConfirmVisible(clickedView || clickedAccept || !clickedReject)
        }
        else{
             updateQueryParam('clickedReject', clickedReject.toString());
        }
    };

    


    const handleResolve = async () => { 
          updateDocument('Studies', studyId, { Status: 'In review' })
    };

    const handleConfirm = () => {
        if (clickedReject){
            updateDocument('Studies', studyId, { Status: 'Dispute' })
            setClickedView(false);
            setClickedAccept(false);
            setClickedReject(false)
            setOriginalColor('#0c6a7d');
            setConfirmVisible(false)
        }
        if (clickedAccept) {
            updateDocument('Studies', studyId, { Status: 'Accept' })
            setClickedView(false);
            setClickedAccept(false);
            setClickedReject(false);
            setOriginalColor('#0c6a7d');
            setConfirmVisible(false)
        }
    }

    return (
        <div
            style={{
                position: 'relative',
                border: '1vh solid #022345',
                borderRadius: '5vh',
                padding: '1vh',
                margin: '0vh',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                backgroundColor:

                 ReviewStatus === 'Department' && studyStatus === 'In review'
                 ? '#808080'
                 :ReviewStatus === 'Department' && studyStatus === 'Waiting'
                 ? '#0c6a7d'
                 :ReviewStatus === 'Department' && studyStatus === 'Dispute'
                 ? '#808080'
                 : ReviewStatus === 'Department' && studyStatus === 'Rejected'
                 ? '#dc3545'
                 : ReviewStatus ==='Reading' && clickedAccept
                 ? '#28a745'
                 : ReviewStatus === 'Reading' && !clickedAccept
                 ? '#dc3545'
                 :studyStatus === 'Accept' 
                                 ?'#28a745' :
                                 clickedView
                                 ? '#808080'
                                 : clickedAccept
                                 ? '#28a745'
                                 : clickedReject
                                 ? '#dc3545'
                                 : ReviewStatus === 'Disputed'
                                 ? '#dc3545'
                                 : ReviewStatus === 'Waiting'
                                 ? '#0c6a7d'
                                 :originalColor,


                boxShadow: '0 1vh 1vh rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '1.2vh',
            
            }}
        >
            { ReviewStatus === 'Department' && (
                <img
                    src={profilePicture}
                    alt={`${name}'s profile`}
                    style={{
                        position: 'absolute',
                        top: '0.2vh',
                        right: '1vh',
                        width: '5.5vh',
                        height: '5vh',
                        borderRadius: '60%',
                    }}
                />
                )
              }

            <div
                style={{
                    marginBottom: '0.4vw',
                    margin: '0.2vw',
                    fontSize: '1.7vh',
                    fontWeight: 'bold',
                    color: '#fff',
                    alignSelf: 'flex-start',
                    wordWrap: 'break-word',
                }}
            >
                {`${name}`}
            </div>
            <div style={{ position: 'relative', width: '60%', marginRight: '5vh' }}>
                {confirmVisible && (
                    <button
                        onClick={handleConfirm}
                        style={{
                            position: 'absolute',
                            top: '2.7vh',
                            right: '-1.85vw',
                            padding: '0.35vh',
                            backgroundColor: '#022345',
                            color: '#fff',
                            border: '0.2vh solid #000',
                            borderRadius: '1vh',
                            cursor: 'pointer',
                            fontSize: '1vh',
                        }}
                    >
                        Confirm
                    </button>
                )}
                <div style={{ margin: '0.2vw', marginBottom: '0.8vh', fontSize: '1.2vh', color: '#fff', fontFamily: 'Roboto, sans-serif' }}>
                    {`Study ID: ${studyId}`}
                </div>
                <div
                    style={{
                        backgroundColor: '#fff',
                        color: 'black',
                        padding: '0.5vh',
                        border: '0.3vh solid black',
                        borderRadius: '3vh',
                        fontFamily: 'Roboto,sans-serif',
                        fontWeight: 'bold',
                    }}
                >
                    {`Applied Date: ${appliedDate}`}
                </div>
            </div>

            
            {ReviewStatus === 'Department'&& studyStatus != 'Accept' && studyStatus != 'Rejected' &&(
                

                <div style={{ position: 'absolute', top: '6.5vh', right: '-0vw', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '0.5vh' }}>
                    <button onClick={handleReView} style={{ marginRight: '1vw', marginBottom: '1vh', padding: '5px', backgroundColor: studyStatus === 'In review' ? '#808080' : '#022345' ,color: '#fff', border: '0.2vh solid #000', borderRadius: '1vh', cursor: 'pointer' }}>
                        {!clickedReView && <span style={{fontSize: '1.5vh' }}> {studyStatus} </span>} {clickedReView && <span style={{fontSize:'1.5vh' ,textAlign:'center'}}> {studyStatus} </span>}
                    
                    </button>
                </div>
            )}
            
            {ReviewStatus === 'Review' && (
                <div style={{ position: 'absolute', top: '0.75vh', right: '-0.7vw', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '0.3vh'}}>
                    <button onClick={() => handleView({name:name,studyId:studyId,appliedDate:appliedDate,ReviewStatus:'Reading',profilePicture:profilePicture}, router)} style={{fontSize:'1.2vh', marginRight: '1.5vw', marginBottom: '0.7vh', padding: '.5vh', backgroundColor: clickedView ? '#808080' : '#022345', color: '#fff', border: '0.2vh solid #000', borderRadius: '1vh', cursor: 'pointer' }}>
                        View {clickedView && <span style={{ marginLeft: '0 vh', fontSize: '1.2vh' }}>📖</span>}
                    </button>
                    <button onClick={handleAccept} style={{fontSize:'1.2vh', marginRight: '1.5vw', marginBottom: '0.7vh', padding: '0.5vh', backgroundColor: clickedAccept ? '#28a745' : '#022345', color: '#fff', border: '0.2vh solid #000', borderRadius: '1vh', cursor: 'pointer' }}>
                        Accept {clickedAccept && <span style={{ marginLeft: '0vh', fontSize: '1.2vh' }}>✔</span>}
                    </button>
                    <button onClick={handleReject} style={{ fontSize:'1.2vh', marginRight: '1.5vw', marginBottom: '0.7vh', padding: '.5vh', backgroundColor: clickedReject ? '#dc3545' : '#022345', color: '#fff', border: '0.2vh solid #000', borderRadius: '1vh', cursor: 'pointer' }}>
                        Reject {clickedReject && <span style={{ marginLeft: '0vh', fontSize: '1.2vh' }}>✘</span>}
                    </button>
                </div>
            )}


            {ReviewStatus === 'Reading' && (
                <div style={{ position: 'absolute', top: '2vh', right: '-0.7vw', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '0.3vh' }}>
                    <button onClick={() => handleExit(router)} style={{ fontSize: '1.2vh', marginRight: '1.5vw', marginBottom: '0.7vh', padding: '.5vh', backgroundColor: clickedView ? '#808080' : '#022345', color: '#fff', border: '0.2vh solid #000', borderRadius: '1vh', cursor: 'pointer' }}>
                        Exit {clickedView && <span style={{ marginLeft: '0 vh', fontSize: '1.2vh' }}>📖</span>}
                    </button>
                    <button onClick={handleAccept} style={{ fontSize: '1.2vh', marginRight: '1.5vw', marginBottom: '0.7vh', padding: '0.5vh', backgroundColor: clickedAccept ? '#28a745' : '#dc3545', color: '#fff', border: '0.2vh solid #000', borderRadius: '1vh', cursor: 'pointer' }}>
                       {clickedAccept && <span style={{fontSize: '1.2vh' }}>Accept ✔</span>} {!clickedAccept && <span style={{ marginLeft: '0vh', fontSize: '1.2vh' }}>Reject ✘</span>}
                    </button>

                </div>
            )}


            {ReviewStatus === 'Disputed' && (
                <div style={{ position: 'absolute', top: '3vh', right: '-0.7vw', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '0.3vh'}}>
                    <button onClick={handleResolve} style={{fontSize:'1.2vh', marginRight: '1.5vw', marginBottom: '0.7vh', padding: '.5vh', backgroundColor: '#28a745', color: '#fff', border: '0.2vh solid #000', borderRadius: '1vh', cursor: 'pointer' }}>
                        Resolve
                    </button>
                    <button onClick={handleRemove} style={{ fontSize: '1.2vh', marginRight: '1.5vw', marginBottom: '0.7vh', padding: '0.5vh', backgroundColor: '#400a03', color: '#fff', border: '0.2vh solid #000', borderRadius: '1vh', cursor: 'pointer' }}>
                        Remove
                    </button>
                </div>
            )}
        </div>
    );
};

export type {EthicsAdvertCardProps};
export default EthicsAdvertCard;
