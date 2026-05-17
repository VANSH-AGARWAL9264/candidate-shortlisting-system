import axios from "axios";

const API = axios.create({
  baseURL: "https://candidate-shortlisting-backend-ewoi.onrender.com/api",
});

export default API;
