import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role: "buyer",
  });

  const [error, setError] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [emailStatus, setEmailStatus] = useState(null);

  const checkUsername = async (username) => {
    if (!username) return;
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/auth/check-username/?username=${username}`
      );
      setUsernameAvailable(!res.data.exists);
    } catch {
      setUsernameAvailable(null);
    }
  };

  const checkEmail = async (email) => {
    if (!email.includes("@") || !email.includes(".")) {
      setEmailStatus("invalid");
      return;
    }

    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/auth/check-email/?email=${email}`
      );
      setEmailStatus(res.data.exists ? "exists" : "ok");
    } catch {
      setEmailStatus(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://127.0.0.1:8000/api/auth/register/", {
        username: form.username,
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        is_buyer: form.role === "buyer",
        is_artisan: form.role === "artisan",
      });
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.detail || "Registration failed.";
      setError(JSON.stringify(err.response?.data));
    }
  };

  return (
    <>
      <style>{`
        .register-wrapper {
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f1ee;
  padding: 40px 20px;
  box-sizing: border-box;
}

        .register-form {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          width: 100%;
          max-width: 500px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .form-title {
          font-size: 24px;
          text-align: center;
          color: #5c3a1e;
          margin-bottom: 5px;
        }
        .form-subtitle {
          text-align: center;
          font-size: 14px;
          color: #888;
          margin-bottom: 20px;
        }
        .form-input,
        .form-select {
          padding: 10px;
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
        .form-button {
          background-color: #8b5e3c;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        .form-button:hover {
          background-color: #71492b;
        }
        .form-footer {
          text-align: center;
          font-size: 14px;
          color: #555;
        }
        .link-text {
          color: #8b5e3c;
          cursor: pointer;
          text-decoration: underline;
        }
        .valid-feedback {
          color: green;
          font-size: 12px;
        }
        .invalid-feedback {
          color: red;
          font-size: 12px;
        }
        .error-message {
          background-color: #fee;
          color: #a00;
          padding: 10px;
          border-radius: 5px;
          font-size: 14px;
        }
      `}</style>

      <div className="register-wrapper">
        <form onSubmit={handleSubmit} className="register-form">
          <h2 className="form-title">Create Your Craftique Account</h2>
<p className="form-subtitle">Join our community of artisans and buyers.</p>

{error && <div className="error-message">{error}</div>}

{/* Username */}
<label>Username</label>
<input
  type="text"
  placeholder="Choose a username"
  className="form-input"
  onChange={(e) => {
    const value = e.target.value;
    setForm({ ...form, username: value });
    checkUsername(value);
  }}
  required
/>
{usernameAvailable === true && (
  <p className="valid-feedback">✅ Username available</p>
)}
{usernameAvailable === false && (
  <p className="invalid-feedback">❌ Username already exists</p>
)}

{/* Full Name */}
<label>Full Name</label>
<input
  type="text"
  placeholder="Enter your full name"
  className="form-input"
  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
  required
/>

{/* Email */}
<label>Email</label>
<input
  type="email"
  placeholder="Enter your email address"
  className="form-input"
  onChange={(e) => {
    const value = e.target.value;
    setForm({ ...form, email: value });
    checkEmail(value);
  }}
  required
/>
{emailStatus === "ok" && <span className="valid-feedback">✔</span>}
{emailStatus === "invalid" && (
  <p className="invalid-feedback">❌ Enter a valid email</p>
)}
{emailStatus === "exists" && (
  <p className="invalid-feedback">❌ Email already exists</p>
)}

{/* Phone */}
<label>Phone</label>
<input
  type="text"
  placeholder="Enter your phone number"
  className="form-input"
  onChange={(e) => setForm({ ...form, phone: e.target.value })}
  required
/>

{/* Password */}
<label>Password</label>
<input
  type="password"
  placeholder="Create a password"
  className="form-input"
  onChange={(e) => setForm({ ...form, password: e.target.value })}
  required
/>

{/* Role */}
<label>Role</label>
<select
  className="form-input"
  value={form.role}
  onChange={(e) => setForm({ ...form, role: e.target.value })}
  required
>
  <option value="" disabled>Select your role</option>
  <option value="buyer">Buyer</option>
  <option value="artisan">Artisan</option>
</select>

{/* Submit */}
<button type="submit" className="form-button">
  Register
</button>

<p className="form-footer">
  Already have an account?{" "}
  <span onClick={() => navigate("/login")} className="link-text">
    Login
  </span>
</p>

        </form>
      </div>
    </>
  );
}

export default RegisterPage;
