import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import RegistrationForm from "./Routes/Registration"
import Login from './Routes/Login';
import Dashboard from './Routes/Dashboard';
import CreateCard from './Routes/GenerateVisualCard';
import Investment from './Routes/Investment';
import Home from './Routes/Home'
import Transfer from './Routes/Transfer';

function App() {

  return (
    <>
      <Router>

        <Routes>
        <Route path="/" element={<Home />} />

          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/generate-visual-card" element={<CreateCard />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/transfer" element={<Transfer />} />


        </Routes>
      </Router>
    </>
  )
}

export default App
 