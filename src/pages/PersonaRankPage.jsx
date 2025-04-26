import React, { useState } from "react";
import "../styles/PersonaRankTables.css";
import NetworkPersonaAnalysis from "../components/NetworkPersonaAnalysis";
import BusinessCategoryAnalysis from "../components/BusinessCategoryAnalysis";
import { networkPersonaData } from "../data/networkPersonaData";
import { businessPersonaData } from "../data/businessPersonaData";
import { businessCategoryData } from "../data/businessCategoryData";
import { merchantPersonaData } from "../data/merchantPersonaData";

const PersonaRankPage = () => {
  const [activeTab, setActiveTab] = useState("network");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Persona Rank Analysis</h1>

      <div className="persona-rank-container">
        {/* Tab Navigation */}
        <div className="persona-tabs">
          <button
            className={`persona-tab ${activeTab === "network" ? "active" : ""}`}
            onClick={() => handleTabChange("network")}
          >
            Network Persona
          </button>
          <button
            className={`persona-tab ${activeTab === "business" ? "active" : ""}`}
            onClick={() => handleTabChange("business")}
          >
            Business Persona
          </button>
          <button
            className={`persona-tab ${activeTab === "merchant" ? "active" : ""}`}
            onClick={() => handleTabChange("merchant")}
          >
            Merchant Persona
          </button>
        </div>

        {/* Tab Content */}
        <div className="persona-tab-content">
          {activeTab === "network" && <NetworkPersonaAnalysis data={networkPersonaData} />}

          {activeTab === "business" && (
            <div>
              <NetworkPersonaAnalysis
                data={businessPersonaData}
                title={"Business Persona Analysis"}
                description={"This section shows persona analysis based on business data."}
              />
              <div style={{ marginTop: "40px", borderTop: "1px solid #ddd", paddingTop: "30px" }}>
                <BusinessCategoryAnalysis data={businessCategoryData} />
              </div>
            </div>
          )}

          {activeTab === "merchant" && (
            <div>
              <NetworkPersonaAnalysis
                data={merchantPersonaData}
                title={"Merchant Persona Analysis"}
                description={"This section shows persona analysis based on merchant data."}
              />
              <div style={{ marginTop: "40px", borderTop: "1px solid #ddd", paddingTop: "30px" }}>
                <BusinessCategoryAnalysis data={businessCategoryData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonaRankPage;
