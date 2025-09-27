import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // adresa e backend-it
});

export default API;
