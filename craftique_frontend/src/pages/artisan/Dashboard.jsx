import React, { useEffect, useState } from "react";
import ArtisanLayout from "../../layouts/ArtisanLayout";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function ArtisanDashboard() {
  const [artisan, setArtisan] = useState(null);
  const access = localStorage.getItem("access");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/profile/", {
          headers: { Authorization: `Bearer ${access}` },
        });
        setArtisan(res.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  const stats = [
    { label: "Total Products", value: 12 },
    { label: "Orders Received", value: 34 },
    { label: "Pending Approvals", value: 5 },
    { label: "Total Earnings", value: "₹25,000" },
  ];

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [1200, 2100, 1500, 1800, 2500, 3000],
        fill: false,
        borderColor: "#4b2e1f",
        tension: 0.3,
        pointBackgroundColor: "#4b2e1f",
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (val) => `₹${val}` },
      },
    },
  };

  return (
    <ArtisanLayout>
      <div style={styles.container}>
        <h2 style={styles.heading}>
          {artisan ? `Hello, ${artisan.full_name || artisan.username} 👋` : "Welcome!"}
        </h2>

        {/* Quick Stats */}
        <div style={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <div key={idx} style={styles.statCard}>
              <h3 style={styles.statValue}>{stat.value}</h3>
              <p style={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Sales Trends */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📈 Sales Trends</h3>
          <div style={styles.chartContainer}>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Alerts and Tasks */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>🔔 Alerts & Tasks</h3>
          <ul style={styles.alertList}>
            <li>⚠️ 2 products need approval</li>
            <li>📦 3 orders are still pending</li>
            <li>💸 ₹5000 payout is in process</li>
          </ul>
        </div>
      </div>
    </ArtisanLayout>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "serif",
    backgroundColor: "#fefaf7",
    color: "#4b2e1f",
  },
  heading: {
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "28px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  statCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
    textAlign: "center",
  },
  statValue: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  statLabel: {
    fontSize: "14px",
    color: "#6d4c41",
  },
  section: {
    marginBottom: "36px",
  },
  sectionTitle: {
    fontSize: "20px",
    marginBottom: "12px",
  },
  chartContainer: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  alertList: {
    backgroundColor: "#fff",
    padding: "16px",
    borderRadius: "10px",
    listStyleType: "disc",
    marginLeft: "20px",
    lineHeight: "1.6",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
};

export default ArtisanDashboard;
