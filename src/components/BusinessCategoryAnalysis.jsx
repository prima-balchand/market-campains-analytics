import React, { useState } from "react";

const BusinessCategoryAnalysis = ({
  title = "Business Category Analysis",
  description = "This section shows persona analysis based on business categories.",
  data,
}) => {
  const [activeCategory, setActiveCategory] = useState(data.categories[0]);

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

  return (
    <div className="persona-table-container">
      <h3>{title}</h3>
      <div className="interaction-hint">{description}</div>

      {/* Category Selection Tabs */}
      <div className="category-tabs" style={{ marginBottom: "20px" }}>
        {data.categories.map((category) => (
          <button
            key={category}
            className={`category-tab ${activeCategory === category ? "active" : ""}`}
            onClick={() => handleCategoryChange(category)}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              backgroundColor: activeCategory === category ? "#f0f0f0" : "#ffffff",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: activeCategory === category ? "bold" : "normal",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Category Header */}
      <div
        className="category-header"
        style={{
          backgroundColor: activeCategory === "Cosmettics" ? "#e57373" : "#4fc3f7",
          color: "white",
          padding: "15px",
          marginBottom: "20px",
          borderRadius: "4px",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        {activeCategory}
      </div>

      {/* Table for the active category */}
      <div className="table-responsive">
        <table className="persona-table">
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

              return (
                <tr key={row.id} style={{ backgroundColor: row.backgroundColor || "transparent" }}>
                  {isFirstInCategory && (
                    <td rowSpan={rowSpan} style={{ fontWeight: "bold", verticalAlign: "middle" }}>
                      {row.category}
                    </td>
                  )}
                  <td>{row.personaCategory}</td>
                  <td>{row.percentOrders}</td>
                  <td>
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
    </div>
  );
};

export default BusinessCategoryAnalysis;
