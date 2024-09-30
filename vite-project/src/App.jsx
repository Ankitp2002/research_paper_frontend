import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
  return (
    <Router>
      <Routes>
        <Route path="/author-home" Component={Home} />
        <Route path="/" Component={Login} />
        <Route path="/login" Component={Login} />
        <Route path="/submit" Component={Submit} />
        <Route path="/reviewer-home" Component={ReviewHomePage} />
        <Route path="/review" Component={Review} />
        <Route path="/approved" Component={ApprovedPapersPage} />
        <Route path="/rejected" Component={RejectedPapersPage} />
        <Route path="/logout" Component={Logout} />
        <Route path="/paperstatus" Component={PaperStatusPage} />
        <Route path="/publishedpapers" Component={PublishedPapersPage} />
        <Route path="/admin-home" Component={AdminHomePage} />
        <Route path="/admin/usermanagement" Component={UserManagement} />
        <Route
          path="/admin/reviewermanagement"
          Component={ReviewerManagement}
        />
        <Route
          path="/admin/managepublishedpapers"
          Component={PublishedPapersManagement}
        />
        <Route path="/user-home" Component={UserHomePage} />
      </Routes>
    </Router>
  );
}

export default App;
