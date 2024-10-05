import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Password reset link sent! Check your email.");
      } else {
        setMessage(data.error || "Error sending reset link.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setMessage("An error occured, Please try again.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h1>Forgot Password?</h1>
      <p>Enter your email to recieve a password reset link.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
