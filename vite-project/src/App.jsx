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
import ContactUs from "./components/User Components/Contact";
import AboutUs from "./components/User Components/About";
import FAQ from "./components/User Components/FAQ";
import Support from "./components/User Components/Support";
import FAQ_wihout_login from "./components/User Components/FAQ_wihout_login";
import Support_without_login from "./components/User Components/Support_without_login";
import ContactUs_without_login from "./components/User Components/Contact_Without_Login";
import Basic from "./components/User Components/UserProfile";
import AboutUs_wihout_login from "./components/User Components/About_without_login";
import AdminPIChart from "./components/Admin Components/admin-pi-chart";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initialize as null to indicate loading

  useEffect(() => {
    const checkAuthentication = async () => {
      const token_Details = await tokenValidation();
      setIsAuthenticated(!!token_Details); // Set to true if token_Details exists, false otherwise
    };

    checkAuthentication();
  }, []);

  // Log the authentication status when it changes
  useEffect(() => {
    console.log("Authentication Status:", isAuthenticated);
  }, [isAuthenticated]);

  // Show a loading indicator while the authentication check is in progress
  if (isAuthenticated === null) {
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
          path="/admin-pi-chart"
          element={isAuthenticated ? <AdminPIChart /> : <Navigate to="/" />}
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
        <Route path="/" element={<HomePage />} />
        <Route
          path="/user-published-thesis"
          element={
            isAuthenticated ? <UserPublishPaperPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/contact-us"
          element={isAuthenticated ? <ContactUs /> : <Navigate to="/" />}
        />
        <Route
          path="/about-us"
          element={isAuthenticated ? <AboutUs /> : <Navigate to="/" />}
        />
        <Route
          path="/faq"
          element={isAuthenticated ? <FAQ /> : <Navigate to="/" />}
        />
        <Route
          path="/support"
          element={isAuthenticated ? <Support /> : <Navigate to="/" />}
        />
        <Route
          path="/user-home-page"
          element={isAuthenticated ? <UserHomePage /> : <Navigate to="/" />}
        />
        <Route path="/user-home" element={<UserHomePageWithoutLogin />} />
        <Route
          path="/without_login_contact_us"
          element={<ContactUs_without_login />}
        />
        <Route
          path="/without_login_support"
          element={<Support_without_login />}
        />
        <Route path="/without_login_FAQ" element={<FAQ_wihout_login />} />
        <Route
          path="/without_login_about_us"
          element={<AboutUs_wihout_login />}
        />
        <Route
          path="/user-profile"
          element={isAuthenticated ? <Basic /> : <Navigate to="/" />}
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
