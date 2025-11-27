import axios from 'axios';

const API_BASE_URL = "https://brain-spark-be.vercel.app/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  // USER 
  async login(email, password) {
    try {
      const response = await api.post('/login', { email_user: email, pass: password });
      return response.data;
    } catch (error) {
      // Handle specific error messages from backend for invalid credentials
      if (error.response?.status === 401) {
        throw new Error('Email atau password salah');
      }
      throw new Error(error.response?.data?.message || error.message || "Login failed");
    }
  },

  async register(userData) {
    try {
      console.log("Sending registration data:", userData);
      
      // Send plain password, let backend handle hashing
      const response = await api.post('/users', userData);
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);
      
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error(error.response?.data?.message || error.message || "Network error");
    }
  },
};
