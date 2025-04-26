import React from "react";
import "../styles/OrderPercentilesModal.css";

const OrderPercentilesModal = ({ isOpen, onClose, category }) => {
  // Mock data for percentiles (users can't order more than 20 at a time)
  const percentileData = {
    Electronics: { p25: 2, p50: 5, p75: 8, p99: 18 },
    Clothing: { p25: 1, p50: 3, p75: 7, p99: 15 },
    "Home & Kitchen": { p25: 1, p50: 3, p75: 6, p99: 12 },
    Books: { p25: 1, p50: 2, p75: 4, p99: 10 },
    "Beauty & Personal Care": { p25: 1, p50: 2, p75: 4, p99: 8 },
    "Sports & Outdoors": { p25: 1, p50: 3, p75: 6, p99: 14 },
    "Toys & Games": { p25: 1, p50: 3, p75: 5, p99: 12 },
    Automotive: { p25: 1, p50: 2, p75: 4, p99: 9 },
    "Health & Wellness": { p25: 1, p50: 3, p75: 6, p99: 13 },
    Grocery: { p25: 2, p50: 5, p75: 10, p99: 20 },
    Furniture: { p25: 1, p50: 1, p75: 2, p99: 5 },
    Jewelry: { p25: 1, p50: 1, p75: 2, p99: 4 },
    "Pet Supplies": { p25: 1, p50: 2, p75: 4, p99: 8 },
    "Office Products": { p25: 1, p50: 2, p75: 5, p99: 11 },
    "Garden & Outdoor": { p25: 1, p50: 1, p75: 3, p99: 7 },
    "Tools & Home Improvement": { p25: 1, p50: 2, p75: 4, p99: 9 },
    "Baby Products": { p25: 1, p50: 2, p75: 3, p99: 7 },
    "Musical Instruments": { p25: 1, p50: 1, p75: 1, p99: 3 },
    "Industrial & Scientific": { p25: 1, p50: 1, p75: 2, p99: 4 },
    "Arts, Crafts & Sewing": { p25: 1, p50: 1, p75: 2, p99: 5 },
    "Digital Content": { p25: 1, p50: 3, p75: 7, p99: 16 },
    "Luxury Goods": { p25: 1, p50: 1, p75: 1, p99: 2 },
    "Handmade Products": { p25: 1, p50: 1, p75: 1, p99: 3 },
    Collectibles: { p25: 1, p50: 1, p75: 1, p99: 2 },
    "Seasonal Items": { p25: 1, p50: 1, p75: 2, p99: 5 },
  };

  // Get data for the selected category or use default values
  const data = percentileData[category] || { p25: 0, p50: 0, p75: 0, p99: 0 };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Order Percentiles: {category}</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <p className="modal-description">
            This table shows the distribution of orders for {category} across different percentiles.
            Each value represents the number of orders at that percentile.
          </p>
          <table className="percentiles-table">
            <thead>
              <tr>
                <th>Business Category</th>
                <th>P25 (25% of users)</th>
                <th>P50 (50% of users)</th>
                <th>P75 (75% of users)</th>
                <th>P99 (99% of users)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{category}</td>
                <td>{data.p25}</td>
                <td>{data.p50}</td>
                <td>{data.p75}</td>
                <td>{data.p99}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderPercentilesModal;
