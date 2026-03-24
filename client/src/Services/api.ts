// src/services/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchMenu = async (category: string) => {
  const res = await API.get(`/menu?category=${category}`);
  return res.data;
};