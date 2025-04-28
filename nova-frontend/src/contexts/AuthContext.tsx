import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define types
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Check if user is logged in on load
  useEffect(() => {
    const storedUser = localStorage.getItem('nova_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  
  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    // This is a mock implementation. In a real app, you'd make an API call here.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, let's accept any email/password with basic validation
        if (email && password.length >= 6) {
          const newUser = {
            id: `user-${Date.now()}`,
            name: email.split('@')[0], // Just use the part before @ as name
            email
          };
          
          setUser(newUser);
          setIsAuthenticated(true);
          localStorage.setItem('nova_user', JSON.stringify(newUser));
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000); // Simulate network delay
    });
  };
  
  // Signup function
  const signup = async (name: string, email: string, password: string): Promise<void> => {
    // This is a mock implementation. In a real app, you'd make an API call here.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password.length >= 6) {
          const newUser = {
            id: `user-${Date.now()}`,
            name,
            email
          };
          
          setUser(newUser);
          setIsAuthenticated(true);
          localStorage.setItem('nova_user', JSON.stringify(newUser));
          resolve();
        } else {
          reject(new Error('Invalid signup information'));
        }
      }, 1000); // Simulate network delay
    });
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('nova_user');
  };
  
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};