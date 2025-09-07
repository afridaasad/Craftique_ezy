import React, { useState, useEffect } from "react";

function FiltersSidebar({ filters, setFilters }) {
  const categories = [
    "Pottery", "Woodcraft", "Textiles", "Jewelry",
    "Leatherwork", "Sculptures",
  ];

  const [localFilters, setLocalFilters] = useState({ ...filters });

  useEffect(() => {
    setLocalFilters(filters); // Sync when parent changes
  }, [filters]);

  const handleCategoryToggle = (cat) => {
    const updated = localFilters.categories.includes(cat)
      ? localFilters.categories.filter((c) => c !== cat)
      : [...localFilters.categories, cat];
    setLocalFilters({ ...localFilters, categories: updated });
  };

  const handleDateChange = (date) => {
    setLocalFilters({ ...localFilters, date });
  };

  const handlePriceChange = (e) => {
    setLocalFilters({ ...localFilters, price: parseInt(e.target.value) });
  };

  const handleKeywordChange = (e) => {
    setLocalFilters({ ...localFilters, keyword: e.target.value });
  };

  const applyFilters = () => {
    setFilters({ ...localFilters });
  };

  return (
    <div style={styles.sidebar}>
      <h3 style={styles.heading}>Filters</h3>

      {/* 🔍 Keyword Search */}
      <div style={styles.section}>
        <h4 style={styles.label}>Search</h4>
        <input
          type="text"
          placeholder="Search products..."
          value={localFilters.keyword || ""}
          onChange={handleKeywordChange}
          style={styles.input}
        />
      </div>

      {/* 📦 Category Filter */}
      <div style={styles.section}>
        <h4 style={styles.label}>Category</h4>
        {categories.map((cat) => (
          <label key={cat} style={styles.checkbox}>
            <input
              type="checkbox"
              checked={localFilters.categories.includes(cat)}
              onChange={() => handleCategoryToggle(cat)}
            />
            <span style={{ marginLeft: 8 }}>{cat}</span>
          </label>
        ))}
      </div>

      {/* 💰 Price Filter */}
      <div style={styles.section}>
        <h4 style={styles.label}>Max Price: ₹{localFilters.price}</h4>
        <input
          type="range"
          min={0}
          max={10000}
          step={100}
          value={localFilters.price}
          onChange={handlePriceChange}
          style={styles.range}
        />
      </div>

      {/* 🗓️ Date Filter */}
      <div style={styles.section}>
        <h4 style={styles.label}>Date Added</h4>
        {["Last 7 Days", "Last 30 Days", "Last 90 Days", "All Time"].map((d) => (
          <label key={d} style={styles.radio}>
            <input
              type="radio"
              name="date"
              value={d}
              checked={localFilters.date === d}
              onChange={() => handleDateChange(d)}
            />
            <span style={{ marginLeft: 8 }}>{d}</span>
          </label>
        ))}
      </div>

      {/* ✅ Apply Button */}
      <button onClick={applyFilters} style={styles.applyBtn}>
        Apply Filters
      </button>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "260px",
    padding: "20px",
    background: "#f8f1ea",
    borderRight: "1px solid #ddd",
    borderRadius: "8px",
    fontFamily: "serif",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  heading: {
    fontSize: "20px",
    marginBottom: "5px",
    color: "#5b3924",
  },
  section: {
    marginBottom: "10px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#3d2b1f",
  },
  checkbox: {
    display: "block",
    margin: "4px 0",
    fontSize: "14px",
  },
  radio: {
    display: "block",
    margin: "4px 0",
    fontSize: "14px",
  },
  range: {
    width: "100%",
    marginTop: "6px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "6px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontFamily: "serif",
  },
  applyBtn: {
    backgroundColor: "#7c5c45",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "8px",
  },
};

export default FiltersSidebar;
