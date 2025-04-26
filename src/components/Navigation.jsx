import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navigation.css";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <h1>Customer Personalization Engine</h1>
        </div>
        <ul className="nav-links">
          <li className={location.pathname === "/market-campains-analytics/" ? "active" : ""}>
            <Link to="/market-campains-analytics/">Persona Rank Analysis</Link>
          </li>

          <li
            className={
              location.pathname === "/market-campains-analytics/persona-confidence" ? "active" : ""
            }
          >
            <Link to="/market-campains-analytics/persona-confidence">
              Analysis with Confidence Flag
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
