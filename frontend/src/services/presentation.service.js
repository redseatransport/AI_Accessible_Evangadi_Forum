import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:3777/api";

export const generatePresentation = async (data) => {
  const response = await axios.post(`${API}/presentation/generate`, data);

  return response.data;
};
