import { useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function BuyerLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("access");
  const decoded = token ? jwtDecode(token) : {};
  const fullName = decoded.full_name || "Buyer";

  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Craftique</h2>
        <nav style={styles.nav}>
          <Link to="/buyer/dashboard" style={getNavLinkStyle("/buyer/dashboard", active)}>Home</Link>
          <Link to="/buyer/orders" style={getNavLinkStyle("/buyer/orders", active)}>Orders</Link>
          <Link to="/buyer/wishlist" style={getNavLinkStyle("/buyer/wishlist", active)}>Wishlist</Link>
          <Link to="/buyer/cart" style={getNavLinkStyle("/buyer/cart", active)}>Cart</Link>
          <Link to="/buyer/products" style={getNavLinkStyle("/buyer/products", active)}>All Products</Link>
          <Link to="/buyer/profile" style={getNavLinkStyle("/buyer/profile", active)}>Profile</Link>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </nav>
      </aside>

      {/* Main Content */}
      <div style={styles.main}>
        <header style={styles.header}>
          <div style={styles.userBox}>
            <span style={styles.userName}>👋 {fullName}</span>
            <img
              src="http://localhost:8000/media/profilephotos/male_dp.jpeg"
              alt="Profile"
              style={styles.avatar}
            />
          </div>
        </header>
        <main style={styles.content}>{children}</main>
      </div>
      

    </div>
      
  );
}

function getNavLinkStyle(path, activePath) {
  const isActive = path === activePath;
  return {
    ...styles.navLink,
    backgroundColor: isActive ? "#b98e69" : "transparent",
    color: isActive ? "#fff" : "#4a3f35",
    fontWeight: isActive ? "600" : "normal",
  };
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f6f3f0",
  },
  sidebar: {
    width: "220px",
    backgroundColor: "#7c5c45",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    fontSize: "1.6rem",
    fontWeight: "bold",
    marginBottom: "30px",
    fontFamily: "'Playfair Display', serif",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  navLink: {
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: "5px",
    transition: "all 0.3s ease",
    backgroundColor: "transparent",
  },
  logoutBtn: {
    marginTop: "auto",
    padding: "10px 14px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#a55439",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    height: "60px",
    backgroundColor: "#d9c7b2",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0 20px",
    borderBottom: "1px solid #ccc",
  },
  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  userName: {
    fontSize: "0.95rem",
    fontWeight: "500",
    color: "#4a3f35",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  content: {
    padding: "25px",
    flex: 1,
    backgroundColor: "#fdfaf7",
  },
};

export default BuyerLayout;