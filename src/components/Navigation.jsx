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
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">Dashboard</Link>
          </li>
          <li className={location.pathname === "/persona-rank" ? "active" : ""}>
            <Link to="/persona-rank">Persona Rank Analysis</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
