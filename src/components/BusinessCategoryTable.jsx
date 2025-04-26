import React, { useState } from "react";
import "../styles/BusinessCategoryTable.css";

const BusinessCategoryTable = ({ categoryData }) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [hoveredRow, setHoveredRow] = useState(null);

  // Sorting function for table columns
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to the data
  const sortedData = React.useMemo(() => {
    let sortableItems = [...categoryData];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [categoryData, sortConfig]);

  // Calculate total orders
  const totalOrders = categoryData.reduce((sum, item) => sum + item.orderCount, 0);

  // Format order count in millions with 2 decimal places
  const formatOrderCount = (count) => {
    return count.toFixed(2) + "M";
  };

  return (
    <div className="business-category-table-container">
      <div className="table-responsive">
        <table className="business-category-table">
          <thead>
            <tr>
              <th
                onClick={() => requestSort("name")}
                className={sortConfig.key === "name" ? `sorted-${sortConfig.direction}` : ""}
              >
                Business Category
                <span className="sort-icon"></span>
              </th>
              <th
                onClick={() => requestSort("orderCount")}
                className={sortConfig.key === "orderCount" ? `sorted-${sortConfig.direction}` : ""}
              >
                Count
                <span className="sort-icon"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((category, index) => (
                <tr
                  key={index}
                  className={hoveredRow === index ? "hovered" : ""}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td>{category.name}</td>
                  <td>{formatOrderCount(category.orderCount)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="no-data">
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
                    <div className="no-data-text">No data</div>
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

export default BusinessCategoryTable;
