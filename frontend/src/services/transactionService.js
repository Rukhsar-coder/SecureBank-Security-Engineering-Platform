import axios from "axios";

const API_URL = "http://localhost:3000/api/transactions";

export const getTransactions = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      //Authenticated API Communication:
      // frontend → protected backend communication using JWT Bearer authentication
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
