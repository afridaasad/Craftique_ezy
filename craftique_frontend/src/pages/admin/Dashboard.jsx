import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AdminLayout from "../../layouts/AdminLayout";

function AdminDashboard() {
  const [fullName, setFullName] = useState("User");

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      const decoded = jwtDecode(token);
      setFullName(decoded.full_name || "User");
    }
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-xl font-bold">Hello, {fullName}!</h1>
      <p>You can manage users and content here.</p>
    </AdminLayout>
  );
}

export default AdminDashboard;
