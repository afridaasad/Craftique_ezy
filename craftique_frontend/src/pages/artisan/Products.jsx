import React, { useEffect, useState } from "react";
import axios from "axios";
import ArtisanLayout from "../../layouts/ArtisanLayout";

function ArtisanProducts() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const access = localStorage.getItem("access");

  const categories = ["Pottery", "Woodcraft", "Textiles", "Jewelry", "Leatherwork", "Sculptures"];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [search, categoryFilter, statusFilter, products]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/artisan/products/", {
        headers: { Authorization: `Bearer ${access}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const filterProducts = () => {
    let temp = [...products];
    const query = search.toLowerCase();
    if (search) {
      temp = temp.filter(
        (p) =>
          p.title?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query)
      );
    }
    if (categoryFilter) {
      temp = temp.filter((p) => p.category === categoryFilter);
    }
    if (statusFilter) {
      temp = temp.filter((p) => p.is_active === (statusFilter === "Active"));
    }
    setFiltered(temp);
  };

  const toggleStatus = async (productId) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/artisan/products/${productId}/toggle-status/`,
        {},
        { headers: { Authorization: `Bearer ${access}` } }
      );
      fetchProducts();
    } catch (err) {
      alert("Failed to toggle status");
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/artisan/products/${productId}/`, {
        headers: { Authorization: `Bearer ${access}` },
      });
      fetchProducts();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const handleEdit = (product) => {
    setEditForm({ ...product });
    setSelectedProduct(null);
  };

  const saveEdit = async () => {
    try {
      const form = new FormData();
      form.append("title", editForm.title);
      form.append("description", editForm.description);
      form.append("category", editForm.category);
      form.append("price", editForm.price);
      form.append("stock", editForm.stock);
      if (editForm.image instanceof File) {
        form.append("image", editForm.image);
      }

      await axios.put(
        `http://localhost:8000/api/artisan/products/${editForm.id}/`,
        form,
        {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setEditForm(null);
      fetchProducts();
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <ArtisanLayout>
      <div style={styles.container}>
        <h2 style={styles.heading}>🧺 Your Products</h2>

        <div style={styles.filters}>
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={styles.input}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={styles.input}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
          </select>
          <button onClick={() => (window.location.href = "/artisan/products/add")} style={styles.addBtn}>
            ➕ Add Product
          </button>
        </div>

        <div style={styles.grid}>
          {filtered.map((product) => (
            <div key={product.id} style={styles.card}>
              <div style={styles.categoryLabel}>{product.category}</div>
              <img
                src={product.image || "/fallback.jpg"}
                alt={product.title}
                style={styles.image}
                onClick={() => setSelectedProduct(product)}
              />
              <h3>{product.title}</h3>
              <p>₹{product.price}</p>
              <p>Stock: {product.stock}</p>
              <div style={styles.actions}>
                <button title="Edit" onClick={() => handleEdit(product)}>✏️</button>
                <button title="Delete" onClick={() => deleteProduct(product.id)}>🗑️</button>
                <button title="Toggle" onClick={() => toggleStatus(product.id)}>
                  {product.is_active ? "🟢" : "🔴"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 👁️ View Modal */}
        {selectedProduct && (
          <div style={styles.modalOverlay} onClick={() => setSelectedProduct(null)}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <h2>{selectedProduct.title}</h2>
              <img
                src={selectedProduct.image || "/fallback.jpg"}
                alt={selectedProduct.title}
                style={{ width: "100%", borderRadius: "8px", marginBottom: "12px" }}
              />
              <p><strong>Description:</strong> {selectedProduct.description}</p>
              <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
              <p><strong>Stock:</strong> {selectedProduct.stock}</p>
              <p><strong>Status:</strong> {selectedProduct.is_active ? "Active" : "Draft"}</p>
              <button onClick={() => setSelectedProduct(null)} style={styles.closeBtn}>Close</button>
            </div>
          </div>
        )}

        {/* ✏️ Edit Modal */}
        {editForm && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h2>Edit Product</h2>
              <input
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                style={styles.input}
              />
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                style={styles.textarea}
              />
              <input
                type="number"
                value={editForm.price}
                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                style={styles.input}
              />
              <input
                type="number"
                value={editForm.stock}
                onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                style={styles.input}
              />
              <select
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                style={styles.input}
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="file"
                onChange={(e) => setEditForm({ ...editForm, image: e.target.files[0] })}
              />
              <div style={{ marginTop: "12px" }}>
                <button onClick={saveEdit} style={styles.addBtn}>💾 Save</button>
                <button onClick={() => setEditForm(null)} style={styles.closeBtn}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ArtisanLayout>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "serif",
    background: "#fefaf7",
    color: "#4b2e1f",
  },
  heading: { fontSize: "26px", marginBottom: "20px" },
  filters: { display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" },
  input: { padding: "10px", fontSize: "14px", borderRadius: "6px", border: "1px solid #ccc", flex: "1" },
  addBtn: {
    backgroundColor: "#4b2e1f",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "16px",
    borderRadius: "10px",
    boxShadow: "0 0 6px rgba(0,0,0,0.08)",
    position: "relative",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
    cursor: "pointer",
  },
  categoryLabel: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#e6d3bb",
    padding: "4px 10px",
    fontSize: "12px",
    borderRadius: "4px",
    fontWeight: "600",
  },
  actions: { display: "flex", justifyContent: "space-between", marginTop: "10px" },
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: "24px",
    borderRadius: "10px",
    width: "500px",
    fontFamily: "serif",
  },
  closeBtn: {
    backgroundColor: "#aaa",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    height: "80px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
};

export default ArtisanProducts;
