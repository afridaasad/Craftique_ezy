import React, { useState, useEffect } from "react";
import axios from "axios";

const ArtisanProfile = () => {
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    profile_picture: null,
  });
  const [preview, setPreview] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("access");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/profile/", { headers });
      setProfile({
        full_name: res.data.full_name,
        phone: res.data.phone,
        profile_picture: null,
      });
      setPreview(res.data.profile_picture);
    } catch (err) {
      console.error("Failed to load profile");
    }
  };

  const handleProfileUpdate = async () => {
    const formData = new FormData();
    formData.append("full_name", profile.full_name);
    formData.append("phone", profile.phone);
    if (profile.profile_picture) {
      formData.append("profile_picture", profile.profile_picture);
    }

    try {
      await axios.put("http://127.0.0.1:8000/api/profile/update/", formData, {
        headers: { ...headers, "Content-Type": "multipart/form-data" },
      });
      setMsg("Profile updated.");
      setError("");
    } catch (err) {
      setError("Update failed.");
      setMsg("");
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      await axios.put(
        "http://127.0.0.1:8000/api/profile/update-password/",
        { new_password: newPassword },
        { headers }
      );
      setMsg("Password updated.");
      setError("");
    } catch (err) {
      setError("Password update failed.");
      setMsg("");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>👤 Artisan Profile</h2>

      <div style={styles.section}>
        <input
          type="text"
          placeholder="Full Name"
          style={styles.input}
          value={profile.full_name}
          onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Phone"
          style={styles.input}
          value={profile.phone}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
        />

        <input
          type="file"
          style={styles.input}
          onChange={(e) => {
            setProfile({ ...profile, profile_picture: e.target.files[0] });
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={styles.previewImage}
          />
        )}

        <button
          onClick={handleProfileUpdate}
          style={styles.button}
        >
          Update Profile
        </button>
      </div>

      <hr style={styles.divider} />

      <h2 style={styles.heading}>🔐 Change Password</h2>

      <div style={styles.section}>
        <input
          type="password"
          placeholder="New Password"
          style={styles.input}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          onClick={handlePasswordUpdate}
          style={styles.button}
        >
          Update Password
        </button>
      </div>

      {msg && <p style={{ ...styles.message, color: "#207b20" }}>{msg}</p>}
      {error && <p style={{ ...styles.message, color: "#b3261e" }}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "700px",
    margin: "0 auto",
    fontFamily: "sans-serif",
    backgroundColor: "#fffaf5",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
  },
  heading: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#5c3d2e",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "2rem",
  },
  input: {
    border: "1px solid #c2a68d",
    padding: "0.75rem",
    borderRadius: "6px",
    width: "100%",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#b78564",
    color: "white",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  previewImage: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #c2a68d",
  },
  divider: {
    border: "none",
    height: "1px",
    backgroundColor: "#e0cfc0",
    margin: "2rem 0",
  },
  message: {
    fontWeight: "bold",
    marginTop: "1rem",
  },
};

export default ArtisanProfile;
