import axios from "axios";

const API_BASE_URL = "https://brain-spark-be.vercel.app/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const userService = {
  // Get all users to find current user
  async getAllUsers() {
    try {
      const response = await api.get("/users");
      return response.data.data; // Access the data array from response
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  },

  // Update user profile in database
  async updateUserProfile(userId, profileData) {
    try {
      const response = await api.put(`/users/${userId}`, profileData);
      return response.data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },

  // Get complete user profile from database
  async getUserProfile(userId) {
    try {
      console.log("Fetching user profile for ID:", userId);

      // Get all users and find current user
      const usersResponse = await api.get("/users");
      console.log("API response:", usersResponse.data);

      // Access the data array from the response
      const users = usersResponse.data.data;
      console.log("Users array:", users);

      // Find user by ID or email
      const user = users.find((u) => u.id == userId || u.email_user === userId);

      if (user) {
        console.log("Found user:", user);
        return user;
      } else {
        console.log("User not found with ID:", userId);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },

  // Get user statistics from database
  async getUserStats(userId) {
    try {
      const response = await api.get(`/users/${userId}/stats`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user stats:", error);
      // Return default stats if API fails
      return {
        quizzesTaken: 0,
        totalScore: 0,
        averageScore: 0,
        streak: 0,
      };
    }
  },

  // Get user quiz history from database
  async getUserQuizHistory(userId) {
    try {
      const response = await api.get(`/users/${userId}/quizzes`);
      return response.data;
    } catch (error) {
      console.error("Error fetching quiz history:", error);
      // Return empty array if API fails
      return [];
    }
  },

  // Create a new quiz result for user
  async createUserQuizResult(userId, payload) {
    try {
      const response = await api.post(`/users/${userId}/quizzes`, payload);
      return response.data;
    } catch (error) {
      console.error("Error creating quiz result:", error);
      throw error;
    }
  },
};
