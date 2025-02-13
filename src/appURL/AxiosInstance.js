import axios from 'axios';
// import { getCookieValue } from '../App';
const BASE_URL = process.env.REACT_APP_BASE_URL;

if (!BASE_URL) {
  if (process.env.NODE_ENV === 'development') {
  }
}

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    // const token = getCookieValue('access_token');
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default AxiosInstance;

// import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// if (!BASE_URL) {
//   if (process.env.NODE_ENV === "development") {
//     console.error("BASE_URL is not defined.");
//   }
// }

// const AxiosInstance = axios.create({
//   baseURL: BASE_URL,
// });

// const isTokenExpired = () => {
//   const expiration = localStorage.getItem("expiration");
//   console.log("Expiration:", expiration);
//   // if (!expiration) return true;
//   if(expiration){

//   const expirationDate = new Date(expiration);
//   const currentDate = new Date();
//   console.log("Current Date:", currentDate);
//   console.log("Is Expired:", currentDate > expirationDate);

//   return currentDate > expirationDate;

//   }
//   else{
//     return true;
//   }

// };

// AxiosInstance.interceptors.request.use(
//   (config) => {
//     if (isTokenExpired()) {
//       localStorage.clear();
//       console.log("Token expired, redirecting to login...");
//       window.location.href = "/";
//       return Promise.reject(new Error("Token expired"));
//     }

//     const token = localStorage.getItem("access_token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.error("Request Error:", error);
//     return Promise.reject(error);
//   }
// );

// export default AxiosInstance;
