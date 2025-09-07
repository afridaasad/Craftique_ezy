import React, { useEffect, useState } from "react";
import ArtisanLayout from "../../layouts/ArtisanLayout";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function ArtisanPayments() {
  const [analytics, setAnalytics] = useState({
    totalEarnings: 0,
    pendingPayouts: 0,
    payments_history: [],
    monthly_earnings: {},
  });

  const [loading, setLoading] = useState(true);
  const access = localStorage.getItem("access");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/artisan/dashboard/analytics/", {
        headers: { Authorization: `Bearer ${access}` },
      });
      // Fill in missing keys with default values
      setAnalytics({
        totalEarnings: res.data.totalEarnings || 0,
        pendingPayouts: res.data.pendingPayouts || 0,
        payments_history: res.data.payments_history || [],
        monthly_earnings: res.data.monthly_earnings || {},
      });
    } catch (err) {
      console.error("Failed to fetch analytics", err);
    } finally {
      setLoading(false);
    }
  };

  const barData = {
    labels: Object.keys(analytics.monthly_earnings),
    datasets: [
      {
        label: "Earnings (₹)",
        data: Object.values(analytics.monthly_earnings),
        backgroundColor: "#7c5c45",
        borderRadius: 5,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (val) => `₹${val}`,
        },
      },
    },
  };

  if (loading) {
    return (
      <ArtisanLayout>
        <p style={{ padding: "30px" }}>Loading payments...</p>
      </ArtisanLayout>
    );
  }

  return (
    <ArtisanLayout>
      <div style={styles.container}>
        <h2 style={styles.heading}>💰 Payments</h2>

        {/* Top Summary Cards */}
        <div style={styles.statsGrid}>
          <div style={styles.card}>
            <h3>₹{analytics.totalEarnings.toFixed(2)}</h3>
            <p>Total Earnings</p>
          </div>
          <div style={styles.card}>
            <h3>₹{analytics.pendingPayouts.toFixed(2)}</h3>
            <p>Pending Payouts</p>
          </div>
          <div style={styles.card}>
            <h3>{analytics.payments_history.length}</h3>
            <p>Total Transactions</p>
          </div>
        </div>

        {/* Payment History Table */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📄 Payment History</h3>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Products</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {analytics.payments_history.length > 0 ? (
                  analytics.payments_history.map((payment, idx) => (
                    <tr key={idx}>
                      <td>{payment.date}</td>
                      <td># {payment.order_id}</td>
                      <td>{payment.products?.join(", ") || "—"}</td>
                      <td>₹{payment.amount}</td>
                      <td>
                        <span style={styles.paidBadge}>Paid</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "12px" }}>
                      No payment history available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bar Chart */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📊 Monthly Earnings</h3>
          <div style={styles.chartBox}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
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
    marginBottom: "24px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  card: {
    backgroundColor: "#fff8f0",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  section: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "20px",
    marginBottom: "12px",
  },
  tableWrapper: {
    overflowX: "auto",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "15px",
  },
  chartBox: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  paidBadge: {
    color: "#28a745",
    fontWeight: 600,
    backgroundColor: "#e6f7ea",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "13px",
  },
};

export default ArtisanPayments;
