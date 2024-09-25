import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import "./App.css";

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
