import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: "http://192.168.1.5:8080", 
});

const TOKEN_KEY = '@user_token';

// Adicionando o token ao cabeçalho de autorização
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY); // Obtém o token do AsyncStorage      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Adiciona o token ao cabeçalho
      }
    } catch (error) {
      console.error('Erro ao obter o token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
