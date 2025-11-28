import axios from "axios";
import { getAuth } from '../context/AuthContext';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'https://brain-spark-be.vercel.app/api', // Sesuaikan dengan URL API Anda
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token/email
api.interceptors.request.use(
  (config) => {
    const auth = getAuth();
    if (auth?.user?.email) {
      config.headers['x-user-email'] = auth.user.email;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const materiService = {
  // Get all materi (public)
  async getAllMateri() {
    try {
      const response = await api.get('/materi');
      return response.data.data;
    } catch (error) {
      console.error("Error fetching materi:", error);
      throw error;
    }
  },

  // Get materi by ID (public)
  async getMateriById(id) {
    try {
      const response = await api.get(`/materi/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching materi:", error);
      throw error;
    }
  },

  // Create materi (admin only)
  async createMateri(materiData) {
    try {
      console.log('Creating materi with data:', materiData);
      
      const response = await api.post("/materi", materiData);
      console.log('Create materi response:', response.data);
      return response.data.data; // Return the data object
    } catch (error) {
      console.error("Error creating materi:", error.response?.data || error.message);
      throw error;
    }
  },

  // Update materi (admin only)
  async updateMateri(id, materiData) {
    try {
      const response = await api.put(`/materi/${id}`, materiData);
      return response.data;
    } catch (error) {
      console.error("Error updating materi:", error);
      throw error;
    }
  },

  // Delete materi (admin only)
  async deleteMateri(id) {
    try {
      console.log('Deleting materi with ID:', id);
      
      const response = await api.delete(`/materi/${id}`);
      console.log('Delete materi response:', response.data);
      return response.data.data; // Return the data object
    } catch (error) {
      console.error("Error deleting materi:", error.response?.data || error.message);
      throw error;
    }
  },
};
