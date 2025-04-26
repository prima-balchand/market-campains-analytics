import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const NotFound = () => {
  return (
    <div className="not-found-container" style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <h2 style={styles.subheading}>Page Not Found</h2>
      <p style={styles.text}>The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/market-campains-analytics/" style={styles.link}>
        Go back to Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    textAlign: "center",
    padding: "0 20px",
  },
  heading: {
    fontSize: "6rem",
    fontWeight: "bold",
    margin: "0",
    color: "#f44336",
  },
  subheading: {
    fontSize: "2rem",
    margin: "10px 0 20px",
  },
  text: {
    fontSize: "1.2rem",
    marginBottom: "30px",
    color: "#666",
  },
  link: {
    backgroundColor: "#2196f3",
    color: "white",
    padding: "12px 24px",
    borderRadius: "4px",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
};

export default NotFound;
