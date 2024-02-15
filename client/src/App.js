import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/Login';
import SignUpPage from './components/Signup';
import PageDetails from './components/agent';
import './App.css';

const App = () => {
  return (
    <Router>
      {/* <div className="navbar">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/signup" className="nav-link">
          Sign Up
        </Link>
      </div> */}

      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<SignUpPage />} />
        <Route path="/fbpage" element={<PageDetails/>} />
      </Routes>
    </Router>
  );
};

export default App;
