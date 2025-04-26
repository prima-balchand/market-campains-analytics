import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import PersonaRankPage from "./pages/PersonaRankPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <div className="content-container">
          <Routes>
            <Route path="/market-campains-analytics/" element={<HomePage />} />
            <Route path="/market-campains-analytics/persona-rank" element={<PersonaRankPage />} />
            <Route path="*" element={<NotFound />} /> {/* 👈 Catch-all */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
