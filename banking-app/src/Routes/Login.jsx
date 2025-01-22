import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation after login
import Header from '../Components/Header';
import baseUrl from './config'; 


const AuthContext = React.createContext(); // Context for authentication state

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            alert('Please fill in all required fields.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(`${baseUrl}/login`, {
                email,
                password,
            }, {
                withCredentials: true, // Remove this if not needed for your backend
            });

            console.log('Login successful:', response.data);

            // Check for token in response
            if (response.data.token) {
                const token = response.data.token;
                localStorage.setItem('jwtToken', token);
                navigate('/dashboard'); // Redirect to dashboard after successful login
            } else {
                console.error('Login successful, but no token received');
                alert('error');
            }
        } catch (error) {
            console.error('Error logging in:', error.response.data.error);
            alert(error.response.data.error);
        } finally {
            setIsLoading(false);
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

            <div className='container'>

                <div className="form-wrapper">

                    <h2 className="form-title">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input"

                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-input"

                        />

                        <button type="submit">Login</button>
                    </form>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                </div>
            </div>
        </>
    );
};

export default Login;