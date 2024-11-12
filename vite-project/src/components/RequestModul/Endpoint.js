const BASE_URL = "http://localhost:3000/api"; // Adjust if necessary

// Define your endpoints
export const USEREndPoint = `${BASE_URL}/users`;
export const LoginEndPoint = `${BASE_URL}/login`;
export const RegisterEndPoint = `${USEREndPoint}`;
export const GetUserDetailsEndPoint = `${BASE_URL}/users`;

// Author Paper
export const AUTHOREndPoint = `${BASE_URL}/thesis`;
export const CreateAuthorPaperEndPoint = `${AUTHOREndPoint}`;
export const AuthorPaperEndPoint = `${AUTHOREndPoint}`; // for all author
export const AuthorPaperBS4EndPoint = `${AUTHOREndPoint}/paper_b64`; // for all author
// export const AuthorPaper = `${BASE_URL}/author`;

// Reviewers
export const REVIEWEREndPoint = `${AUTHOREndPoint}`;
export const ReviewAuthorPaper = `${AUTHOREndPoint}`;

//comments
export const AddComments = `${BASE_URL}/comment`;

// notification
export const notificationUser = `${BASE_URL}/notification`;

//contectUs
export const contactUs = `${BASE_URL}/contectUs`;
