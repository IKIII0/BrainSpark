import axios from "axios";

const API_BASE_URL = "https://brain-spark-be.vercel.app/api";

// Create axios instance with admin headers
const createAdminApi = (userEmail) => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "x-user-email": userEmail, // Send admin email in headers
    },
  });
};

export const materiService = {
  // Get all materi (public)
  async getAllMateri() {
    try {
      const response = await axios.get(`${API_BASE_URL}/materi`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching materi:", error);
      throw error;
    }
  },

  // Get materi by ID (public)
  async getMateriById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/materi/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching materi:", error);
      throw error;
    }
  },

  // Create materi (admin only)
  async createMateri(materiData, userEmail) {
    try {
      const adminApi = createAdminApi(userEmail);
      const response = await adminApi.post("/materi", materiData);
      return response.data.data;
    } catch (error) {
      console.error("Error creating materi:", error);
      throw error;
    }
  },

  // Update materi (admin only)
  async updateMateri(id, materiData, userEmail) {
    try {
      const adminApi = createAdminApi(userEmail);
      const response = await adminApi.put(`/materi/${id}`, materiData);
      return response.data.data;
    } catch (error) {
      console.error("Error updating materi:", error);
      throw error;
    }
  },

  // Delete materi (admin only)
  async deleteMateri(id, userEmail) {
    try {
      const adminApi = createAdminApi(userEmail);
      const response = await adminApi.delete(`/materi/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error deleting materi:", error);
      throw error;
    }
  },
};
