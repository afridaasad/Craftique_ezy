import { useEffect, useState, useRef } from "react";
import axios from "axios";
import BuyerLayout from "../../layouts/BuyerLayout";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const invoiceRef = useRef();
  const access = localStorage.getItem("access");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/buyer/orders/", {
        headers: { Authorization: `Bearer ${access}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "#ffcc00";
      case "Approved": return "#007bff";
      case "Shipped": return "#17a2b8";
      case "Out for Delivery": return "#fd7e14";
      case "Delivered": return "#28a745";
      default: return "#6c757d";
    }
  };

  const printInvoice = () => {
    const printContents = invoiceRef.current.innerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`<html><head><title>Invoice</title></head><body>${printContents}</body></html>`);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <BuyerLayout>
      <h2 style={styles.heading}>Your Orders</h2>

      <div style={styles.grid}>
        {orders.map((order) => {
          const thumbnail = order.items?.[0]?.product?.image;
          return (
            <div
              key={order.id}
              style={{
                ...styles.card,
                borderLeft: `6px solid ${getStatusColor(order.status)}`,
              }}
              onClick={() => setSelectedOrder(order)}
            >
              <img
              src={order.items?.[0]?.product?.image  || "fallback.jpg"} alt="product" style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              
              <h4>Order #{order.id}</h4>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ₹{order.total_amount ?? order.items?.reduce((sum, i) => sum + i.price * i.quantity, 0)}</p>
              <p><strong>Items:</strong> {order.items?.reduce((sum, i) => sum + i.quantity, 0)}</p>
              <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
            </div>
          );
        })}
      </div>

      {selectedOrder && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div ref={invoiceRef}>
              <h3>Invoice - Order #{selectedOrder.id}</h3>
              <p><strong>Date:</strong> {new Date(selectedOrder.created_at).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Shipping:</strong> {selectedOrder.shipping_address}</p>
              <p><strong>Phone:</strong> {selectedOrder.phone_number}</p>
              <h4>Items:</h4>
              <ul style={{ padding: 0 }}>
  {selectedOrder.items?.map((item, idx) => (
    <li key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
      <img
        src={item.product?.image}
        alt={item.product?.title}
        style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
      />
      <span>
        {item.product?.title} — ₹{item.product?.price} × {item.quantity}
      </span>
    </li>
  ))}
</ul>

            <h4>Total: ₹{selectedOrder.items?.reduce((sum, i) => sum + i.price * i.quantity, 0)}</h4>
            </div>
            <div style={styles.modalActions}>
              <button onClick={printInvoice} style={styles.printBtn}>🖨 Print Invoice</button>
              <button onClick={() => setSelectedOrder(null)} style={styles.closeBtn}>Close</button>
            </div>
          </div>
        </div>
      )}
    </BuyerLayout>
  );
}

const styles = {

  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#4b2e1f",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "16px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 6px rgba(0,0,0,0.1)",
    cursor: "pointer",
    position: "relative",
  },
  thumbnail: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
    transition: "transform 0.2s ease-in-out",
  },
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    background: "#fff",
    padding: "24px",
    borderRadius: "10px",
    width: "500px",
    maxHeight: "80vh",
    overflowY: "auto",
    fontFamily: "serif",
  },
  itemRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },
  itemImage: {
    width: "60px",
    height: "60px",
    borderRadius: "6px",
    objectFit: "cover",
    transition: "transform 0.2s ease",
  },
  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
  },
  printBtn: {
    backgroundColor: "#4b2e1f",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none",
  },
  closeBtn: {
    backgroundColor: "#aaa",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none",
  },
};

export default OrdersPage;
