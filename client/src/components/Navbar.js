import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";

function Navbar({ userType }) {
  // const userRole = localStorage.getItem("userRole");

  return (
    <nav>
      <Link to="/home" className="nav-link">
        Home
      </Link>
      {userType === "mentor" && (
        <Link to="/PersonalInfo" className="nav-link">
          Personal Info
        </Link>
      )}
    </nav>
  );
}
export default Navbar;
