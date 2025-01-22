import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from './config'; 


const Transfer = () => {
    const [recipientAccountNumber, setRecipientAccountNumber] = useState('');
    const [amount, setAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [transferSuccess, setTransferSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleTransfer = async () => {
        setIsLoading(true); // Set loading state to true before request
        setErrorMessage(''); // Clear previous errors before attempting transfer

        try {
            const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage

            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.post(`${baseUrl}/transfer`, {
                recipientAccountNumber,
                amount,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setTransferSuccess(true);
            setRecipientAccountNumber(''); // Clear fields after successful transfer
            setAmount(0);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An error occurred during transfer. Please try again later.');
            }
        } finally {
            setIsLoading(false); // Set loading state to false after request completes
        }
    };
    return (

        <>  {isLoading && ( // Render the loading component only when isLoading is true
            <div className="loading-state">
                <div className="loading"></div>
            </div>
        )}
            <div className="transfer-container">
                <h2>Transfer Funds</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="recipientAccountNumber">Recipient Account Number:</label>
                        <input
                            type="text"
                            id="recipientAccountNumber"
                            value={recipientAccountNumber}
                            onChange={(e) => setRecipientAccountNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount (&#8358;):</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="0.01" // Enforce minimum transfer amount
                            step="0.01" // Allow decimal values
                            required
                        />
                    </div>
                    <button type="submit" className="transfer-button" onClick={handleTransfer}>
                        Transfer Funds
                    </button>
                </form>
                {errorMessage && <p className="error-message-dashboard">{errorMessage}</p>}
                {transferSuccess && <p className="success-message">Transfer successful!</p>}
            </div>
        </>

    );
};

export default Transfer;