import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
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
import AuthorManagement from "./components/Admin Components/AuthorManagement";
import AdminRejectedPapers from "./components/Admin Components/RejectedPaper";
import AdminReviewPapers from "./components/Admin Components/ReviewPaper";
import PublishedPapersManagement from "./components/Admin Components/ManagePublishedPapers";
import HomePage from "./components/User Components/Home";
import UserPublishPaperPage from "./components/User Components/UserHome";
import UserHomePage from "./components/User Components/UserHomePage";
import UserHomePageWithoutLogin from "./components/User Components/UserHomePageWithoutLogin";
import { tokenValidation } from "./components/RequestModul/requests";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null initially to indicate loading

  useEffect(() => {
    const checkAuthentication = async () => {
      // const token_Details = await tokenValidation();
      // setIsAuthenticated(token_Details ? true : false);
      const token_Details = "";
      setIsAuthenticated(true);
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    // Show a loading indicator while the authentication check is in progress
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" Component={Login} />

        {/* Protected Routes */}
        <Route
          path="/author-home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/submit"
          element={isAuthenticated ? <Submit /> : <Navigate to="/" />}
        />
        <Route
          path="/paperstatus"
          element={isAuthenticated ? <PaperStatusPage /> : <Navigate to="/" />}
        />
        <Route
          path="/reviewer-home"
          element={isAuthenticated ? <ReviewHomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/review"
          element={isAuthenticated ? <Review /> : <Navigate to="/" />}
        />
        <Route
          path="/approved"
          element={
            isAuthenticated ? <ApprovedPapersPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/rejected"
          element={
            isAuthenticated ? <RejectedPapersPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/logout"
          element={isAuthenticated ? <Logout /> : <Navigate to="/" />}
        />

        <Route
          path="/publishedpapers"
          element={
            isAuthenticated ? <PublishedPapersPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/user-published-thesis"
          element={
            isAuthenticated ? <UserPublishPaperPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/user-home-page"
          element={isAuthenticated ? <UserHomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/user-home"
          element={
            isAuthenticated ? <UserHomePageWithoutLogin /> : <Navigate to="/" />
          }
        />
        {/* Admin Routes */}
        <Route
          path="/admin-home"
          element={isAuthenticated ? <AdminHomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/usermanagement"
          element={isAuthenticated ? <UserManagement /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/reviewermanagement"
          element={
            isAuthenticated ? <ReviewerManagement /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/authormanagement"
          element={isAuthenticated ? <AuthorManagement /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/rejectedpaper"
          element={
            isAuthenticated ? <AdminRejectedPapers /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/reviewpaper"
          element={
            isAuthenticated ? <AdminReviewPapers /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/managepublishedpapers"
          element={
            isAuthenticated ? (
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
