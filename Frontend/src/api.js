import axios from "axios";
import { ACCESS_TOKEN, GOOGLE_ACCESS_TOKEN } from "./token";
const api = axios.create({
  baseURL:"http://127.0.0.1:8000/" ,// is for amazon ec2 =>  http://13.60.83.205:8000/
  timeout: 5000, // Optional timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});
//  Before every request is sent, this function modifies the request configuration (config).
api.interceptors.request.use(
  (config)=>{
    const accessToken = localStorage.getItem( ACCESS_TOKEN);
    //If a user authentication token (ACCESS_TOKEN) exists, it adds an Authorization header
    if (accessToken){
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    //If a Google authentication token (GOOGLE_ACCESS_TOKEN) exists, it adds a custom header
    const googleAccessToken = localStorage.getItem(GOOGLE_ACCESS_TOKEN);
    if (googleAccessToken){
      config.headers["X-Google-Access-Token"] = googleAccessToken
    }
    return config
  },
  (error)=>{
    // If there's an error in setting up the request, it rejects the promise, stopping the request.
    return Promise.reject(error);
  }
)

export default api;