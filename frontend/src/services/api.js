import axios from "axios";

const API_URL = "http://localhost:5000";

export const analyzeRequirement = async (requirement) => {
  const response = await axios.post(
    `${API_URL}/api/analyze`,
    {
      requirement,
    }
  );

  // Return only the actual architecture data
  return response.data.data;
};