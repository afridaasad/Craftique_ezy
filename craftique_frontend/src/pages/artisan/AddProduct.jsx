import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArtisanLayout from "../../layouts/ArtisanLayout";

function AddProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const checklist = [
    { label: "Product name and description", isComplete: name && description },
    { label: "Category selected", isComplete: !!category },
    { label: "Price and stock set", isComplete: price && stock },
    { label: "Image uploaded", isComplete: !!image },
    { label: "Review and publish", isComplete: name && category && price && stock && image },
  ];
  const isReadyToSubmit = checklist.every(item => item.isComplete);
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !category || !description || !price || !stock || !image) {
    alert("Please fill in all fields.");
    return;
  }

  const formData = new FormData();
  formData.append("title", name);
  formData.append("category", category);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("stock_quantity", stock);
  formData.append("image", image);

  try {
    const token = localStorage.getItem("access");
    const res = await fetch("http://localhost:8000/api/artisan/products/add/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      alert("Product uploaded successfully!");
      setName("");
      setCategory("");
      setDescription("");
      setPrice("");
      setStock("");
      setImage(null);
    } else {
      const err = await res.json();
      alert("Failed to upload product: " + JSON.stringify(err));
    }
  } catch (err) {
    console.error("Upload error", err);
    alert("An error occurred while uploading the product.");
  }
};


  return (
    <ArtisanLayout>
      <div style={styles.container}>
        {/* Sidebar Checklist */}
        <aside style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>📝 Checklist</h3>
          <ul style={styles.checklist}>
            {checklist.map((item, idx) => (
              <li key={idx} style={item.isComplete ? styles.complete : styles.incomplete}>
                {item.isComplete ? "✅" : "⬜️"} {item.label}
              </li>
            ))}
          </ul>
          <Link to="/artisan/listing-guidelines" style={styles.guidelinesBtn}>
            📖 View Listing Guidelines
          </Link>
        </aside>

        {/* Main Form */}
        <div style={styles.form}>
          <h2 style={styles.heading}>Add New Product</h2>

          <div style={styles.formGroup}>
            <label>Product Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
          </div>

          <div style={styles.formGroup}>
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.input}>
              <option value="">Select Category</option>
              <option value="Pottery">Pottery</option>
              <option value="Woodcraft">Woodcraft</option>
              <option value="Textiles">Textiles</option>
              <option value="Jewelry">Jewelry</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={styles.textarea} />
          </div>

          <div style={styles.formGroup}>
            <label>Price (₹)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={styles.input} />
          </div>

          <div style={styles.formGroup}>
            <label>Stock Quantity</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} style={styles.input} />
          </div>

          <div style={styles.formGroup}>
            <label>Product Image</label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} style={styles.input} />
            <small>Accepted formats: .jpg, .png — Max 2MB</small>
          </div>

          <button style={styles.submitBtn} onClick={handleSubmit}>
  📦 Submit Product
</button>

        </div>
      </div>
    </ArtisanLayout>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "30px",
    padding: "30px",
    fontFamily: "serif",
    background: "#fefaf7",
    color: "#4b2e1f",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#fff8f0",
    padding: "20px",
    borderRadius: "10px",
    height: "fit-content",
    boxShadow: "0 0 6px rgba(0,0,0,0.05)",
  },
  sidebarTitle: {
    fontSize: "18px",
    marginBottom: "12px",
  },
  checklist: {
    listStyle: "none",
    padding: 0,
    lineHeight: "1.8",
  },
  complete: {
    color: "green",
    fontWeight: "500",
  },
  incomplete: {
    color: "#999",
  },
  guidelinesBtn: {
    marginTop: "20px",
    display: "inline-block",
    textDecoration: "none",
    color: "#4b2e1f",
    backgroundColor: "#e0c7a3",
    padding: "8px 14px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
  },
  form: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "6px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    fontSize: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "6px",
    resize: "vertical",
  },
  submitBtn: {
    backgroundColor: "#4b2e1f",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
  },
};

export default AddProduct;
