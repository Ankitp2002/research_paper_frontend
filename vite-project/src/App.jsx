import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/common components/Home";
import Login from "./components/common components/Login";
import Submit from "./components/common components/Submit";
import ReviewHomePage from "./components/Reviewer Components/ReviewHomePage";
import Review from "./components/Reviewer Components/Review";
import ApprovedPapersPage from "./components/Reviewer Components/ApprovedPaper";
import RejectedPapersPage from "./components/Reviewer Components/RejectedPaper";
import Logout from "./components/common components/Logout";
import PaperStatusPage from "./components/common components/PaperStatus";
import PublishedPapersPage from "./components/common components/PublishedPapers";
import AdminHomePage from "./components/Admin Components/Home";
import UserManagement from "./components/Admin Components/UserManagement";
import ReviewerManagement from "./components/Admin Components/ReviewerManagement";
import PublishedPapersManagement from "./components/Admin Components/ManagePublishedPapers";
import UserHomePage from "./components/User Components/Home";

function App() {
  // Function to check if token exists in local storage
  const isAuthenticated = () => {
    return localStorage.getItem("authToken") !== null; // Check if token exists
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" Component={Login} />

        {/* Protected Routes */}
        <Route
          path="/author-home"
          element={isAuthenticated() ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/submit"
          element={isAuthenticated() ? <Submit /> : <Navigate to="/" />}
        />
        <Route
          path="/reviewer-home"
          element={isAuthenticated() ? <ReviewHomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/review"
          element={isAuthenticated() ? <Review /> : <Navigate to="/" />}
        />
        <Route
          path="/approved"
          element={
            isAuthenticated() ? <ApprovedPapersPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/rejected"
          element={
            isAuthenticated() ? <RejectedPapersPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/logout"
          element={isAuthenticated() ? <Logout /> : <Navigate to="/" />}
        />
        <Route
          path="/paperstatus"
          element={
            isAuthenticated() ? <PaperStatusPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/publishedpapers"
          element={
            isAuthenticated() ? <PublishedPapersPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/user-home"
          element={isAuthenticated() ? <UserHomePage /> : <Navigate to="/" />}
        />

        {/* Admin Routes */}
        <Route
          path="/admin-home"
          element={isAuthenticated() ? <AdminHomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/usermanagement"
          element={isAuthenticated() ? <UserManagement /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/reviewermanagement"
          element={
            isAuthenticated() ? <ReviewerManagement /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/managepublishedpapers"
          element={
            isAuthenticated() ? (
              <PublishedPapersManagement />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
