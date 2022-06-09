import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOST } from '@/constants';

const api = axios.create({
  baseURL: HOST,
});

api.interceptors.request.use(async (config) => {

  const headers = { 
    ...config.headers,
  };

  const jwt = await AsyncStorage.getItem('jwt');
  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`;
  }

  return { ...config, headers };
});

api.interceptors.response.use((response) => {
  // console.log(response.data);
  return response;
}, function (error) {
  console.log(error.response.data);
  return Promise.reject(error);
});

export default api;
