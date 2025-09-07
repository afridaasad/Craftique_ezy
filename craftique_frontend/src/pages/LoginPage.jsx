import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
        username: form.username,
        password: form.password,
      });

      const { access, refresh } = response.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      navigate("/role-redirect");
    } catch (err) {
      const data = err.response?.data;
      if (data?.detail) {
        setError(data.detail);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <>
      <style>{`
        .login-wrapper {
          min-height: 100dvh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f4f1ee;
          padding: 40px 20px;
          box-sizing: border-box;
        }
        .login-form {
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
        .form-input {
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
        .error-message {
          background-color: #fee;
          color: #a00;
          padding: 10px;
          border-radius: 5px;
          font-size: 14px;
        }
      `}</style>

      <div className="login-wrapper">
        <form onSubmit={handleLogin} className="login-form">
          <h2 className="form-title">Login to Craftique</h2>
          <p className="form-subtitle">Welcome back! Please sign in.</p>

          {error && <div className="error-message">{error}</div>}

          {/* Username */}
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            className="form-input"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />

          {/* Password */}
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="form-input"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {/* Submit */}
          <button type="submit" className="form-button">
            Login
          </button>

          {/* Footer */}
          <p className="form-footer">
            <span
              className="link-text"
              onClick={() => navigate("/ForgotPassword")}
            >
              Forgot Password?
            </span>
            <br />
            Don’t have an account?{" "}
            <span className="link-text" onClick={() => navigate("/register")}>
              Register
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
