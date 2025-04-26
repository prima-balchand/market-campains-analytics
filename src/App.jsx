import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import PersonaRankPage from "./pages/PersonaRankPage";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/persona-rank" element={<PersonaRankPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
