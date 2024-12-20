import axios, { AxiosError } from "axios";
import api from ".";

// Funções de requisição com tratamento de erro

export const request = {
  login: async (data: { email: string; senha: string }) => {
    try {
      const response = await api.post("/Autenticacao/Login", {
        email: data.email,
        senha: data.senha,
      });
      
      return response.data; // Retorna os dados recebidos
    } catch (error: any) {
      if (error.response) {
        // Erro na resposta do servidor
        console.error("Erro no servidor:", error.response.status, error.response.data);
      } else if (error.request) {
        // Requisição feita, mas sem resposta
        console.error("Nenhuma resposta recebida:", error.request);
      } else {
        // Erro ao configurar a requisição
        console.error("Erro na configuração:", error.message);
      }
      throw error; // Relança o erro para ser tratado externamente, se necessário
    }
  },  
   listarDadosUsuario: async () => {
    try {
      const response = await api.get("/Usuario/Listar")      
      return response.data; // Retorna os dados recebidos
    } catch (error: any) {
      if (error.response) {
        // Erro na resposta do servidor
        console.error("Erro no servidor:", error.response.status, error.response.data);
      } else if (error.request) {
        // Requisição feita, mas sem resposta
        console.error("Nenhuma resposta recebida:", error.request);
      } else {
        // Erro ao configurar a requisição
        console.error("Erro na configuração:", error.message);
      }
      throw error; // Relança o erro para ser tratado externamente, se necessário
    }
  },
};

