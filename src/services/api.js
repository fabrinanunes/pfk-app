import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  let token = document.cookie.split('=')[1]
  
  if (/flight/i.test(token) || /chargeId/i.test(token)) {
    token = document.cookie.split('=')[1].split(';')[0]
  };
  
  if (token){
    config.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }
  return config;
})

export default axiosInstance;