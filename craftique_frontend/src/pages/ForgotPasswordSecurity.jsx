import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPasswordSecurity = () => {
  const [username, setUsername] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleFetchQuestion = async () => {
    setError("");
    if (!username) {
      setError("Please enter your username.");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/get-security-question/", {
        username,
      });
      setSecurityQuestion(res.data.question);
      setStep(2);
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Try again.");
      }
    }
  };

  const handleResetPassword = async () => {
    setError("");
    if (!securityAnswer || !newPassword) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/reset-password-security/", {
        username,
        security_answer: securityAnswer,
        new_password: newPassword,
      });

      if (res.data.status === "password_reset_successful") {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to reset password.");
      }
    }
  };

  const containerStyle = {
    maxWidth: "400px",
    margin: "60px auto",
    padding: "30px",
    background: "#fff8f0",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #c0a080",
    fontSize: "14px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#8b5e3c",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
  };

  const errorStyle = {
    color: "red",
    marginTop: "15px",
    fontWeight: "bold",
  };

  const successStyle = {
    color: "green",
    marginTop: "15px",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", color: "#5a3e2b" }}>Reset Password</h2>

      {step === 1 && (
        <>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
          <button onClick={handleFetchQuestion} style={buttonStyle}>Next</button>
        </>
      )}

      {step === 2 && !success && (
        <>
          <p><strong>Security Question:</strong> {securityQuestion}</p>
          <input
            type="text"
            placeholder="Your answer"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={inputStyle}
          />
          <button onClick={handleResetPassword} style={buttonStyle}>
            Reset Password
          </button>
        </>
      )}

      {success && <div style={successStyle}>✅ Password reset successful! Redirecting...</div>}
      {error && <div style={errorStyle}>❌ {error}</div>}
    </div>
  );
};

export default ForgotPasswordSecurity;
