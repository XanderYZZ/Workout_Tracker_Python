import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
const base_url = import.meta.env.BACKEND_BASE_URL;

const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    setIsLoading: () => { },
    setErrors: () => { },
    signup: async () => { },
    login: async () => { },
    logout: async () => { },
    isLoading: false,
    errors: {},
    isAuthenticated: function (): boolean {
        throw new Error("Function not implemented.");
    }
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("access_token") || null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = () => {
    const token = localStorage.getItem("access_token");

    return token ? true : false;
  }

  // Decode JWT payload (base64)
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  // On mount or token change → decode user
  useEffect(() => {
    if (token) {
      const decoded = parseJwt(token);
      if (decoded) {
        setUser({
          _id: decoded.user_id,
          username: decoded.username,
          exp: decoded.exp,
        });
      } else {
        setUser({});
      }
      localStorage.setItem("access_token", token);
    } else {
      setUser({});
      localStorage.removeItem("access_token");
    }
  }, [token]);

  // Basic form validation
  const validateForm = (formData : any) => {
    const newErrors = {};
    if (!formData.username?.trim()) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Login function
  const login = async (formData : {}) => {
    if (!validateForm(formData)) return;
    setIsLoading(true);

    try {
      const response = await axios.post(base_url + "/api/auth/login?", formData);
      const newToken = response.data.access_token;
      const username = response.data.username;
      setToken(newToken);
      setUser({username});
      toast.success("Login successful!");
      navigate('/papers');
    } catch (error : any) {
      console.error("Login error:", error);
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (formData : {}) => {
    setIsLoading(true);

    try {
      const username = formData['username'];
      const password = formData['password'];
      const email = formData['email'];
      const result = await axios.post(base_url + "/api/auth/signup?", {username, password, email});
      localStorage.setItem("token", result.data.access_token);
      toast.success("Signup successful!");
      navigate('/papers');
    } catch (error : any) {
      console.error("Signup error:", error);
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  }

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser({});
    localStorage.removeItem("access_token");
    toast("Logged out");
    navigate('/');
  };

  // Axios instance with token attached
  const authAxios = axios.create({
    baseURL: "http://localhost:8000/api/",
  });

  authAxios.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signup,
        login,
        logout,
        isLoading,
        setErrors,
        setIsLoading,
        errors,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);