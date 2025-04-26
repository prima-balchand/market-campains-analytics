import React, { useState, useEffect } from "react";
import TotalOrdersBox from "./TotalOrdersBox";
import TotalGmvBox from "./TotalGmvBox";
import BusinessCategoryTable from "./BusinessCategoryTable";
import GmvCategoryTable from "./GmvCategoryTable";
import OrderValueTable from "./OrderValueTable";
import GmvValueTable from "./GmvValueTable";
import "../styles/Dashboard.css";

// Generate more mock data for scrollbar testing
const generateMoreCategories = () => {
  const baseCategories = [
    { name: "Electronics", orderCount: 4.23, gmv: 125000, percentage: 18 },
    { name: "Clothing", orderCount: 3.56, gmv: 98000, percentage: 14 },
    { name: "Home & Kitchen", orderCount: 2.15, gmv: 65000, percentage: 9 },
    { name: "Books", orderCount: 1.54, gmv: 42000, percentage: 6 },
    { name: "Beauty & Personal Care", orderCount: 1.0, gmv: 25000, percentage: 4 },
    { name: "Sports & Outdoors", orderCount: 2.87, gmv: 78000, percentage: 11 },
    { name: "Toys & Games", orderCount: 1.92, gmv: 52000, percentage: 7 },
    { name: "Automotive", orderCount: 1.35, gmv: 112000, percentage: 16 },
    { name: "Health & Wellness", orderCount: 2.41, gmv: 67000, percentage: 10 },
    { name: "Grocery", orderCount: 5.12, gmv: 32000, percentage: 5 },
  ];

  // Add more categories for scrollbar testing
  const extraCategories = [
    { name: "Furniture", orderCount: 0.89, gmv: 145000, percentage: 20 },
    { name: "Jewelry", orderCount: 0.67, gmv: 89000, percentage: 13 },
    { name: "Pet Supplies", orderCount: 1.23, gmv: 34000, percentage: 5 },
    { name: "Office Products", orderCount: 1.78, gmv: 41000, percentage: 6 },
    { name: "Garden & Outdoor", orderCount: 0.95, gmv: 28000, percentage: 4 },
    { name: "Tools & Home Improvement", orderCount: 1.45, gmv: 56000, percentage: 8 },
    { name: "Baby Products", orderCount: 1.12, gmv: 38000, percentage: 5 },
    { name: "Musical Instruments", orderCount: 0.34, gmv: 22000, percentage: 3 },
    { name: "Industrial & Scientific", orderCount: 0.56, gmv: 67000, percentage: 10 },
    { name: "Arts, Crafts & Sewing", orderCount: 0.78, gmv: 19000, percentage: 3 },
    { name: "Digital Content", orderCount: 3.45, gmv: 15000, percentage: 2 },
    { name: "Luxury Goods", orderCount: 0.23, gmv: 195000, percentage: 28 },
    { name: "Handmade Products", orderCount: 0.45, gmv: 27000, percentage: 4 },
    { name: "Collectibles", orderCount: 0.32, gmv: 48000, percentage: 7 },
    { name: "Seasonal Items", orderCount: 0.87, gmv: 31000, percentage: 4 },
  ];

  return [...baseCategories, ...extraCategories];
};

// Enhanced mock data for demonstration
const allCategories = generateMoreCategories();

// Separate data for orders and GMV
const mockData = {
  totalOrders: 35.67, // In millions
  categories: allCategories.map(({ name, orderCount }) => ({ name, orderCount })),
  gmvData: allCategories.map(({ name, gmv, percentage }) => ({ name, gmv, percentage })),
};

// Calculate total GMV
const totalGmv = mockData.gmvData.reduce((sum, item) => sum + item.gmv, 0);

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dashboard-container">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      ) : (
        <>
          <h1 className="dashboard-title">Dashboard</h1>

          {/* Metric Cards */}
          <div className="metric-cards">
            <div className="metric-card">
              <div className="metric-icon orders-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="24"
                  height="24"
                >
                  <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                  <path
                    fillRule="evenodd"
                    d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="metric-content">
                <h3>Orders</h3>
                <div className="metric-value">{mockData.totalOrders.toFixed(2)}M</div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon gmv-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="24"
                  height="24"
                >
                  <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                    clipRule="evenodd"
                  />
                  <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                </svg>
              </div>
              <div className="metric-content">
                <h3>GMV</h3>
                <div className="metric-value">₹{totalGmv.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Tables Section */}
          <div className="tables-container">
            <div className="table-section">
              <h2 className="table-title">Orders by Business Category</h2>
              <BusinessCategoryTable categoryData={mockData.categories} />
            </div>

            <div className="table-section">
              <h2 className="table-title">GMV by Business Category</h2>
              <GmvCategoryTable gmvData={mockData.gmvData} />
            </div>
          </div>

          {/* Percentile Tables */}
          <div className="percentile-tables-container">
            <OrderValueTable />
            <GmvValueTable />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
