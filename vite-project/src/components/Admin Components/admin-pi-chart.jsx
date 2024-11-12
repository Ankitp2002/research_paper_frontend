import "./UserManagement.css";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";
import PieChart from "../statistics";
import { AUTHOREndPoint } from "../RequestModul/Endpoint";
import { useEffect, useState } from "react";
const AdminPIChart = () => {
  const [thesesData, setThesesData] = useState([]);
  const [statusCounts, setStatusCounts] = useState({
    published: 0,
    review: 0,
    reject: 0,
    changeRequest: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${AUTHOREndPoint}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setThesesData(data); // Assuming the response data is an array of theses

        // Categorize theses based on their status
        const counts = {
          published: 0,
          review: 0,
          reject: 0,
          changeRequest: 0,
        };

        data.forEach((thesis) => {
          if (thesis.status === "published") {
            counts.published++;
          } else if (thesis.status === "reviewed") {
            counts.review++;
          } else if (thesis.status === "rejected") {
            counts.reject++;
          }
        });

        setStatusCounts(counts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Prepare the data array for rendering
  const data = [
    { title: "Published Theses", count: statusCounts.published, color: "blue" },
    {
      title: "Change Request Theses",
      count: statusCounts.review,
      color: "orange",
    },
    { title: "Rejected Theses", count: statusCounts.reject, color: "red" },
  ];
  return (
    <div className="user-page">
      <AdminNavbar />
      <div className="user-container">
        <h2>Analysis Thesis</h2>
        <div className="dashboard">
          <PieChart />
          <div style={{ borderTop: "1px solid #ccc", margin: "20px 0" }}></div>

          <div className="summary-boxes">
            {data.map((item, index) => (
              <div
                key={index}
                className="summary-box"
                style={{ backgroundColor: item.color }}
              >
                <h3>{item.count}</h3>
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AdminFooter />
    </div>
  );
};

export default AdminPIChart;
