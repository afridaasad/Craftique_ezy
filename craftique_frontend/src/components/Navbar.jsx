import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getDashboardPath = () => {
    if (user?.role === "buyer") return "/buyer/dashboard";
    if (user?.role === "artisan") return "/artisan/dashboard";
    if (user?.role === "admin") return "/admin/dashboard";
    return "/";
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo} onClick={() => navigate("/")}>
        Craftique
      </div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
        {user ? (
          <>
            <Link to={getDashboardPath()} style={styles.link}>Dashboard</Link>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={styles.button}>Login</Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: "#4b2e2e",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#f0cfa0",
    color: "#4b2e2e",
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  }
};

export default Navbar;
