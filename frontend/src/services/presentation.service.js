

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3777/api";

export const generatePresentation = async (data) => {
  const response = await axios.post(`${API_URL}/presentation/generate`, data);

  return response.data;
};