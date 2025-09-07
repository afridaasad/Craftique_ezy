import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/artisan/dashboard" },
  { name: "Add Product", path: "/artisan/add-product" },
  { name: "Products", path: "/artisan/products" },
  { name: "Orders", path: "/artisan/orders" },
  { name: "Payments", path: "/artisan/payments" },
  { name: "Analytics", path: "/artisan/analytics" },
];

const SideNav = () => {
  const location = useLocation();

  return (
    <nav style={{ width: "220px", background: "#fff3e6", padding: "20px", borderRight: "1px solid #ddd" }}>
      <h2 style={{ fontFamily: "serif", color: "#4b2e1f", marginBottom: "20px" }}>Artisan Panel</h2>
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            display: "block",
            margin: "10px 0",
            color: location.pathname === item.path ? "#4b2e1f" : "#555",
            fontWeight: location.pathname === item.path ? "bold" : "normal",
            textDecoration: "none",
          }}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default SideNav;
