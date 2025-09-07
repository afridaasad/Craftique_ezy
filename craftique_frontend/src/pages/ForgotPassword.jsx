import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    username: "",
    phone: "",
    newPassword: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleVerify = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/verify-user-phone/", {
        username: form.username,
        phone: form.phone,
      });

      if (res.data.status === "verified") {
        setStep(2);
      } else if (res.data.status === "already_has_security_question") {
        navigate("/forgot-password-security");
      }
    } catch (err) {
      if (err.response?.data?.status === "invalid_phone") {
        setError("Phone number does not match this username.");
      } else if (err.response?.data?.status === "user_not_found") {
        setError("User not found.");
      } else {
        setError("Something went wrong.");
      }
    }
  };

  const handleReset = async () => {
    if (!form.newPassword || !form.securityQuestion || !form.securityAnswer) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/set-password/", {
        username: form.username,
        new_password: form.newPassword,
        security_question: form.securityQuestion,
        security_answer: form.securityAnswer,
      });

      if (res.data.status === "password_updated") {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (err) {
      setError("Failed to reset password. Try again.");
    }
  };

  const containerStyle = {
    maxWidth: "420px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#f4eee0",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    fontFamily: "Segoe UI, sans-serif",
  };

  const headingStyle = {
    color: "#5b3a2b",
    textAlign: "center",
    marginBottom: "20px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #c1a57b",
    backgroundColor: "#fff8ef",
    fontSize: "15px",
    outline: "none",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#8b5e3c",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const errorStyle = {
    color: "#b00020",
    backgroundColor: "#fdecea",
    padding: "10px",
    borderRadius: "6px",
    marginTop: "15px",
    textAlign: "center",
  };

  const successStyle = {
    color: "#0c6b38",
    backgroundColor: "#e6f4ea",
    padding: "10px",
    borderRadius: "6px",
    marginTop: "15px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Forgot Password</h2>

      {step === 1 && (
        <>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={form.username}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="phone"
            placeholder="Enter your registered phone number"
            value={form.phone}
            onChange={handleChange}
            style={inputStyle}
          />
          <button onClick={handleVerify} style={buttonStyle}>
            Verify
          </button>
        </>
      )}

      {step === 2 && !success && (
        <>
          <input
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            value={form.newPassword}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="securityQuestion"
            placeholder="Set a security question"
            value={form.securityQuestion}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="securityAnswer"
            placeholder="Set an answer"
            value={form.securityAnswer}
            onChange={handleChange}
            style={inputStyle}
          />
          <button onClick={handleReset} style={buttonStyle}>
            Reset Password
          </button>
        </>
      )}

      {success && (
        <div style={successStyle}>
          ✅ Password reset successfully! Redirecting to login...
        </div>
      )}

      {error && (
        <div style={errorStyle}>
          ❌ {error}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
