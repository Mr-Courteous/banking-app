import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import baseUrl from './config'; 


const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true); // Set loading state to true before request
      try {
        const token = localStorage.getItem('authToken');

        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`${baseUrl}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'An error occurred while fetching user data.');
      } finally {
        setIsLoading(false); // Set loading state to false after request completes
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      {isLoading && ( // Render the loading component only when isLoading is true
        <div className="loading-state">
          <div className="loading"></div>
        </div>
      )}
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {userData ? (
          <div className="user-info">
            <h3>User Information</h3>
            <ul>
              <li><strong>Name:</strong> {userData.name}</li>
              <li><strong>Email:</strong> {userData.email}</li>
              <li><strong>Phone Number:</strong> {userData.phoneNumber}</li>
              <li><strong>Account Number:</strong> {userData.accountNumber}</li>
              <li><strong>Account Balance:</strong> {userData.accountBalance}</li>

            </ul>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        <div className="actions">
          <h3>Quick Actions</h3>
          <Link to="/transfer" className="action-button">Transfer Funds</Link>
          <Link to="/investment" className="action-button">Invest</Link>
          <Link to="/generate-visual-card" className="action-button">Generate Visual Card</Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;