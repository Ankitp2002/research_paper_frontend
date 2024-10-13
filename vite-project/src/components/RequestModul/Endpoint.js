const BASE_URL = "http://localhost:3000/api"; // Adjust if necessary

// Define your endpoints
const USER = `${BASE_URL}/users`;
export const LoginEndPoint = `${USER}/login`;
export const RegisterEndPoint = `${USER}/register`;
export const GetUsersEndPoint = `${USER}`;
export const GetUserDetailsEndPoint = `${USER}/login_user_details`;

// Author Paper
const AUTHOR = `${BASE_URL}/author`;
export const CreateAuthorPaperEndPoint = `${AUTHOR}/create`;
export const AuthorPaperEndPoint = `${AUTHOR}/paper`; // for all author
export const AuthorPaperBS4EndPoint = `${AUTHOR}/paper_b64`; // for all author
// export const AuthorPaper = `${BASE_URL}/author`;
