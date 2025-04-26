import React, { useState, useEffect } from "react";
import "../styles/BusinessAnalysis.css";

const BusinessAnalysis = ({ title, description, data }) => {
  const [activeCategory, setActiveCategory] = useState(data.categories[0]);
  const [animate, setAnimate] = useState(false);

  // Trigger animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Group rows by category for rowspan calculation
  const groupedRows = data.categoryData[activeCategory].rowData.reduce((acc, row) => {
    if (!acc[row.category]) {
      acc[row.category] = [];
    }
    acc[row.category].push(row);
    return acc;
  }, {});

  // Helper function to get persona badge class
  const getPersonaBadgeClass = (persona) => {
    const personaLower = persona.toLowerCase();
    if (personaLower === "null") return "persona-badge-null";
    if (personaLower === "bronze") return "persona-badge-bronze";
    if (personaLower === "bronze+") return "persona-badge-bronzeplus";
    if (personaLower === "silver") return "persona-badge-silver";
    if (personaLower === "gold") return "persona-badge-gold";
    if (personaLower === "diamond") return "persona-badge-diamond";
    return "";
  };

  // Helper function to extract percentage value
  const extractPercentValue = (percentString) => {
    return parseInt(percentString.replace("%", ""), 10);
  };

  // Find the highest value for highlighting
  const highestValueRow = [...data.categoryData[activeCategory].rowData].sort(
    (a, b) => b.aovMean - a.aovMean
  )[0];

  return (
    <div
      className={`persona-table-container ${animate ? "animate" : ""}`}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <h3 className="persona-analysis-title">{title}</h3>
      <div className="persona-analysis-description">{description}</div>

      {/* Category Selection Tabs */}
      <div
        className="category-tabs"
        style={{ marginBottom: "20px", display: "flex", flexWrap: "wrap", gap: "10px" }}
      >
        {data.categories.map((category) => (
          <button
            key={category}
            className={`category-tab ${activeCategory === category ? "active" : ""}`}
            onClick={() => handleCategoryChange(category)}
            style={{
              padding: "12px 20px",
              backgroundColor: activeCategory === category ? "#f0f7ff" : "#ffffff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: activeCategory === category ? "bold" : "normal",
              transition: "all 0.3s ease",
              boxShadow:
                activeCategory === category
                  ? "0 4px 12px rgba(0, 0, 0, 0.1)"
                  : "0 2px 5px rgba(0, 0, 0, 0.05)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {activeCategory === category && (
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "3px",
                  background: "linear-gradient(90deg, #3498db, #2ecc71)",
                  animation: "pulse 2s infinite",
                }}
              ></span>
            )}
            {category}
          </button>
        ))}
      </div>

      {/* Category Header */}
      <div
        className="category-header"
        style={{
          backgroundColor: "#3498db",
          color: "white",
          padding: "15px",
          marginBottom: "20px",
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "18px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>{activeCategory}</span>
        <span style={{ fontSize: "14px", opacity: 0.8 }}>
          {data.categoryData[activeCategory].rowData.length} data points
        </span>
      </div>

      {/* Table for the active category */}
      <div className="persona-analysis-table-container">
        <table className="persona-analysis-table">
          <thead>
            <tr>
              {data.categoryData[activeCategory].headerData.map((header) => (
                <th key={header.id}>{header.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.categoryData[activeCategory].rowData.map((row, index) => {
              // Determine if this is the first row of a category group
              const isFirstInCategory =
                row.isFirstInGroup ||
                index === 0 ||
                data.categoryData[activeCategory].rowData[index - 1].category !== row.category;

              // Calculate rowspan for the category cell
              const rowSpan = isFirstInCategory ? groupedRows[row.category].length : 0;

              // Extract percentage value for the progress bar
              const percentValue = extractPercentValue(row.percentOrders);
              // Animation delay for staggered entrance
              const animationDelay = `${index * 0.1}s`;

              return (
                <tr
                  key={row.id}
                  style={{
                    backgroundColor: row.backgroundColor || "transparent",
                    animationDelay,
                  }}
                >
                  {isFirstInCategory && (
                    <td rowSpan={rowSpan} className="category-cell">
                      {row.category}
                    </td>
                  )}
                  <td>
                    <span className={`persona-badge ${getPersonaBadgeClass(row.personaCategory)}`}>
                      {row.personaCategory}
                    </span>
                  </td>
                  <td>
                    <div className="percent-value">{row.percentOrders}</div>
                    <div className="percent-bar-container">
                      <div
                        className="percent-bar"
                        style={{
                          width: animate ? `${percentValue}%` : "0%",
                          transition: `width 1s ease-out ${index * 0.1 + 0.5}s`,
                        }}
                      ></div>
                    </div>
                  </td>
                  <td className="value-cell">
                    {row.aovMean.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Key Insight Footer */}
      <div className="persona-analysis-footer">
        <div className="key-insight">
          <span className="insight-icon">💡</span>
          <span className="insight-text">
            Key insight: <strong>{highestValueRow.personaCategory}</strong> persona has the highest
            lifetime value at{" "}
            <strong>
              {highestValueRow.aovMean.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalysis;
