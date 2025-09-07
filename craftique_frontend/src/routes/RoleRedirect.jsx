import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function RoleRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log(decoded);
      const { is_buyer, is_artisan, is_admin } = decoded;

      if (is_admin) {
        navigate("/admin/dashboard");
      } else if (is_artisan) {
        navigate("/artisan/dashboard");
      } else if (is_buyer) {
        navigate("/buyer/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Invalid token");
      navigate("/login");
    }
  }, [navigate]);

  return <p className="text-center p-4">Redirecting...</p>;
}

export default RoleRedirect;
