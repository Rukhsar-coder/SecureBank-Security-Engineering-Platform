import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const loginUser = async (formData) => {
  const response = await axios.post(`${API_URL}/login`, formData);

  return response.data;
};

export const registerUser = async (formData) => {
  const response = await axios.post(`${API_URL}/register`, formData);

  return response.data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
