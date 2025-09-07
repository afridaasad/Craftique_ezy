import { useEffect, useState } from "react";
import axios from "axios";
import BuyerLayout from "../../layouts/BuyerLayout";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState("");
  const [debugOtp, setDebugOtp] = useState(null);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    label: "Home",
    address_line: "",
    city: "",
    postal_code: "",
  });
  const [saveAddress, setSaveAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const access = localStorage.getItem("access");

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/buyer/cart/", {
        headers: { Authorization: `Bearer ${access}` },
      });
      setCart(res.data);
    } catch (err) {
      console.error("Error fetching cart", err);
    }
  };

  const fetchAddresses = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/buyer/addresses/", {
        headers: { Authorization: `Bearer ${access}` },
      });
      setAddresses(res.data);
    } catch (err) {
      console.error("Error fetching addresses", err);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, []);

  const handleQuantityChange = async (id, newQty) => {
    try {
      await axios.put(
        `http://localhost:8000/api/buyer/cart/${id}/`,
        { quantity: newQty },
        { headers: { Authorization: `Bearer ${access}` } }
      );
      fetchCart();
    } catch (err) {
      console.error("Quantity update failed", err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/buyer/cart/${id}/`, {
        headers: { Authorization: `Bearer ${access}` },
      });
      fetchCart();
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);

      let shipping_address = "";
      if (selectedAddressId) {
        const selected = addresses.find((addr) => addr.id === parseInt(selectedAddressId));
        shipping_address = `${selected.label}, ${selected.address_line}, ${selected.city}, ${selected.postal_code}`;
      } else {
        shipping_address = `${newAddress.label}, ${newAddress.address_line}, ${newAddress.city}, ${newAddress.postal_code}`;

        if (saveAddress) {
          await axios.post("http://localhost:8000/api/buyer/addresses/add/", {
            label: newAddress.label || "Home",
            address_line: newAddress.address_line,
            city: newAddress.city,
            postal_code: newAddress.postal_code,
            country: "India",
            is_default: true,
          }, {
            headers: { Authorization: `Bearer ${access}` },
          });
          await fetchAddresses();
        }
      }

      const res = await axios.post(
        "http://localhost:8000/api/buyer/cart/checkout-initiate/",
        {
          payment_method: paymentMethod,
          shipping_address,
        },
        { headers: { Authorization: `Bearer ${access}` } }
      );

      setOtpMode(true);
      setDebugOtp(res.data.otp);
      alert("OTP sent! Check your phone/email.");
    } catch (err) {
      console.error("Checkout failed", err);
      alert("Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOtp = async () => {
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:8000/api/buyer/cart/checkout-confirm/",
        { otp },
        { headers: { Authorization: `Bearer ${access}` } }
      );
      alert("Order placed successfully!");
      setOtp("");
      setOtpMode(false);
      fetchCart(); // cart will now be empty
    } catch (err) {
      console.error("OTP confirmation failed", err);
      alert("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpayCheckout = async () => {
  try {
    setLoading(true);

    let shipping_address = "";
    if (selectedAddressId) {
      const selected = addresses.find((addr) => addr.id === parseInt(selectedAddressId));
      shipping_address = `${selected.label}, ${selected.address_line}, ${selected.city}, ${selected.postal_code}`;
    } else {
      shipping_address = `${newAddress.label}, ${newAddress.address_line}, ${newAddress.city}, ${newAddress.postal_code}`;

      if (saveAddress) {
        await axios.post("http://localhost:8000/api/buyer/addresses/add/", {
          label: newAddress.label || "Home",
          address_line: newAddress.address_line,
          city: newAddress.city,
          postal_code: newAddress.postal_code,
          country: "India",
          is_default: true,
        }, {
          headers: { Authorization: `Bearer ${access}` },
        });
        await fetchAddresses();
      }
    }

    const res = await axios.post(
      "http://localhost:8000/api/buyer/cart/create-razorpay-order/",
      {
        amount: totalAmount,
        shipping_address,
      },
      { headers: { Authorization: `Bearer ${access}` } }
    );

    const data = res.data;
    if (!data || !data.order_id) {
      alert("Failed to create Razorpay order.");
      return;
    }

    const options = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      name: "Craftique",
      description: "Order Payment",
      order_id: data.order_id,
      handler: async function (response) {
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
        // OPTIONAL: You can now send `response` to your backend to confirm
        await fetchCart(); // clear cart after successful payment
      },
      prefill: {
        name: "",
        email: "",
      },
      theme: {
        color: "#7c5c45",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Razorpay Error", err);
    alert("Payment failed. Try again.");
  } finally {
    setLoading(false);
  }
};

  const totalAmount = cart.reduce((total, item) => {
    if (!item.product) return total;
    return total + item.product.price * item.quantity;
  }, 0);

  return (
    <BuyerLayout>
      <h2 style={styles.heading}>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} style={styles.card}>
              <div style={styles.imageTitleWrapper}>
                <img
                  src={item.product?.image}
                  alt={item.product?.title}
                  style={styles.productImage}
                />
                <div>
                  <strong>{item.product?.title || "Unknown Product"}</strong>
                  <p>
                    ₹{item.product?.price ?? "0"} x {item.quantity}
                  </p>
                </div>
              </div>
              <div style={styles.controls}>
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  style={styles.qty}
                />
                <button
                  onClick={() => handleRemove(item.id)}
                  style={styles.remove}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3>Total: ₹{totalAmount}</h3>

          {!otpMode ? (
            <>
              <h4>Select Address</h4>
              {addresses.length > 0 && (
                <select
                  value={selectedAddressId || ""}
                  onChange={(e) => setSelectedAddressId(e.target.value)}
                  style={styles.select}
                >
                  <option value="">Add a new Address</option>
                  {addresses.map((addr) => (
                    <option key={addr.id} value={addr.id}>
                      {addr.label}: {addr.address_line}, {addr.city}
                    </option>
                  ))}
                </select>
              )}

              {!selectedAddressId && (
                <div style={{ marginTop: "10px" }}>
                  <input
                    type="text"
                    placeholder="Label (e.g. Home)"
                    value={newAddress.label}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, label: e.target.value })
                    }
                    style={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Address line"
                    value={newAddress.address_line}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, address_line: e.target.value })
                    }
                    style={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                    style={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Postal code"
                    value={newAddress.postal_code}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, postal_code: e.target.value })
                    }
                    style={styles.input}
                  />
                  <label style={{ fontSize: "14px" }}>
                    <input
                      type="checkbox"
                      checked={saveAddress}
                      onChange={() => setSaveAddress(!saveAddress)}
                      style={{ marginRight: "6px" }}
                    />
                    Save this address
                  </label>
                </div>
              )}

              <h4 style={{ marginTop: "20px" }}>Payment Method</h4>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={styles.select}
              >
                <option value="cod">Cash on Delivery</option>
                <option value="upi">UPI(mock)</option>
                <option value="cc">Credit Card(mock)</option>
              </select>

              <button
  onClick={handleRazorpayCheckout}
  style={styles.checkoutBtn}
  disabled={loading}
>
  {loading ? "Processing..." : "Pay with Razorpay"}
</button>

            </>
          ) : (
            <div style={styles.otpBox}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={styles.otpInput}
              />
              <button
                onClick={handleConfirmOtp}
                style={styles.checkoutBtn}
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Confirm & Place Order"}
              </button>
            </div>
          )}
          {debugOtp && (
            <p style={{ fontSize: "12px", color: "#999", marginTop: "5px" }}>
              Debug OTP: <span style={{ fontFamily: "monospace" }}>{debugOtp}</span>
            </p>
          )}
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
  card: {
    background: "#fff",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageTitleWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  productImage: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "6px",
  },
  controls: {
    display: "flex",
    gap: "10px",
  },
  qty: {
    width: "100px",
    padding: "6px",
    fontSize: "16px",
  },
  remove: {
    backgroundColor: "#d9534f",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  checkoutBtn: {
    marginTop: "20px",
    backgroundColor: "#7c5c45",
    color: "#fff",
    padding: "10px 16px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  otpBox: {
    marginTop: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  otpInput: {
    width: "120px",
    padding: "8px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  input: {
    margin: "6px 0",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "100%",
  },
  select: {
    margin: "10px 0",
    padding: "8px",
    borderRadius: "6px",
    fontSize: "16px",
    width: "100%",
  },
};

export default CartPage;
