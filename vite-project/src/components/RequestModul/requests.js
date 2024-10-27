import axios from "axios";
import { GetUserDetailsEndPoint } from "./Endpoint";

/**
 * Makes a dynamic API request.
 * @param {string} url - The endpoint URL.
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE).
 * @param {object} data - The request body parameters.
 * @param {object} headers - Optional headers for the request.
 * @returns {Promise} - The response from the API.
 */
export const apiRequest = async (url, method, data = {}, headers = {}) => {
  headers = {
    "Content-Type": "application/json", // Default content type
    ...headers, // Merge any custom headers
  };
  const response = await axios({
    url,
    method,
    data,
    headers,
  });

  if (method === "DELETE") {
    return response.status; // Return the response data
  }
  return response.data;
};

export const tokenValidation = async (navigate) => {
  try {
    const token = sessionStorage.getItem("authToken"); // Get token from sessionStorage
    const user_details = await apiRequest(
      GetUserDetailsEndPoint,
      "POST",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (user_details && user_details != null) {
      return user_details; // Store the author_id in the state
    } else {
      return false;
    }
  } catch (error) {
    if (error.response?.status === 401) {
      if (navigate) {
        navigate("/");
      } else {
        return false;
      } // Redirect to login on unauthorized access
    }
  }
};
