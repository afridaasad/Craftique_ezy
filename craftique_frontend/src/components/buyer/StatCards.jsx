import { useEffect, useState } from "react";
import axios from "axios";

function StatCards() {
  const [counts, setCounts] = useState({
    orders: 0,
    wishlist: 0,
    cart: 0,
  });

  const token = localStorage.getItem("access");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, wishlistRes, cartRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/buyer/orders/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://127.0.0.1:8000/api/buyer/wishlist/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://127.0.0.1:8000/api/buyer/cart/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setCounts({
          orders: ordersRes.data.length,
          wishlist: wishlistRes.data.length,
          cart: cartRes.data.length,
        });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <div style={cardGrid}>
      <div style={card}>
        <h3 style={label}>🧾 Orders</h3>
        <p style={count}>{counts.orders}</p>
      </div>
      <div style={card}>
        <h3 style={label}>💖 Wishlist</h3>
        <p style={count}>{counts.wishlist}</p>
      </div>
      <div style={card}>
        <h3 style={label}>🛒 Cart</h3>
        <p style={count}>{counts.cart}</p>
      </div>
    </div>
  );
}

// ⬇ Individual style blocks (in-page CSS)
const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: "20px",
  marginBottom: "30px",
};

const card = {
  backgroundColor: "#e4d2c2",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
  textAlign: "center",
};

const label = {
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#5d4736",
  marginBottom: "10px",
};

const count = {
  fontSize: "1.8rem",
  fontWeight: "bold",
  color: "#3f2e21",
};

export default StatCards;
