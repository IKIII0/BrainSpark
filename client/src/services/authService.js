const API_BASE_URL = "http://localhost:3000/api";

export const authService = {
  
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if response has content before parsing JSON
      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = text ? { message: text } : {};
      }

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Network error");
    }
  },

  async register(userData) {
    try {
      console.log("Sending registration data:", userData);

      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      // Check if response has content before parsing JSON
      const contentType = response.headers.get("content-type");
      console.log("Content type:", contentType);

      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.log("Response text:", text);
        data = text ? { message: text } : {};
      }

      console.log("Parsed data:", data);

      if (!response.ok) {
        throw new Error(
          data.message || `Registration failed with status ${response.status}`
        );
      }

      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error(error.message || "Network error");
    }
  },
};
