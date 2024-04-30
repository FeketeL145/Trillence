import axios from "axios";

const API_URL = "https://localhost:7172/auth";

const AuthService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        userName: username,
        password: password,
      });
      return response.data.token;
    } catch (error) {
      throw error.response.data.error;
    }
  },

  register: async (username, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        userName: username,
        email: email,
        password: password,
      });
      return response.data.message;
    } catch (error) {
      throw error.response.data.error;
    }
  },
};

export default AuthService;
