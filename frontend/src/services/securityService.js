import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/security`;

// Security telemetry API communication

export const getSecurityMetrics = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/metrics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getSecurityEvents = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
