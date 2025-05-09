import React, { useState, useEffect } from "react";
import "../styles/BusinessAnalysis.css";

const ConfidenceCategoryAnalysis = ({ title, description, data }) => {
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
                  <td>
                    {row.personaCategory && (
                      <span
                        className={`persona-badge ${getPersonaBadgeClass(row.personaCategory)}`}
                      >
                        {row.personaCategory}
                      </span>
                    )}
                  </td>
                  <td className="value-cell-confidence">{row.percentOrders ?? "-"}</td>
                  <td className="value-cell-confidence">
                    {row.aovMean?.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    }) ?? "-"}
                  </td>
                  <td className="value-cell-confidence">
                    {row.low?.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    }) ?? "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfidenceCategoryAnalysis;
