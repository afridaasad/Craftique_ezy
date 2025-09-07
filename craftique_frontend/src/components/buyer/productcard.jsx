import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, onAddToCart, onBuyNow, onAddToWishlist }) {
  const { id, title, price, image, badge } = product;
  const [showQtyModal, setShowQtyModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleConfirmAddToCart = () => {
    onAddToCart(product, quantity);
    setShowQtyModal(false);
    setQuantity(1);
  };

  return (
    <div style={styles.card}>
      <div
        style={styles.imageContainer}
        onClick={() => navigate(`/buyer/product/${id}`)}
      >
        {badge && <span style={styles.badge}>{badge}</span>}
        <img
          src={image || "/placeholder.jpg"}
          alt={title}
          style={styles.image}
        />
      </div>

      <div style={styles.details}>
        <h4 style={styles.title}>{title}</h4>
        <p style={styles.price}>₹{price}</p>

        <div style={styles.actions}>
          <button style={styles.button} onClick={() => setShowQtyModal(true)}>
            Add to Cart
          </button>
          <button
            style={{ ...styles.button, backgroundColor: "#8b5e3c" }}
            onClick={() => onBuyNow(product)}
          >
            Buy Now
          </button>
        </div>

        <button
          onClick={() => onAddToWishlist(product)}
          style={styles.wishlistBtn}
        >
          ♡
        </button>
      </div>

      {showQtyModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h4>Quantity for: {title}</h4>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              style={styles.input}
            />
            <div style={{ marginTop: "12px", display: "flex", gap: "12px" }}>
              <button onClick={handleConfirmAddToCart} style={styles.button}>
                Confirm
              </button>
              <button
                onClick={() => setShowQtyModal(false)}
                style={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    width: "100%",
    border: "1px solid #e0d3c2",
    borderRadius: "8px",
    overflow: "hidden",
    background: "#fffefc",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    fontFamily: "serif",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  imageContainer: {
    position: "relative",
    height: "200px",
    overflow: "hidden",
    backgroundColor: "#faf7f3",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#b57f4d",
    color: "#fff",
    fontSize: "12px",
    padding: "3px 8px",
    borderRadius: "4px",
  },
  details: {
    padding: "12px",
    position: "relative",
  },
  title: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "4px",
    color: "#4b2e1f",
  },
  price: {
    fontSize: "14px",
    color: "#7a5d46",
    marginBottom: "10px",
  },
  actions: {
    display: "flex",
    gap: "6px",
    marginBottom: "8px",
  },
  button: {
    flex: 1,
    padding: "6px 10px",
    fontSize: "14px",
    backgroundColor: "#d4a373",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  wishlistBtn: {
    position: "absolute",
    top: 0,
    right: 8,
    background: "none",
    border: "none",
    color: "#4b2e1f",
    fontSize: "18px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    background: "#fff",
    padding: "24px",
    borderRadius: "10px",
    width: "300px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    fontFamily: "serif",
  },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
    marginTop: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  cancelBtn: {
    backgroundColor: "#ccc",
    color: "#000",
    padding: "6px 10px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  },
};

export default ProductCard;

