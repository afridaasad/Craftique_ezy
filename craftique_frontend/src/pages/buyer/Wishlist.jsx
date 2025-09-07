import { useEffect, useState } from "react";
import axios from "axios";
import BuyerLayout from "../../layouts/BuyerLayout";
import { Link } from "react-router-dom";

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [buyNowProduct, setBuyNowProduct] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [lastCategory, setLastCategory] = useState(null);
  const access = localStorage.getItem("access");

  useEffect(() => {
    fetchWishlist();
    fetchAddresses();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/buyer/wishlist/", {
        headers: { Authorization: `Bearer ${access}` },
      });
      setWishlist(res.data);
      if (res.data.length > 0) {
        const cat = res.data[res.data.length - 1].product.category;
        setLastCategory(cat);
        fetchSuggested(cat);
      }
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  const fetchSuggested = async (category) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/products/?category=${category}`);
      const wishlistProductIds = wishlist.map((item) => item.product.id);
const filtered = (res.data.results || []).filter(
  (product) => !wishlistProductIds.includes(product.id)
);
setSuggested(filtered);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  const fetchAddresses = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/buyer/addresses/", {
        headers: { Authorization: `Bearer ${access}` },
      });
      setAddresses(res.data);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/buyer/wishlist/${productId}/`, {
        headers: { Authorization: `Bearer ${access}` },
      });
      setWishlist((prev) => prev.filter((item) => item.product.id !== productId));
    } catch (err) {
      console.error("Error removing wishlist item:", err);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(
        "http://localhost:8000/api/buyer/cart/",
        { product_id: productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${access}` } }
      );
      alert("Added to cart!");
    } catch (err) {
      alert("Failed to add to cart.");
    }
  };

  const openBuyNowModal = (product) => {
    setBuyNowProduct(product);
    setShowModal(true);
  };

  const handleBuyNowConfirm = async () => {
    if (!selectedAddressId) {
      alert("Please select an address.");
      return;
    }

    try {
      const address = addresses.find((a) => a.id === selectedAddressId);
      const res = await axios.post(
        "http://localhost:8000/api/buyer/buy-now/",
        {
          product_id: buyNowProduct.id,
          quantity: 1,
          shipping_address: `${address.label}, ${address.address_line}, ${address.city}, ${address.postal_code}, ${address.country}`,
          phone_number: "0000000000",
          payment_method: paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      alert("Order placed!");
      setShowModal(false);
      setBuyNowProduct(null);
    } catch (err) {
      alert("Buy now failed.");
    }
  };
  const handleAddToWishlist = async (productId) => {
  try {
    await axios.post(
      "http://localhost:8000/api/buyer/wishlist/",
      { product_id: productId },
      { headers: { Authorization: `Bearer ${access}` } }
    );
    alert("Added to wishlist!");
  } catch (err) {
    alert("Failed to add to wishlist.");
  }
};

  return (
    <BuyerLayout>
      <h2 style={styles.heading}>Your Wishlist</h2>
      <div style={styles.grid}>
        {wishlist.length === 0 ? (
          <p>No items in wishlist.</p>
        ) : (
          wishlist.map(({ product }) => (
            <div key={product.id} style={styles.card}>
              <Link to={`/buyer/product/${product.id}`}>
                <img src={product.image} alt={product.title} style={styles.image} />
              </Link>
              <div style={styles.details}>
                <h3>{product.title}</h3>
                <p>₹{product.price}</p>
                <div style={styles.buttons}>
                  <button onClick={() => handleAddToCart(product.id)} style={styles.btnCart}>Add to Cart</button>
                  <button onClick={() => openBuyNowModal(product)} style={styles.btnBuy}>Buy Now</button>
                  <button onClick={() => handleRemove(product.id)} style={styles.btnRemove}>Remove</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && buyNowProduct && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Buy Now: {buyNowProduct.title}</h3>

            <label>Select Address:</label>
            <select
              value={selectedAddressId || ""}
              onChange={(e) => setSelectedAddressId(parseInt(e.target.value))}
              style={styles.input}
            >
              <option value="">Select address</option>
              {addresses.map((addr) => (
                <option key={addr.id} value={addr.id}>
                  {addr.label} - {addr.address_line}, {addr.city}
                </option>
              ))}
            </select>

            <label>Payment Method:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={styles.input}
            >
              <option value="cod">Cash on Delivery</option>
              <option value="upi">UPI</option>
              <option value="cc">Credit Card</option>
            </select>

            <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between" }}>
              <button onClick={handleBuyNowConfirm} style={styles.btnBuy}>Confirm Purchase</button>
              <button onClick={() => setShowModal(false)} style={styles.btnRemove}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {suggested.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h3 style={styles.heading}>You Might Also Like</h3>
          <div style={styles.grid}>
            {suggested.map((product) => (
              <div key={product.id} style={styles.card}>
                <Link to={`/buyer/product/${product.id}`}>
                  <img src={product.image} alt={product.title} style={styles.image} />
                </Link>
                <div style={styles.details}>
                  <h3>{product.title}</h3>
                  <p>₹{product.price}</p>
                  <div style={styles.buttons}>
                    {
                    !wishlist.some((item) => item.product.id === product.id) && ( 
                    <button onClick={() => handleAddToWishlist(product.id)} style={styles.btnWishlist} > ♡ Wishlist</button>
  )
}
                    <button onClick={() => handleAddToCart(product.id)} style={styles.btnCart}>Add to Cart</button>
                    <button onClick={() => openBuyNowModal(product)} style={styles.btnBuy}>Buy Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </BuyerLayout>
  );
}

const styles = {
  heading: {
    fontSize: "24px",
    marginBottom: "16px",
    color: "#4b2e1f",
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
    boxShadow: "0 0 6px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "6px",
    marginBottom: "10px",
  },
  details: {
    textAlign: "center",
  },
  buttons: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  btnCart: {
    backgroundColor: "#8b5e3c",
    color: "#fff",
    padding: "8px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  btnBuy: {
    backgroundColor: "#4b2e1f",
    color: "#fff",
    padding: "8px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  btnWishlist: {
  backgroundColor: "#f8f0e3",
  color: "#4b2e1f",
  padding: "8px",
  border: "1px solid #c1a37a",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
},
  btnRemove: {
    backgroundColor: "#d9534f",
    color: "#fff",
    padding: "8px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
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
    width: "400px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "8px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
};

export default WishlistPage;
