import "./UserManagement.css";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";
import PieChart from "../statistics";
const AdminPIChart = () => {
  const data = [
    { title: "Published Theses", count: 100, color: "blue" },
    { title: "Rejected Theses", count: 20, color: "red" },
    { title: "Change Request Theses", count: 10, color: "orange" },
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
