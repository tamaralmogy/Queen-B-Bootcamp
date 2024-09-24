import React, { useState, useEffect } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import { useRef } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";

import LoginSignup from "./components/LoginSignup.jsx";
// const port = process.env.PORT || 5001;

// import HomePage from '../../src/controllers/homeController';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route - redirect to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Signup Route */}
        <Route path="/signup" element={<SignUp />} />

        {/* Signup Route */}
        <Route path="/home" element={<HomePage />} />    

      </Routes>
    </Router>
  );
}

export default App;