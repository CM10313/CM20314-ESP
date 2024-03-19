import React, { useRef, useEffect, useState } from "react";
import { fetchDocumentById } from "../firebase/firestore";
 
declare global {
    interface Window {
            paypal?: any;
        }

    interface transactionProps {
        studyId: string;
        ResearcherId: string;
        department: string;
        participantId: string;

    }
}


const Paypal : React.FC <transactionProps> = ({ResearcherId , department , participantId ,studyId}) => {
    const [sdkReady, setSdkReady] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const paypalRef = useRef();


    const [storedUser, setStoredUser] = useState<any>(null);
    const [storedStudyData, setStoredStudyData] = useState<any>(null);

    const fetchData = async () => {
        try {
            const user = await fetchDocumentById('users', participantId);
            setStoredUser(user);
        
            const study = await fetchDocumentById(`departments/${department}/Researchers/${ResearcherId}/studies`, studyId)
            setStoredStudyData(study)
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=AaHyTqod09gBfH6zMkkrlT_jdiF-cJCfVXWRhHEvzWV2Cen1Pt2THA0mLKvfeTse4ZFfrozh27t_-fuG&currency=GBP";
        script.addEventListener("load", () => setSdkReady(true));
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (sdkReady && window.paypal) {
            window.paypal.Buttons({
                    createOrder: (data:any, actions:any) => {
                        return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                                {
                                    description: "Participant Payment",
                                    amount: {
                                        currency_code: "GBP",
                                        value: parseFloat(storedStudyData.CompensationObject.amount)
                                    },
                                    shipping_preference: "NO_SHIPPING",
                                    payee: {
                                        email_address: storedUser.email // Recipient's email address
                                    }
                                },
                            ],
                        });
                    },
                    onApprove: async (data:any, actions:any) => {
                        const order = await actions.order.capture();
                        console.log(order);
                    },
                    onError: (err:any) => {
                        console.log(err);
                    },
                    style: {
                        layout: "vertical",
                        disableFunding: "card"
                    },
                    commit: "complete", // Change button text to "Complete Payment"
                })
                .render(paypalRef.current);
        }
    }, [sdkReady]);

    return (
        <div>
            {paymentError && <p>{paymentError}</p>}
            <div ref={paypalRef}></div>
        </div>
    );
};

export default Paypal;