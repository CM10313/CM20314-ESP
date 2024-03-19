import React, { useState } from "react";

const PaypalMeLink: React.FC<{ email: string; ParticipantUsername: string }> = ({ email, ParticipantUsername }) => {
    const [username, setUsername] = useState(ParticipantUsername);
    const [paypalMeLink, setPaypalMeLink] = useState("");
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const generatePaypalMeLink = () => {
        if (username) {
            const paypalMeUsername = username.trim().replace(/\s+/g, "");
            const link = `https://paypal.me/${paypalMeUsername}`;
            setPaypalMeLink(link);
            setButtonClicked(true);
        } else {
            alert("Please enter a username");
        }
    };

    return (
        <div style={{textAlign: "center" }}>
            <h2>Generate PayPal.me Link</h2>
            {!buttonClicked && (
                <>
                    <input
                        type="text"
                        placeholder="Enter your PayPal.me username"
                        value={username}
                        onChange={handleUsernameChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <br />
                    <button onClick={generatePaypalMeLink}>Generate Link</button>
                </>
            )}
            {paypalMeLink && (
                <div style={{ marginTop: "20px" }}>
                    <a href={paypalMeLink} target="_blank" rel="noopener noreferrer">
                        {paypalMeLink}
                    </a>
                </div>
            )}
        </div>
    );
};

export default PaypalMeLink;