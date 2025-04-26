import React, { useState } from "react";
import "../styles/TimePeriodTiles.css";

const TimePeriodTiles = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="global-time-period-container">
      <div className="time-period-tab" onClick={toggleExpand}>
        <span>Time Period Info</span>
        <span className={`expand-icon ${isExpanded ? "expanded" : ""}`}>
          {isExpanded ? "▼" : "▶"}
        </span>
      </div>

      {isExpanded && (
        <div className="global-time-period-tiles">
          <div className="global-time-period-tile">
            <div className="global-time-period-label">Training Time Period</div>
            <div className="global-time-period-value">01 January 2024 - 31 December 2024</div>
          </div>
          <div className="global-time-period-tile">
            <div className="global-time-period-label">Analysis Time Period</div>
            <div className="global-time-period-value">01 January 2025 - 15 January 2025</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePeriodTiles;
