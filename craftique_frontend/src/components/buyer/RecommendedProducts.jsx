import { useEffect, useState } from "react";
import axios from "axios";

function RecommendedProducts() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("access");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/products/?ordering=-created_at", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(res.data.slice(0, 6)); // Show top 6 latest products
      } catch (err) {
        console.error("Failed to fetch recommended products", err);
      }
    };

    fetchProducts();
  }, [token]);

  return (
    <div style={{ marginTop: "40px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "12px" }}>
        Recommended for You
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "12px",
              backgroundColor: "#f9f4f1",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
            }}
          >
            <img
              src={`http://127.0.0.1:8000${product.image}`}
              alt={product.title}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
            <h3 style={{ fontSize: "16px", margin: "10px 0 4px" }}>
              {product.title}
            </h3>
            <p style={{ color: "#6b4c3b", fontWeight: "bold" }}>
              ₹{product.price}
            </p>
            <button
              style={{
                marginTop: "8px",
                padding: "6px 10px",
                backgroundColor: "#8b5e3c",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => alert("Coming Soon!")}
            >
              View Product
            </button>
          </div>
        ))}
        {products.length === 0 && <p>No recommendations found.</p>}
      </div>
    </div>
  );
}

export default RecommendedProducts;
