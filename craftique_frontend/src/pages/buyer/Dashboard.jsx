import BuyerLayout from "../../layouts/BuyerLayout";
import StatCards from "../../components/buyer/StatCards";
import RecentOrders from "../../components/buyer/RecentOrders";
import RecommendedProducts from "../../components/buyer/RecommendedProducts";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("access");
const decoded = token ? jwtDecode(token) : {};
const fullName = decoded.full_name || "Buyer";
console.log("Decoded Token:", decoded);

function BuyerDashboard() {
  return (
    <BuyerLayout>
      <div style={{ padding: "20px" }}>
        {/* Welcome Banner */}
        <div
          style={{
            background: "#b08968",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "12px",
            padding: "40px 20px",
            marginBottom: "30px",
            color: "#4B2E1D",
            textAlign: "center",
            fontFamily: "serif",
          }}
        >
          <h1 style={{ fontSize: "32px", margin: 0 }}>
            Welcome Back, {fullName.split(" ")[0]}!
          </h1>
          <p style={{ fontSize: "16px", marginTop: "10px", color: "#5a4437" }}>
            Your dashboard awaits.
          </p>
        </div>

        {/* Quick Stats */}
        <h2 style={{ fontSize: "20px", marginBottom: "10px", color: "#4B2E1D" }}>
          Your Quick Stats
        </h2>
        <StatCards />

        {/* Recent Orders */}
        <h2 style={{ fontSize: "20px", margin: "30px 0 10px", color: "#4B2E1D" }}>
          Recent Activity
        </h2>
        <RecentOrders />

        {/* Personalized Recommendations */}
        <h2 style={{ fontSize: "20px", margin: "30px 0 10px", color: "#4B2E1D" }}>
          Personalized Recommendations
        </h2>
        <RecommendedProducts />
      </div>
    </BuyerLayout>
  );
}

export default BuyerDashboard;
