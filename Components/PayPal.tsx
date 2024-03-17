import React, { useRef, useEffect, useState } from "react";

declare global {
    interface Window {
        paypal?: any;
    }
}

const Paypal = () => {
    const [sdkReady, setSdkReady] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const paypalRef = useRef();

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
            window.paypal
                .Buttons({
                    createOrder: (data: any, actions: { order: { create: (arg0: { intent: string; purchase_units: { description: string; amount: { currency_code: string; value: number; }; }[]; }) => any; }; }, err: any) => {
                        return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                                {
                                    description: "Cool looking table",
                                    amount: {
                                        currency_code: "GBP",
                                        value: 0.10,
                                    },
                                },
                            ],
                        });
                    },
                    onApprove: async (data: any, actions: { order: { capture: () => any; }; }) => {
                        const order = await actions.order.capture();
                        console.log(order);
                    },
                    onError: (err: any) => {
                        console.log(err);
                    },
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