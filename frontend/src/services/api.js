import axios from "axios";

const API_URL = "http://3.109.155.196:5000";

export const analyzeRequirement = async (requirement) => {
  const response = await axios.post(
    `${API_URL}/api/analyze`,
    {
      requirement,
    }
  );

  return response.data.data;
};