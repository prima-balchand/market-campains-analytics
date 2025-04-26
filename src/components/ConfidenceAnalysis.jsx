import React, { useState, useEffect } from "react";
import "../styles/NetworkPersonaAnalysis.css";
// import PropTypes from "prop-types";

const ConfidenceAnalysis = ({
  title = "Network Persona Analysis",
  description = "This section shows persona analysis based on network data based on Confidence Flag",
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
    <div className={`persona-analysis-container ${animate ? "animate" : ""}`}>
      <div className="persona-analysis-header">
        <h3 className="persona-analysis-title">{title}</h3>
      </div>
      <div className="persona-analysis-description">{description}</div>
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

              // Animation delay for staggered entrance
              const animationDelay = `${index * 0.1}s`;

              return (
                <tr key={row.id} style={{ animationDelay }}>
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
                  <td className="value-cell-confidence">{row.aovMean?.toLocaleString() ?? "-"}</td>
                  <td className="value-cell-confidence">{row.low?.toLocaleString() ?? "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfidenceAnalysis;
