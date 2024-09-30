import React, { useState } from "react";

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
import ForgotPassword from "./components/ForgotPassword";
import PersonalInfo from "./components/PersonalInfo";
import Navbar from "./components/Navbar";

function App() {
  const [userRole, setUserRole] = useState(null);
  const [email, setUserEmail] = useState(null);

  //  setUserData state
  function onSetUserRole(user) {
    setUserRole(user);
  }

  // setUserData mail
  function onSetUserMail(user) {
    setUserEmail(user);
  }

  return (
    <Router>
      <Navbar userType={userRole} />
      <Routes>
        {/* Default route - redirect to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Login Route */}
        <Route
          path="/login"
          element={
            <Login
              userRoleChanged={onSetUserRole}
              // setUserMail={onSetUserMail}
            />
          }
        />
        {/* Signup Route */}
        <Route path="/signup" element={<SignUp />} />
        {/* Signup Route */}
        <Route path="/home" element={<HomePage />} />
        {/* Forgot-Password Route */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* דף מידע אישי */}
        <Route path="/PersonalInfo" element={<PersonalInfo />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
