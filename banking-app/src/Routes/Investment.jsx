import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/Header'; // Assuming Header component exists
import baseUrl from './config'; 


const Investment = () => {
    const [investmentAmount, setInvestmentAmount] = useState('');
    const [investmentSuccess, setInvestmentSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [dailyInterest, setDailyInterest] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [isLoading, setIsLoading] = useState(false);


    const handleInvestmentAmountChange = (event) => {
        setInvestmentAmount(event.target.value);
    };

    const handleInvest = async () => {
        setIsLoading(true); // Set loading state to true before request

        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.post(`${baseUrl}/start-investment`, { amount: investmentAmount }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setInvestmentSuccess(true);
            setDailyInterest(response.data.dailyInterest);
            setTotalEarnings(response.data.totalEarnings);
            setErrorMessage('');
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An error occurred while investing. Please try again.');
            }
        } finally {
            setIsLoading(false); // Set loading state to false after request completes
        }
    };

    return (
        <>
            {isLoading && ( // Render the loading component only when isLoading is true
                <div className="loading-state">
                    <div className="loading"></div>
                </div>
            )}
            <Header />
            <div className="investment-container">
                <h2>Invest Now</h2>
                <div className="input-group">
                    <label htmlFor="investmentAmount">Investment Amount:</label>
                    <input
                        type="number"
                        id="investmentAmount"
                        value={investmentAmount}
                        onChange={handleInvestmentAmountChange}
                        className="form-input"
                        placeholder="Enter amount (USD)" // Added placeholder for better user guidance
                    />
                </div>
                <button className="invest-button" onClick={handleInvest}>
                    Invest
                </button>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                {investmentSuccess && (
                    <div className="investment-success">
                        <h3>Investment Successful!</h3>
                        <p>Daily Interest: {dailyInterest}%</p>
                        <p>Total Earnings (30 days): {totalEarnings}</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Investment;