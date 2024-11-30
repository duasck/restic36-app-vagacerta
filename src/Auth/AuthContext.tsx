import { createContext, useState, ReactNode, useContext } from "react";

// Importa o tipo de usuário
import { UserProps } from "../utils/Types";

// Define o tipo do contexto
type AuthContextType = {
  user: UserProps | null; // Usuário autenticado ou null se não autenticado
  login: (user: UserProps) => void; // Função para autenticar o usuário
  logout: () => void; // Função para deslogar o usuário
};

// Cria o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider que envolve a aplicação e fornece o contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);

  const login = (newUser: UserProps) => setUser(newUser);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
