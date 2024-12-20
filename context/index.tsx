import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
  token: string | null;
  login: (jwtToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Criação do contexto
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const TOKEN_KEY = '@user_token';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  // Função para salvar o token no AsyncStorage e no estado
  const login = async (jwtToken: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, jwtToken);
      setToken(jwtToken);
    } catch (error) {
      console.error('Erro ao salvar o token:', error);
    }
  };

  // Função para limpar o token do AsyncStorage e do estado
  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      setToken(null);
    } catch (error) {
      console.error('Erro ao remover o token:', error);
    }
  };

  // Carregar o token do AsyncStorage quando o app é iniciado
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Erro ao carregar o token:', error);
      }
    };

    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto facilmente
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
