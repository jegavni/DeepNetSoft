// services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchMenu = (category) =>
  API.get(`/menu?category=${category}`);