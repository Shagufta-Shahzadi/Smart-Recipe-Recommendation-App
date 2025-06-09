import axios from 'axios';

// Base URL for backend
const API_URL = 'http://localhost:5000'; // 🔥 Replace with your backend URL if needed

// Signup Function
export const signupUser = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/signup`, { username, email, password });
  return response.data;
};

// Login Function
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};
