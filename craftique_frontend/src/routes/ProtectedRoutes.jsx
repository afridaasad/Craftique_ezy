import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("access");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);

    const isAllowed =
      (allowedRoles.includes("buyer") && decoded.is_buyer) ||
      (allowedRoles.includes("artisan") && decoded.is_artisan) ||
      (allowedRoles.includes("admin") && decoded.is_admin);

    return isAllowed ? children : <Navigate to="/login" />;
  } catch (e) {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
