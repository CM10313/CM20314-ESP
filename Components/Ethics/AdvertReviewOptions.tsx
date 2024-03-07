import React, { useEffect, useState } from 'react';
import ApprovalCard from './ApprovalCard';
import RejectionCard from './RejectionCard';
import EthicsAdvertCard, { EthicsAdvertCardProps } from './EthicsAdvertCard';
import { useRouter } from 'next/router';
import { updateDocument } from '../../firebase/firestore';
import { useAuth } from '../../Context/AuthContext';

interface AdvertReviewOptionsProps {
    AdvertCardProps: EthicsAdvertCardProps;
    ResearcherId: string
    Department:string
}


const updateStudyStatus = async (department: any, researcherID: any, departmentStudyId: any, docStatus: any , rejectionReason: any) => {
    try {
        await updateDocument(
            `departments/${department}/Researchers/${researcherID}/studies`,
            departmentStudyId,
            {
                'studyObj.EthicsApprovalObject.status': docStatus,
                'studyObj.EthicsApprovalObject.RejectedReason': rejectionReason,
            }
        );
        console.log('Document updated successfully!');
    } catch (error) {
        console.error('Error updating document:', error);
    }
};

const AdvertReviewOptions: React.FC<AdvertReviewOptionsProps> = ({ AdvertCardProps , ResearcherId , Department}) => {
    const router = useRouter();
    const { isLoggedIn, username, department, overallRating, accountType, id, setAuth } = useAuth();

    const [permanantDisabled,setPermanantDisabled] = useState<boolean>(false)
    const [ApproveDisabled, setApproveDisabled] = useState<boolean>(true);

    useEffect(() => {
        const updatedClickedAccept = router.query.clickedAccept
        setApproveDisabled((updatedClickedAccept==='false'))
       
    
        
    }, [router.query.clickedAccept,router.query.clickedReject]);
    return (
        <div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: '0.75%',
                }}
            >
                <div style={{ flex: '1', marginRight: '10px' }}>
                    <ApprovalCard
                        onApprove={() => {
                            
                            updateStudyStatus(
                                Department,
                                ResearcherId,
                                AdvertCardProps.studyId,
                                'Accept',
                                ''
                            );
                            setPermanantDisabled(true)
                            
                            // Additional logic if needed
                        }}
                    
                        disabled={permanantDisabled ? true : !ApproveDisabled}
                    />
                </div>
                <div style={{ flex: '2', marginLeft: '-25.8vw' }}>
                    <RejectionCard
                        onReject={(reason: string) => {
                            updateStudyStatus(
                                Department,
                                ResearcherId,
                                AdvertCardProps.studyId,
                                'Dispute',
                                reason
                            );
                            setPermanantDisabled(true)
                        }}
                        disabled={permanantDisabled ?  true : ApproveDisabled}
                    />
                </div>
            </div>
            <div
                style={{
                    position: 'relative',
                    borderRadius: '10px',
                    padding: '0px',
                    bottom: '15.8vh',
                    margin: '15px 0',
                    maxWidth: '32vh',
                }}
            >
                <EthicsAdvertCard {...AdvertCardProps} />
            </div>
        </div>
    );
};

export default AdvertReviewOptions;