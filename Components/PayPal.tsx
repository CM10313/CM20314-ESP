import React, { useEffect, useState, useRef } from "react";
import { fetchDocumentById } from "../firebase/firestore";

interface TransactionProps {
    studyId: string;
    ResearcherId: string;
    department: string;
    participantId: string;
}

const Paypal: React.FC<TransactionProps> = ({ ResearcherId, department, participantId, studyId }) => {
    const [sdkReady, setSdkReady] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const paypalRef = useRef<HTMLDivElement>(null);

    const [storedUser, setStoredUser] = useState<any>(null);
    const [storedStudyData, setStoredStudyData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await fetchDocumentById('users', participantId);
                const study = await fetchDocumentById(`departments/${department}/Researchers/${ResearcherId}/studies`, studyId);
                setStoredUser(user);
                setStoredStudyData(study);
            } catch (error) {
                console.error('Error fetching data:', error);
                setPaymentError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [ResearcherId, department, participantId, studyId]);

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
        console.log("Stored User:", storedUser);
    }, [storedUser]);

    useEffect(() => {
        console.log("Stored Study Data:", storedStudyData);
    }, [storedStudyData]);

    useEffect(() => {
        
        if (sdkReady && window.paypal && storedStudyData && storedUser && paypalRef.current) {
            // Render PayPal button
            const userEmail = storedUser.email
            console.log(storedUser.email)
            console.log(userEmail)
            window.paypal.Buttons({
                createOrder: (data: any, actions: any) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Participant Payment",
                                amount: {
                                    currency_code: "GBP",
                                    value: storedStudyData?.studyObj.CompensationObject.amount
                                },
                                shipping_preference: "NO_SHIPPING",
                                payee: {
                                    email_address: userEmail // Recipient's email address
                                }
                            },
                        ],
                    });
                },
                onApprove: async (data: any, actions: any) => {
                    const order = await actions.order.capture();
                    console.log(order);
                },
                onError: (err: any) => {
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
    }, [sdkReady, storedStudyData, storedUser]);

    return (
        <div>
            {paymentError && <p>{paymentError}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div ref={paypalRef}></div>
            )}
        </div>
    );
};

export default Paypal;
