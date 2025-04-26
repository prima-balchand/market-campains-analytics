import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import PersonaRankPage from "./pages/PersonaRankPage";
import NotFound from "./pages/NotFound";
import PersonaConfidencePage from "./pages/PersonaConfidencePage";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<PersonaRankPage />} />
            <Route path="/persona-confidence" element={<PersonaConfidencePage />} />
            <Route path="*" element={<NotFound />} /> {/* 👈 Catch-all */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
