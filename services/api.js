import axios from 'axios';

// Use your machine's IP address if testing on a mobile device
const API_URL = 'http:// 192.168.56.1:5000';  // Adjust the port if needed

export const loginUser = async (email) => {
  const response = await axios.post(`${API_URL}/send-code`, { email });
  return response;
};
