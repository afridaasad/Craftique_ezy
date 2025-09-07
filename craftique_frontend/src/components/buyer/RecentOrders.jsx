import { useEffect, useState } from "react";
import axios from "axios";

function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("access");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/buyer/orders/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Orders received:", res.data);

        const sorted = res.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setOrders(sorted.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div style={{ marginTop: "40px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "12px" }}>Recent Orders</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              background: "#fffaf7",
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: "16px" }}>
              Order #{order.id} —{" "}
              <span style={getStatusStyle(order.status)}>{order.status.toUpperCase()}</span>
            </div>
            <div style={{ color: "#6b4c3b", fontSize: "14px", marginTop: "4px" }}>
              {order.quantity}x {order.product?.title || "Item"} 
            </div>
            <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>
              {new Date(order.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
        {orders.length === 0 && <p style={{ color: "#aaa" }}>No recent orders found.</p>}
      </div>
    </div>
  );
}

// 👇 Status-based coloring
function getStatusStyle(status) {
  const base = { fontWeight: "bold", padding: "2px 6px", borderRadius: "4px" };
  switch (status) {
    case "approved":
    case "delivered":
      return { ...base, color: "#0a0", backgroundColor: "#e4fbe4" };
    case "pending":
      return { ...base, color: "#a67f00", backgroundColor: "#fff3c4" };
    case "denied":
      return { ...base, color: "#b30000", backgroundColor: "#fde0e0" };
    default:
      return base;
  }
}

export default RecentOrders;
