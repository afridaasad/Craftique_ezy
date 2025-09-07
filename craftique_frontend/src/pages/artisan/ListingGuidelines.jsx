import React from "react";
import ArtisanLayout from "../../layouts/ArtisanLayout";

function ListingGuidelines() {
  return (
    <ArtisanLayout>
      <div style={styles.container}>
        <h2>🧵 Listing Guidelines</h2>
        <p>Follow these tips to ensure your product listings look professional:</p>
        <ul>
          <li>Use clear, well-lit images (avoid blurry or cluttered backgrounds).</li>
          <li>Write descriptive titles (e.g., “Hand-Painted Ceramic Bowl”).</li>
          <li>Use detailed descriptions including size, material, color, and uniqueness.</li>
          <li>Select the correct category for visibility in buyer filters.</li>
          <li>Keep prices realistic — don't forget to account for labor and materials.</li>
          <li>Only upload products you have ready to ship.</li>
        </ul>
      </div>
    </ArtisanLayout>
  );
}

const styles = {
  container: {
    background: "#fefaf7",
    padding: "30px",
    fontFamily: "serif",
    color: "#4b2e1f",
    lineHeight: "1.8",
  },
};

export default ListingGuidelines;
