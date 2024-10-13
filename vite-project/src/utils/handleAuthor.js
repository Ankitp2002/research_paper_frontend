import {
  AuthorPaperEndPoint,
  AuthorPaperBS4EndPoint,
  GetUsersEndPoint,
} from "../components/RequestModul/Endpoint";
import { apiRequest } from "../components/RequestModul/requests";

export const fetchAuthors = async () => {
  const authorsResponse = await apiRequest(`${GetUsersEndPoint}/author`, "GET");

  if (Array.isArray(authorsResponse) && authorsResponse.length > 0) {
    const map = {};
    authorsResponse.forEach((author) => {
      map[author.id] = author.username; // Create a mapping of author ID to username
    });
    return [authorsResponse, map];
  } else {
    return `Error fetching authors: ${authorsResponse.status}`;
  }
};

export const fetchPaper = async () => {
  const papersResponse = await apiRequest(
    `${AuthorPaperEndPoint}/published`,
    "GET"
  );
  if (Array.isArray(papersResponse)) {
    return await papersResponse.map((ele) => ({
      id: ele.id,
      status: ele.status,
      title: ele.title,
      authorId: ele.User ? ele.User.id : null,
      authorName: ele.User ? ele.User.username : null,
    }));
  } else {
    return `Error fetching published papers: ${papersResponse.status}`;
  }
};

export const handleGetPaperB64 = async (id) => {
  try {
    const paper = await apiRequest(
      `${AuthorPaperBS4EndPoint}`,
      "POST",
      JSON.stringify({ id: id }),
      {}
    );
    // Assuming paper.file is the base64 string, strip off the data URL prefix if it exists
    const base64String = paper.file; // if base64 string has prefix "data:application/pdf;base64,", you can remove it

    // Create a Blob from the Base64 string
    const byteCharacters = atob(base64String); // Decode the base64 string
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Open the PDF in a new tab
    window.open(url, "_blank");

    // Optionally, you can revoke the object URL after some time to free up resources
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000); // Revoke after 1 second
  } catch (error) {
    console.error("Error retrieving paper:", error);
  }
};
