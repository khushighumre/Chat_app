

import { useState, useEffect, createContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";


const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setonlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  //  Check auth
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Auth failed");
    }
  };

  //  Login
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);
      if (data.success) {
        setAuthUser(data.userData);
        connectSocket(data.userData);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.message);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //  Logout
  const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setonlineUsers([]);
    delete axios.defaults.headers.common["Authorization "];
    toast.success("Logged out successfully");

    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  //  Update profile
  const updateProfile = async (body) => {

    console.log("📞 updateProfile() function called");

  try {
    console.log("📤 Sending profile update:", body);

    const token = localStorage.getItem("token");

    const { data } = await axios.put("/api/auth/update-profile", body, {
      headers: {
        Authorization: `Bearer ${token}`, //  required
      },
    });

    console.log("✅ Server response:", data);

    if (data.success) {
      setAuthUser(data.user);
      toast.success("Profile updated successfully");
    } else {
      toast.error(data.message || "Profile update failed");
    }
  } catch (error) {
    console.error("❌ Update error:", error);
    toast.error(error.message);
  }
};

  // Connect socket
  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;

    const newSocket = io(backendUrl, {
      query: { userId: userData._id },
    });

    newSocket.connect();
    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (userIds) => {
      setonlineUsers(userIds);
    });
  };

  //  Load token + auth on mount
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      checkAuth();
    }
    
  }, [token]);

  //  Provide all
  const value = {
    axios,
    authUser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
