import React from "react";
import "../styles/OrderGmvModal.css";

const OrderGmvModal = ({ isOpen, onClose, category }) => {
  if (!isOpen) return null;

  // Mock data for percentiles - order counts (not more than 20)
  const orderValueData = [
    { category: "Electronics", p25: 2, p50: 4, p75: 8, p99: 15 },
    { category: "Clothing", p25: 1, p50: 3, p75: 5, p99: 12 },
    { category: "Home & Kitchen", p25: 1, p50: 2, p75: 4, p99: 10 },
    { category: "Books", p25: 1, p50: 2, p75: 3, p99: 8 },
    { category: "Beauty & Personal Care", p25: 1, p50: 2, p75: 4, p99: 9 },
    { category: "Sports & Outdoors", p25: 2, p50: 3, p75: 6, p99: 14 },
  ];

  const gmvValueData = [
    { category: "Electronics", p25: 12000, p50: 25000, p75: 48000, p99: 120000 },
    { category: "Clothing", p25: 8000, p50: 15000, p75: 28000, p99: 80000 },
    { category: "Home & Kitchen", p25: 15000, p50: 30000, p75: 55000, p99: 150000 },
    { category: "Books", p25: 4000, p50: 8000, p75: 12000, p99: 30000 },
    { category: "Beauty & Personal Care", p25: 6000, p50: 12000, p75: 20000, p99: 50000 },
    { category: "Sports & Outdoors", p25: 10000, p50: 20000, p75: 35000, p99: 90000 },
  ];

  // Filter data for selected category if provided
  const filteredOrderData = category
    ? orderValueData.filter((item) => item.category === category)
    : orderValueData;

  const filteredGmvData = category
    ? gmvValueData.filter((item) => item.category === category)
    : gmvValueData;

  // For certain categories, we'll simulate having no data to test the "No data" UI
  const categoriesWithNoOrderData = ["Furniture", "Jewelry", "Pet Supplies"];
  const categoriesWithNoGmvData = ["Musical Instruments", "Digital Content", "Luxury Goods"];

  // If the selected category has no data, return empty arrays
  if (category && categoriesWithNoOrderData.includes(category)) {
    filteredOrderData.length = 0;
  }

  if (category && categoriesWithNoGmvData.includes(category)) {
    filteredGmvData.length = 0;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{category ? `${category} Percentiles` : "All Categories Percentiles"}</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="percentile-section">
            <h3>Average Order Value Percentiles</h3>
            <p className="percentile-description">
              Shows how many orders users place at a single time (e.g., p25 means 25% of users place
              this many orders)
            </p>
            <div className="table-container">
              <table className="percentile-table">
                <thead>
                  <tr>
                    <th>Business Category</th>
                    <th>p25 (25% of users)</th>
                    <th>p50 (50% of users)</th>
                    <th>p75 (75% of users)</th>
                    <th>p99 (99% of users)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrderData.length > 0 ? (
                    filteredOrderData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.category}</td>
                        <td>{item.p25}</td>
                        <td>{item.p50}</td>
                        <td>{item.p75}</td>
                        <td>{item.p99}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-data">
                        <div className="no-data-container">
                          <div className="no-data-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="50"
                              height="50"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#cccccc"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <path d="M14 2v6h6"></path>
                              <line x1="9" y1="15" x2="15" y2="15"></line>
                            </svg>
                          </div>
                          <div className="no-data-text">No data available</div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="percentile-section">
            <h3>Average GMV Value Percentiles</h3>
            <p className="percentile-description">
              Shows the GMV value generated by different user segments (e.g., p25 means 25% of users
              generate this much GMV)
            </p>
            <div className="table-container">
              <table className="percentile-table">
                <thead>
                  <tr>
                    <th>Business Category</th>
                    <th>p25 (25% of users)</th>
                    <th>p50 (50% of users)</th>
                    <th>p75 (75% of users)</th>
                    <th>p99 (99% of users)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGmvData.length > 0 ? (
                    filteredGmvData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.category}</td>
                        <td>₹{item.p25.toLocaleString()}</td>
                        <td>₹{item.p50.toLocaleString()}</td>
                        <td>₹{item.p75.toLocaleString()}</td>
                        <td>₹{item.p99.toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-data">
                        <div className="no-data-container">
                          <div className="no-data-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="50"
                              height="50"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#cccccc"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <path d="M14 2v6h6"></path>
                              <line x1="9" y1="15" x2="15" y2="15"></line>
                            </svg>
                          </div>
                          <div className="no-data-text">No data available</div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderGmvModal;
