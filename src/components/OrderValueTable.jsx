import React from "react";
import "../styles/PercentileTable.css";

const OrderValueTable = () => {
  // Mock data for percentiles - order counts (not more than 20)
  const orderValueData = [
    { category: "Fashion", p25: 2, p50: 4, p75: 8, p99: 15 },
    { category: "Beauty", p25: 1, p50: 3, p75: 5, p99: 12 },
    { category: "Healtcare", p25: 1, p50: 2, p75: 4, p99: 10 },
    { category: "Electronics", p25: 1, p50: 2, p75: 3, p99: 8 },
    { category: "Others", p25: 1, p50: 2, p75: 4, p99: 9 },
  ];

  return (
    <div className="percentile-table-container">
      <h2 className="table-title">Average Order Value Percentiles</h2>
      <p className="percentile-description">
        Shows how many orders users place at a single time (e.g., p25 means 25% of users place this
        many orders)
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
            {orderValueData.length > 0 ? (
              orderValueData.map((item, index) => (
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
  );
};

export default OrderValueTable;
