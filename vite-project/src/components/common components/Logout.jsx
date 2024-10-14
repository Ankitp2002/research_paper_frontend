import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
    // Redirect to login after logging out
    navigate("/");
  }, [navigate]);

  return <h2>Logging out...</h2>;
};

export default Logout;
