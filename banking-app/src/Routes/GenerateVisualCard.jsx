import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from './config'; 


const GenerateCard = () => {
  const [cardDetails, setCardDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [cardGenerated, setCardGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateCard = async () => {
    setIsLoading(true); // Set loading state to true before request
  
    try {
      const token = localStorage.getItem('authToken');
  
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await axios.post(`${baseUrl}/create-card`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setCardDetails(response.data);
      setCardGenerated(true);
      console.log(response.data.cardDetails);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred while generating the card. Please try again.');
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
      <div className="generate-card-container">
      <h2>Generate Visual Card</h2>
      <button className="generate-button" onClick={handleGenerateCard}>
        Generate Card
      </button>
      {errorMessage && <p className="error-message-dashboard">{errorMessage}</p>}

      {cardGenerated && (
        <div className="card-details">
          <h3>Your Card Details</h3>
          <p><strong>Card Number:</strong> {cardDetails?.cardDetails.cardNumber}</p>
          <p><strong>CVV:</strong> {cardDetails?.cardDetails.cvv}</p>
          <p><strong>Expiry Date:</strong> {cardDetails?.cardDetails.expiryDate}</p>
        </div>
      )}
    </div>
    </>

  );
};

export default GenerateCard;