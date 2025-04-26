import React, { useState, useEffect } from "react";
import "../styles/TotalOrdersBox.css";

const TotalOrdersBox = ({ totalOrders }) => {
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Animate count on load
  useEffect(() => {
    const duration = 1500; // ms
    const steps = 30;
    const stepTime = duration / steps;
    const increment = totalOrders / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const nextCount = Math.min(increment * currentStep, totalOrders);
      setCount(nextCount);

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [totalOrders]);

  // Format the count to display with 2 decimal places
  const formattedCount = count.toFixed(2);

  // Calculate growth percentage (mock data)
  const growthPercentage = 12.5;
  const isPositiveGrowth = growthPercentage > 0;

  return (
    <div
      className={`total-orders-box ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="box-header">
        <h2>Total Orders</h2>
        <div className={`growth-indicator ${isPositiveGrowth ? "positive" : "negative"}`}>
          <span className="growth-arrow">{isPositiveGrowth ? "↑" : "↓"}</span>
          <span className="growth-value">{Math.abs(growthPercentage)}%</span>
        </div>
      </div>
      <div className="order-count">{formattedCount}M</div>
      <div className="time-period">Last 30 days</div>

      <div className="mini-chart">
        <div className="chart-bar" style={{ height: "60%" }}></div>
        <div className="chart-bar" style={{ height: "40%" }}></div>
        <div className="chart-bar" style={{ height: "70%" }}></div>
        <div className="chart-bar" style={{ height: "50%" }}></div>
        <div className="chart-bar" style={{ height: "80%" }}></div>
        <div className="chart-bar" style={{ height: "65%" }}></div>
        <div className="chart-bar active" style={{ height: "90%" }}></div>
      </div>
    </div>
  );
};

export default TotalOrdersBox;
