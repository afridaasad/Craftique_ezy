import React, { useEffect, useState } from "react";
import axios from "axios";
import ArtisanLayout from "../../layouts/ArtisanLayout";

function ArtisanOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const access = localStorage.getItem("access");

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [search, statusFilter, orders]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/artisan/orders/", {
        headers: { Authorization: `Bearer ${access}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  const handleFilter = () => {
    let temp = [...orders];
    if (search.trim()) {
      const term = search.toLowerCase();
      temp = temp.filter(order =>
        order.id.toString().includes(term) ||
        order.buyer?.full_name?.toLowerCase().includes(term) ||
        order.items?.some(item => item.product.title.toLowerCase().includes(term))
      );
    }
    if (statusFilter) {
      temp = temp.filter(order => order.status === statusFilter);
    }
    setFilteredOrders(temp);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/artisan/orders/${orderId}/update-status/`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${access}` } }
      );
      fetchOrders();
    } catch (err) {
      alert("Failed to update order status");
    }
  };

  const statusIcons = {
    pending: "⏳",
    approved: "✅",
    denied: "❌",
    shipped: "📦",
    out_for_delivery: "🚚",
    delivered: "📬",
  };

  return (
    <ArtisanLayout>
      <div style={styles.container}>
        <h2 style={styles.heading}>📦 Orders Received</h2>

        {/* Filters */}
        <div style={styles.filters}>
          <input
            type="text"
            placeholder="Search by buyer, product or order ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={styles.input}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="denied">Denied</option>
            <option value="shipped">Shipped</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        {/* Orders Grid */}
        <div style={styles.grid}>
          {filteredOrders.map((order) => (
            <div key={order.id} style={styles.card} onClick={() => setSelectedOrder(order)}>
              <div style={styles.statusIcon}>{statusIcons[order.status] || "📦"}</div>
              <h4>Order #{order.id}</h4>
              <p><strong>Buyer:</strong> {order.buyer?.full_name}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
              <p>
                <strong>Items:</strong> {order.items?.reduce((sum, i) => sum + i.quantity, 0)} | ₹
                {order.items?.reduce((sum, i) => sum + i.price * i.quantity, 0)}
              </p>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedOrder && (
          <div style={styles.modalOverlay} onClick={() => setSelectedOrder(null)}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <h3>Order #{selectedOrder.id}</h3>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Buyer:</strong> {selectedOrder.buyer?.full_name}</p>
              <p><strong>Address:</strong> {selectedOrder.shipping_address}</p>
              <p><strong>Phone:</strong> {selectedOrder.phone_number}</p>
              <ul>
                {selectedOrder.items.map((item, idx) => (
                  <li key={idx}>
                    {item.product?.title} – ₹{item.price} × {item.quantity}
                  </li>
                ))}
              </ul>
              <p><strong>Total:</strong> ₹{selectedOrder.items.reduce((sum, i) => sum + i.price * i.quantity, 0)}</p>

              {selectedOrder.status === "pending" && (
                <div style={styles.actions}>
                  <button onClick={() => updateOrderStatus(selectedOrder.id, "approved")} style={styles.approveBtn}>Approve</button>
                  <button onClick={() => updateOrderStatus(selectedOrder.id, "denied")} style={styles.denyBtn}>Deny</button>
                </div>
              )}
              <button onClick={() => setSelectedOrder(null)} style={styles.closeBtn}>Close</button>
            </div>
          </div>
        )}
      </div>
    </ArtisanLayout>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#fefaf7",
    fontFamily: "serif",
    color: "#4b2e1f",
  },
  heading: {
    fontSize: "26px",
    marginBottom: "20px",
  },
  filters: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "16px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    cursor: "pointer",
  },
  statusIcon: {
    fontSize: "22px",
    marginBottom: "8px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    width: "500px",
    fontFamily: "serif",
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  approveBtn: {
    backgroundColor: "#4b9c2f",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  denyBtn: {
    backgroundColor: "#c0392b",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  closeBtn: {
    marginTop: "12px",
    backgroundColor: "#888",
    color: "#fff",
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ArtisanOrders;
