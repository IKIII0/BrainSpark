import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'https://brain-spark-be.vercel.app/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token/email
api.interceptors.request.use(
  (config) => {
    // Get user from localStorage instead of context
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user?.email) {
          config.headers['x-user-email'] = user.email;
          console.log('Request to:', config.url);
          console.log('Added x-user-email header:', user.email);
          console.log('Request data:', config.data);
        }
      } catch (e) {
        console.error('Error parsing user from localStorage:', e);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to log errors
api.interceptors.response.use(
  (response) => {
    console.log('Response from:', response.config.url);
    console.log('Response data:', response.data);
    return response;
  },
  (error) => {
    console.error('Response error from:', error.config?.url);
    console.error('Error status:', error.response?.status);
    console.error('Error data:', error.response?.data);
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
      console.log('API Base URL:', api.defaults.baseURL);
      
      const response = await api.post("/materi", materiData);
      console.log('Create materi full response:', response);
      console.log('Create materi response data:', response.data);
      
      // Handle different response structures
      if (response.data.data) {
        return response.data.data;
      } else if (response.data) {
        return response.data;
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error("Full error object:", error);
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
      
      if (error.response) {
        // Server responded with error
        console.error("Server error data:", error.response.data);
        console.error("Server error status:", error.response.status);
      } else if (error.request) {
        // Request was made but no response
        console.error("No response received:", error.request);
      }
      
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
