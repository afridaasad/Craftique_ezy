import { useEffect, useState } from "react";
import axios from "axios";
import FiltersSidebar from "../../components/buyer/FiltersSidebar";
import ProductCard from "../../components/buyer/productcard";
import BuyerLayout from "../../layouts/BuyerLayout";

function AllProducts() {
  const [filters, setFilters] = useState({
    categories: [],
    price: 500,
    date: "All Time",
  });

  const [products, setProducts] = useState([]);
  const [buyNowProduct, setBuyNowProduct] = useState(null);
  const [showBuyNowModal, setShowBuyNowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const access = localStorage.getItem("access");

  const buildQueryParams = () => {
  let params = new URLSearchParams();

  if (filters.categories.length > 0) {
    filters.categories.forEach((cat) => params.append("category", cat));
  }

  if (filters.keyword) {
    params.append("search", filters.keyword);
  }

  if (filters.price) {
    params.append("max_price", filters.price);
  }

  if (filters.date) {
    const now = new Date();
    let fromDate = null;

    if (filters.date === "Last 7 Days") {
      fromDate = new Date(now.setDate(now.getDate() - 7));
    } else if (filters.date === "Last 30 Days") {
      fromDate = new Date(now.setDate(now.getDate() - 30));
    } else if (filters.date === "Last 90 Days") {
      fromDate = new Date(now.setDate(now.getDate() - 90));
    }

    if (fromDate) {
      params.append("created_after", fromDate.toISOString().split("T")[0]);
    }
  }

  params.append("ordering", "created_at");
  return params.toString();
};


  useEffect(() => {
    fetchProducts();
  }, [filters]);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchProducts = async () => {
    try {
      const query = buildQueryParams();
      const response = await axios.get(`http://localhost:8000/api/products/?${query}`);
      setProducts(response.data.results || response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
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

const handleAddToCart = async (product, newQty) => {
  const access = localStorage.getItem("access");

  try {
    // First, check if the product is already in the cart
    const cartRes = await axios.get("http://localhost:8000/api/buyer/cart/", {
      headers: { Authorization: `Bearer ${access}` },
    });

    const existingItem = cartRes.data.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      // Update the quantity: existing + new
      const updatedQty = existingItem.quantity + newQty;

      await axios.put(
        `http://localhost:8000/api/buyer/cart/${existingItem.id}/`,
        { quantity: updatedQty },
        {
          headers: { Authorization: `Bearer ${access}` },
        }
      );
    } else {
      // Create new cart item
      await axios.post(
        "http://localhost:8000/api/buyer/cart/",
        {
          product_id: product.id,
          quantity: newQty,
        },
        {
          headers: { Authorization: `Bearer ${access}` },
        }
      );
    }

    alert("Added to cart!");
  } catch (err) {
    console.error("Add to cart failed:", err);
    alert("Failed to add to cart.");
  }
};


  const handleAddToWishlist = async (product) => {
    try {
      await axios.post(
        "http://localhost:8000/api/buyer/wishlist/",
        { product_id: product.id },
        { headers: { Authorization: `Bearer ${access}` } }
      );
      alert("Added to wishlist!");
    } catch (err) {
      const msg = err.response?.data || "Failed to add to wishlist.";
      alert(msg);
    }
  };

  const handleBuyNow = (product) => {
    setBuyNowProduct(product);
    setShowBuyNowModal(true);
  };

  const handleBuyNowConfirm = async () => {
    if (!selectedAddressId || !buyNowProduct) {
      alert("Please select a shipping address.");
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
          headers: { Authorization: `Bearer ${access}` },
        }
      );
      alert("Order placed!");
      setShowBuyNowModal(false);
      setBuyNowProduct(null);
    } catch (err) {
      alert("Buy now failed.");
    }
  };

  return (
    <BuyerLayout>
      <div style={styles.container}>
        <FiltersSidebar filters={filters} setFilters={setFilters} />
        <div style={styles.content}>
          <h2 style={styles.heading}>All Products</h2>
          <div style={styles.grid}>
            {products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                  onAddToWishlist={handleAddToWishlist}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Buy Now Modal */}
      {showBuyNowModal && buyNowProduct && (
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
              <button onClick={handleBuyNowConfirm} style={styles.btnBuy}>
                Confirm Purchase
              </button>
              <button onClick={() => setShowBuyNowModal(false)} style={styles.btnCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </BuyerLayout>
  );
}

const styles = {
  container: {
    display: "flex",
    padding: "20px",
    gap: "24px",
  },
  content: {
    flex: 1,
  },
  heading: {
    fontSize: "24px",
    marginBottom: "16px",
    color: "#4b2e1f",
    fontFamily: "serif",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "20px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0, bottom: 0, right: 0,
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
    fontFamily: "serif",
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "8px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  btnBuy: {
    backgroundColor: "#4b2e1f",
    color: "#fff",
    padding: "10px 16px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  btnCancel: {
    backgroundColor: "#ccc",
    color: "#000",
    padding: "10px 16px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
};

export default AllProducts;
