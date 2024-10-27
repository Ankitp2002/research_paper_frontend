import {
  AuthorPaperEndPoint,
  AuthorPaperBS4EndPoint,
  USEREndPoint,
} from "../components/RequestModul/Endpoint";
import { apiRequest } from "../components/RequestModul/requests";

export const fetchAuthors = async () => {
  const authorsResponse = await apiRequest(`${USEREndPoint}/author`, "GET");

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
    `${AuthorPaperEndPoint}?status=published`,
    "GET"
  );
  if (Array.isArray(papersResponse)) {
    return await papersResponse.map((ele) => ({
      id: ele.id,
      status: ele.status,
      title: ele.title,
      publishYear: ele.publishYear,
      references: ele.references,
      contributorAuthors: ele.contributorAuthors,
      document: ele.document,
      abstract: ele.abstract,
      keyword: ele.keyword,
      authorId: ele?.author ? ele.author.id : null,
      authorName: ele?.author ? ele.author.name : null,
      comments: ele.comments
        ? ele.comments
            .filter((comment) => comment.user.role == "admin") // Filter comments by user role
            .map((comment) => ({
              comment: comment.comment,
              userName: comment.user.name, // Include the user's name
            }))
        : [],
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
