import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import ArtisanLayout from "../../layouts/ArtisanLayout";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend, ArcElement);

function ArtisanAnalytics() {
  const [data, setData] = useState(null);
  const [metric, setMetric] = useState("revenue");
  const access = localStorage.getItem("access");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/artisan/dashboard/analytics/", {
        headers: { Authorization: `Bearer ${access}` },
      });
      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch analytics", err);
    }
  };

  if (!data) {
    return (
      <ArtisanLayout>
        <p style={{ padding: "30px" }}>Loading analytics...</p>
      </ArtisanLayout>
    );
  }

  const selectedMetricData = metric === "revenue"
    ? (data.monthly_earnings || {})
    : (data.monthly_quantities || {});

  const lineData = {
    labels: Object.keys(selectedMetricData),
    datasets: [
      {
        label: metric === "revenue" ? "Monthly Revenue (₹)" : "Items Sold",
        data: Object.values(selectedMetricData),
        borderColor: "#4b2e1f",
        pointBackgroundColor: "#4b2e1f",
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const lineOptions = {
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return metric === "revenue" ? `₹${value}` : value;
          },
        },
      },
    },
  };

  const pieData = {
    labels: Object.keys(data.category_distribution || {}),
    datasets: [
      {
        label: "Category Share",
        data: Object.values(data.category_distribution || {}),
        backgroundColor: ["#a67c52", "#b08968", "#e0ac69", "#c97c5d", "#d9c7b2"],
      },
    ],
  };

  return (
    <ArtisanLayout>
      <div style={styles.container}>
        <h2 style={styles.heading}>📊 Analytics</h2>

        {/* Quick Stats */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <h3>{data.total_sales}</h3>
            <p>Total Sales (₹)</p>
          </div>
          <div style={styles.statCard}>
            <h3>{data.total_orders}</h3>
            <p>Orders Received</p>
          </div>
          <div style={styles.statCard}>
            <h3>{data.total_products}</h3>
            <p>Products Listed</p>
          </div>
          <div style={styles.statCard}>
            <h3>{data.avg_order_value}</h3>
            <p>Avg. Order Value (₹)</p>
          </div>
        </div>

        {/* Toggle Buttons */}
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={() => setMetric("revenue")}
            style={{
              ...styles.toggleButton,
              backgroundColor: metric === "revenue" ? "#4b2e1f" : "#eee",
              color: metric === "revenue" ? "#fff" : "#333",
            }}
          >
            💰 Revenue
          </button>
          <button
            onClick={() => setMetric("quantity")}
            style={{
              ...styles.toggleButton,
              backgroundColor: metric === "quantity" ? "#4b2e1f" : "#eee",
              color: metric === "quantity" ? "#fff" : "#333",
            }}
          >
            📦 Quantity
          </button>
        </div>

        {/* Line Chart */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📈 Monthly Trends</h3>
          <div style={styles.chartBox}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* Pie Chart */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>🧩 Sales by Category</h3>
          <div style={{ maxWidth: "400px", margin: "auto" }}>
            <Pie data={pieData} />
          </div>
        </div>

        {/* Lists */}
        <div style={{ ...styles.section, display: "flex", gap: "40px" }}>
          <div style={{ flex: 1 }}>
            <h3 style={styles.sectionTitle}>🏆 Top Selling Products</h3>
            <ul style={styles.list}>
              {(data.top_selling_products || []).map((p, idx) => (
                <li key={idx}>{p.title} — {p.quantity} sold</li>
              ))}
            </ul>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={styles.sectionTitle}>🕑 Recent Sales</h3>
            <ul style={styles.list}>
              {(data.recent_sales || []).map((sale, idx) => (
                <li key={idx}>{sale.title} — ₹{sale.amount} on {new Date(sale.date).toLocaleDateString()}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ArtisanLayout>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#fdfaf7",
    fontFamily: "serif",
    color: "#4b2e1f"
  },
  heading: {
    fontSize: "28px",
    marginBottom: "30px"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "20px",
    marginBottom: "40px"
  },
  statCard: {
    backgroundColor: "#fff8f0",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 6px rgba(0,0,0,0.05)",
    textAlign: "center",
  },
  section: {
    marginBottom: "50px"
  },
  sectionTitle: {
    fontSize: "20px",
    marginBottom: "16px"
  },
  chartBox: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 6px rgba(0,0,0,0.08)"
  },
  list: {
    backgroundColor: "#fff8f0",
    padding: "16px",
    borderRadius: "8px",
    lineHeight: "1.8",
    listStyle: "disc",
    marginLeft: "18px"
  },
  toggleButton: {
    padding: "10px 16px",
    marginRight: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default ArtisanAnalytics;
