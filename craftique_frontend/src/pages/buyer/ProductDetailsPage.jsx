import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BuyerLayout from "../../layouts/BuyerLayout";

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const access = localStorage.getItem("access");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/buyer/cart/",
        {
          product: product.id,
          quantity: 1,
        },
        {
          headers: { Authorization: `Bearer ${access}` },
        }
      );
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      const msg = error.response?.data || "Failed to add to cart.";
      alert(msg);
    }
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy now: ${product.title}`);
  };

  if (!product) return <BuyerLayout><p>Loading...</p></BuyerLayout>;

  return (
    <BuyerLayout>
      <div style={styles.container}>
        <img src={product.image} alt={product.title} style={styles.image} />
        <div style={styles.details}>
          <h1 style={styles.title}>{product.title}</h1>
          <p style={styles.category}>Category: {product.category}</p>
          <p style={styles.price}>₹{product.price}</p>
          <p style={styles.stock}>In Stock: {product.stock}</p>
          <p style={styles.description}>{product.description}</p>
          <div style={styles.actions}>
            <button style={styles.cartBtn} onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button style={styles.buyBtn} onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "30px",
    padding: "30px",
    backgroundColor: "#fdfaf7",
    flexWrap: "wrap",
  },
  image: {
    width: "380px",
    height: "380px",
    objectFit: "cover",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: "28px",
    color: "#4b2e1f",
    marginBottom: "10px",
  },
  category: {
    fontSize: "16px",
    color: "#6e4f3a",
  },
  price: {
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "10px",
    color: "#7c3e1d",
  },
  stock: {
    fontSize: "16px",
    color: "#3f3f3f",
    marginTop: "5px",
  },
  description: {
    marginTop: "20px",
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#444",
  },
  actions: {
    marginTop: "30px",
    display: "flex",
    gap: "15px",
  },
  cartBtn: {
    backgroundColor: "#a6744f",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  buyBtn: {
    backgroundColor: "#4e342e",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ProductDetailsPage;
