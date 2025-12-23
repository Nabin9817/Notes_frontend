import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const checkStatus = () => {
    try {
      const token = localStorage.getItem("access_token");
      const role = localStorage.getItem("user_role");
      if (token) {
        setUser({ loggedIn: true, role });
      }
    } catch (err) {
      console.error("Auth initialization failed", err);
    } finally {
      // THIS MUST RUN no matter what to remove the blank screen
      setLoading(false); 
    }
  };
  checkStatus();
}, []);

 const login = async (credentials) => {
  // 'credentials' will now be { email: "...", password: "..." }
  const res = await api.post('/api/auth/login/', credentials);
  
  localStorage.setItem('access_token', res.data.access);
  localStorage.setItem('refresh_token', res.data.refresh);
  
  // Optional: If your backend returns user info, save it here
  setUser({ loggedIn: true, role: res.data.is_staff ? 'admin' : 'user' });
};

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);