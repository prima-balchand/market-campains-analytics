import React, { useState, useEffect } from "react";
import "../styles/NetworkPersonaAnalysis.css";
// import PropTypes from "prop-types";

const NetworkPersonaAnalysis = ({
  title = "Network Persona Analysis",
  description = "This section shows persona analysis based on network data.",
  data,
}) => {
  // State for animation
  const [animate, setAnimate] = useState(false);

  // Trigger animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Group rows by category for rowspan calculation
  const groupedRows = data.rowData.reduce((acc, row) => {
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
  const highestValueRow = [...data.rowData].sort((a, b) => b.aovMean - a.aovMean)[0];

  // Calculate total percentage for summary (commented out as currently unused)
  // const totalPercentage = data.rowData.reduce((sum, row) => {
  //   return sum + extractPercentValue(row.percentOrders);
  // }, 0);

  // Calculate average lifetime value
  const averageLifetimeValue = Math.round(
    data.rowData.reduce((sum, row) => sum + row.aovMean, 0) / data.rowData.length
  );

  return (
    <div className={`persona-analysis-container ${animate ? "animate" : ""}`}>
      <div className="persona-analysis-header">
        <h3 className="persona-analysis-title">{title}</h3>
      </div>
      <div className="persona-analysis-description">
        {description}
        <span className="data-point-count">{data.rowData.length} data points</span>
      </div>
      <div className="persona-analysis-table-container">
        <table className="persona-analysis-table">
          <thead>
            <tr>
              {data.headerData.map((header) => (
                <th key={header.id}>{header.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rowData.map((row, index) => {
              // Determine if this is the first row of a category group
              const isFirstInCategory =
                row.isFirstInGroup ||
                index === 0 ||
                data.rowData[index - 1].category !== row.category;

              // Calculate rowspan for the category cell
              const rowSpan = isFirstInCategory ? groupedRows[row.category].length : 0;

              // Extract percentage value for the progress bar
              const percentValue = extractPercentValue(row.percentOrders);
              // Animation delay for staggered entrance
              const animationDelay = `${index * 0.1}s`;

              return (
                <tr key={row.id} style={{ animationDelay }}>
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
                  <td className="value-cell">{row.aovMean.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="persona-analysis-footer">
        <div className="key-insight">
          <span className="insight-icon">💡</span>
          <span className="insight-text">
            Key insight: <strong>{highestValueRow.personaCategory}</strong> persona has the highest
            lifetime value at <strong>{highestValueRow.aovMean.toLocaleString()}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

// NetworkPersonaAnalysis.propTypes = {
//   title: PropTypes.string,
//   description: PropTypes.string,
//   data: PropTypes.shape({
//     headerData: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         label: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     rowData: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         category: PropTypes.string.isRequired,
//         personaCategory: PropTypes.string.isRequired,
//         percentOrders: PropTypes.string.isRequired,
//         aovMean: PropTypes.number.isRequired,
//         backgroundColor: PropTypes.string,
//         isFirstInGroup: PropTypes.bool,
//       })
//     ).isRequired,
//   }).isRequired,
// };

export default NetworkPersonaAnalysis;
