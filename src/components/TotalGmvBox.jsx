import React, { useState, useEffect } from "react";
import "../styles/TotalOrdersBox.css"; // Reusing the same styling

const TotalGmvBox = ({ totalGmv }) => {
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Animate count on load
  useEffect(() => {
    const duration = 1500; // ms
    const steps = 30;
    const stepTime = duration / steps;
    const increment = totalGmv / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const nextCount = Math.min(Math.round(increment * currentStep), totalGmv);
      setCount(nextCount);

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [totalGmv]);

  // Calculate growth percentage (mock data)
  const growthPercentage = 15.8;
  const isPositiveGrowth = growthPercentage > 0;

  return (
    <div
      className={`total-orders-box ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="box-header">
        <h2>Total GMV</h2>
        <div className={`growth-indicator ${isPositiveGrowth ? "positive" : "negative"}`}>
          <span className="growth-arrow">{isPositiveGrowth ? "↑" : "↓"}</span>
          <span className="growth-value">{Math.abs(growthPercentage)}%</span>
        </div>
      </div>
      <div className="order-count">₹{count.toLocaleString()}</div>
      <div className="time-period">Last 30 days</div>

      <div className="mini-chart">
        <div className="chart-bar" style={{ height: "50%" }}></div>
        <div className="chart-bar" style={{ height: "60%" }}></div>
        <div className="chart-bar" style={{ height: "45%" }}></div>
        <div className="chart-bar" style={{ height: "70%" }}></div>
        <div className="chart-bar" style={{ height: "65%" }}></div>
        <div className="chart-bar" style={{ height: "75%" }}></div>
        <div className="chart-bar active" style={{ height: "90%" }}></div>
      </div>
    </div>
  );
};

export default TotalGmvBox;
