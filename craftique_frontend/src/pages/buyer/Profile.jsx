import React, { useState, useEffect } from "react";
import axios from "axios";

const BuyerProfile = () => {
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    profile_picture: null,
  });
  const [preview, setPreview] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    label: "Home",
    address_line: "",
    city: "",
    postal_code: "",
    country: "India",
    is_default: false,
  });

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("access");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchProfile();
    fetchAddresses();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/profile/", {
        headers,
      });
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

  const fetchAddresses = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/buyer/addresses/", {
        headers,
      });
      setAddresses(res.data);
    } catch (err) {
      console.error("Could not load addresses");
    }
  };

  const addAddress = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/buyer/addresses/add/", newAddress, {
        headers,
      });
      setNewAddress({
        label: "Home",
        address_line: "",
        city: "",
        postal_code: "",
        country: "India",
        is_default: false,
      });
      fetchAddresses();
    } catch (err) {
      console.error("Failed to add address");
    }
  };

  const deleteAddress = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/buyer/addresses/${id}/delete/`, {
        headers,
      });
      fetchAddresses();
    } catch (err) {
      console.error("Failed to delete address");
    }
  };

  return (
  <div style={{ maxWidth: "850px", margin: "0 auto", padding: "30px" }}>
    <h2 className="text-3xl font-bold mb-6 text-[#7b4b3a]">👤 My Profile</h2>

    {/* Profile Section */}
    <div className="bg-[#fefaf7] rounded-lg shadow-md p-6 mb-10 border border-[#d3bfb2]">
      <h3 className="text-xl font-semibold mb-4 text-[#5a3c30]">📝 Edit Profile</h3>
      <div className="grid gap-4">
        <input
          type="text"
          placeholder="Full Name"
          className="border border-[#c4a890] p-2 rounded-md w-full focus:outline-[#7b4b3a]"
          value={profile.full_name}
          onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Phone"
          className="border border-[#c4a890] p-2 rounded-md w-full"
          value={profile.phone}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
        />

        <input
          type="file"
          className="border border-[#c4a890] p-2 rounded-md w-full"
          onChange={(e) => {
            setProfile({ ...profile, profile_picture: e.target.files[0] });
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-full border border-[#7b4b3a]"
          />
        )}

        <button
          onClick={handleProfileUpdate}
          className="bg-[#7b4b3a] text-white px-5 py-2 rounded-md hover:bg-[#5f382c] transition"
        >
          💾 Save Profile
        </button>
      </div>
    </div>

    {/* Password Section */}
    <div className="bg-[#fefaf7] rounded-lg shadow-md p-6 mb-10 border border-[#d3bfb2]">
      <h3 className="text-xl font-semibold mb-4 text-[#5a3c30]">🔐 Change Password</h3>
      <div className="grid gap-4">
        <input
          type="password"
          placeholder="New Password"
          className="border border-[#c4a890] p-2 rounded-md w-full"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          onClick={handlePasswordUpdate}
          className="bg-[#7b4b3a] text-white px-5 py-2 rounded-md hover:bg-[#5f382c] transition"
        >
          🔁 Update Password
        </button>
      </div>
    </div>

    {/* Addresses Section */}
    <div className="bg-[#fefaf7] rounded-lg shadow-md p-6 mb-10 border border-[#d3bfb2]">
      <h3 className="text-xl font-semibold mb-4 text-[#5a3c30]">📦 Saved Addresses</h3>

      <div className="space-y-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="border border-[#e0cfc4] rounded-md p-4 flex justify-between items-start bg-white shadow-sm"
          >
            <div>
              <p className="font-semibold text-[#7b4b3a]">{addr.label}</p>
              <p className="text-sm text-gray-700">
                {addr.address_line}, {addr.city} - {addr.postal_code}, {addr.country}
              </p>
            </div>
            <button
              className="text-red-500 text-sm hover:underline"
              onClick={() => deleteAddress(addr.id)}
            >
              ❌ Delete
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* Add Address Section */}
    <div className="bg-[#fefaf7] rounded-lg shadow-md p-6 border border-[#d3bfb2]">
      <h3 className="text-xl font-semibold text-[#5a3c30] mb-4">➕ Add New Address</h3>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Label (e.g., Home)"
          value={newAddress.label}
          onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
          className="border border-[#c4a890] p-2 rounded-md w-full"
        />
        <textarea
          placeholder="Address line"
          value={newAddress.address_line}
          onChange={(e) => setNewAddress({ ...newAddress, address_line: e.target.value })}
          className="border border-[#c4a890] p-2 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="City"
          value={newAddress.city}
          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
          className="border border-[#c4a890] p-2 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={newAddress.postal_code}
          onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })}
          className="border border-[#c4a890] p-2 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Country"
          value={newAddress.country}
          onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
          className="border border-[#c4a890] p-2 rounded-md w-full"
        />
        <label className="text-sm flex items-center space-x-2 text-gray-700">
          <input
            type="checkbox"
            checked={newAddress.is_default}
            onChange={(e) =>
              setNewAddress({ ...newAddress, is_default: e.target.checked })
            }
          />
          <span>Set as default address</span>
        </label>
        <button
          className="bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition"
          onClick={addAddress}
        >
          ➕ Add Address
        </button>
      </div>
    </div>

    {/* Messages */}
    {msg && <p className="text-green-700 mt-6 font-medium">{msg}</p>}
    {error && <p className="text-red-600 mt-6 font-medium">{error}</p>}
  </div>
);
};

export default BuyerProfile;
