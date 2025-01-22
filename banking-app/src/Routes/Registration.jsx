import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import baseUrl from './config'; 


const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // Get the navigate function



    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const requestOtp = async () => {
        setIsLoading(true); // Set loading state to true before request
        try {
            const response = await axios.post(`${baseUrl}/send-otp`, { email });
            console.log('OTP request sent:', response.data); // For debugging
            setErrorMessage(''); // Clear any previous error messages
        } catch (error) {
            console.error('Error requesting OTP:', error);
            // Set errorMessage to the message from the backend response
            setErrorMessage(error.response?.data?.message || 'An error occurred while requesting OTP. Please try again.');
        } finally {
            setIsLoading(false); // Set loading state to false after request completes
        }
    };

    const verifyOtp = async () => {
        setIsLoading(true); // Set loading state to true before request
        try {
            const response = await axios.post(`${baseUrl}/verify-otp`, { email, otp });
            if (response.data.message === 'OTP is valid') {
                setShowRegistrationForm(true);
                console.log(response.data.email);
                setEmail(response.data.email);
                setErrorMessage(''); // Clear any previous error messages
            } else {
                setErrorMessage('Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setErrorMessage('An error occurred while verifying OTP. Please try again.');
        } finally {
            setIsLoading(false); // Set loading state to false after request completes
        }
    };
    const handleRegistration = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        setIsLoading(true); // Set loading state to true before request
      
        try {
          const registrationData = {
            email,
            name,
            phoneNumber,
            address,
            password,
          };
      
          const response = await axios.post(`${baseUrl}/register`, registrationData);
          console.log(registrationData);
          console.log('Registration successful:', response.data); // For debugging
      
          // Handle successful registration (e.g., redirect to login page)
          navigate('/login'); // Redirect to the login page after successful registration
        } catch (error) {
          console.error('Error registering user:', error);
          setErrorMessage(error.response?.data?.message || 'An error occurred while verifying OTP. Please try again.'); 
        } finally {
          setIsLoading(false); // Set loading state to false after request completes
        }
      };

    return (
        <>

            <Header />
            <div className="container">
                <div className="form-wrapper">
                    <h2 className="form-title">Registration</h2>

                    {isLoading && ( // Render the loading component only when isLoading is true
                        <div className="loading-state">
                            <div className="loading"></div>
                        </div>
                    )}
                    {!showRegistrationForm && (
                        <div>
                            <p>Please enter your email address to register.</p>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                className="form-input"
                            />
                            <button className="form-button" onClick={requestOtp}>Request OTP</button>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={handleOtpChange}
                                className="form-input"
                            />
                            <button className="form-button" onClick={verifyOtp}>Verify OTP</button>
                            {errorMessage && <p className="error-message-dashboard">{errorMessage}</p>}
                        </div>
                    )}
                    {showRegistrationForm && (
                        <form onSubmit={handleRegistration}>

                            {isLoading && ( // Render the loading component only when isLoading is true
                                <div className="loading-state">
                                    <div className="loading"></div>
                                </div>
                            )}
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={handleNameChange}
                                className="form-input"
                                required
                            />


                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                className="form-input"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={handleAddressChange}
                                className="form-input"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="form-input"
                                required
                            />
                            <button type="submit" className="form-button">Register</button>
                            {errorMessage && <p className="error-message-dashboard">{errorMessage}</p>}
                        </form>
                    )}
                </div>
            </div>

        </>
    );
};

export default RegistrationForm;