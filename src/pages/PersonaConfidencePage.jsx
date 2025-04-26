import React, { useState } from "react";
import "../styles/PersonaRankTables.css";
import TimePeriodTiles from "../components/TimePeriodTiles";
import { networkConfidenceData } from "../data/networkConfidenceData";
import ConfidenceAnalysis from "../components/ConfidenceAnalysis";
import { businessConfidenceData } from "../data/businessConfidenceData";
import { merchantConfidenceData } from "../data/merchantConfidenceData";
import { businessCategoryCofidenceData } from "../data/businessCategoryConfidenceData";
import ConfidenceCategoryAnalysis from "../components/ConfidenceCategoryAnalysis";
import { merchantCategoryCofidenceData } from "../data/merchantCategoryConfidenceData";

const PersonaConfidencePage = () => {
  const [activeTab, setActiveTab] = useState("network");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Persona Analysis with Confidence Flag</h1>

      {/* Global Time Period Tiles */}
      <TimePeriodTiles />

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
          {activeTab === "network" && <ConfidenceAnalysis data={networkConfidenceData} />}

          {activeTab === "business" && (
            <div>
              <ConfidenceAnalysis
                data={businessConfidenceData}
                title={"Business Persona Analysis"}
                description={
                  "This section shows persona analysis based on business data based on Confidence Flag."
                }
              />
              <div style={{ marginTop: "40px", borderTop: "1px solid #ddd", paddingTop: "30px" }}>
                <ConfidenceCategoryAnalysis
                  data={businessCategoryCofidenceData}
                  title={"Business Category Analysis"}
                  description={
                    "This section shows persona analysis based on business categories based on Confidence Flag."
                  }
                />
              </div>
            </div>
          )}

          {activeTab === "merchant" && (
            <div>
              <ConfidenceAnalysis
                data={merchantConfidenceData}
                title={"Merchant Persona Analysis"}
                description={
                  "This section shows persona analysis based on merchant data based on Confidence Flag."
                }
              />
              <div style={{ marginTop: "40px", borderTop: "1px solid #ddd", paddingTop: "30px" }}>
                <ConfidenceCategoryAnalysis
                  data={merchantCategoryCofidenceData}
                  title={"Merchant Category Analysis"}
                  description={
                    "This section shows persona analysis based on merchant categories based on Confidence Flag."
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonaConfidencePage;
