// import { useState } from "react";
// import { createContext } from "react";
// import axios from 'axios'
// import toast, { Toaster } from "react-hot-toast";
// import { useEffect } from "react";
// import {io} from "socket.io-client"

// const backendUrl = import.meta.env.VITE_BACKEND_URL;
// axios.default.baseURL = backendUrl;

// export const AuthContext = createContext();

// export const AuthProvider = ({children})=>{

//     const [token, setToken] = useState(localStorage.getItem("token"));
//     const [authUser, setAuthUser] = useState(null);
//     const [onlineUsers, setonlineUsers] = useState([]);
//     const [socket, setSocket] = useState(null);

//     // check if user is authenticated and if so, set the user data and contact the socket
//     const checkAuth = async () =>{
//         try{
//             const {data} = await axios.get("/api/auth/check");
//             if (data.success){
//                 setAuthUser(data.user)
//                 connectSocket(data.user)
//             }
//         }catch(error){
//             toast.error(error.message)
//         }
//     }




//  // Login function to handle user aunthentication and socket connection
//  const login = async(state, Credentials)=>{
//     try{
//         const {data} = await axios.post(`/api/auth/${state}`, Credentials);
//         if(data.success){
//             setAuthUser(data.userData);
//             connectSocket(data.userData);
//             axios.defaults.headers.common["token"]= data.token;
//             setToken( data.token )
//             localStorage.setItem("token", data.token )
//             toast.success(data.message)
//         }else{
//             toast.error(error.message)

//         }
//     }catch(error){
//         toast.error(error.message)

//     }
//  }

// //  logout function to handle user logout and socket disconnection

// const logout = async () =>{
//     localStorage.removeItem("token");
//     setToken(null);
//     setAuthUser(null);
//     setonlineUsers([]);
//     axios.defaults.headers.common["token"] = null;
//     toast.success("Logged out successfully")
//     socket.disconnect();
// }

// // update profile function to handle user profile updates

// const updateProfile = async (body) => {
//     try{
//         const {data} = await axios.put("/api/auth/update-profile", body);
//         if(data.success){
//             setAuthUser(data.user);
//             toast.success("Profile updated successfully")
            
//         }
//     }catch(error){
//             toast.error(error.message)
//         }
// }

//     // Connect socket functions to hadle connection and online users updats
//     const connectSocket = (userData)=>{
//         if(!userData || socket?.coonected) return;
//         const newSocket = io.(backendUrl, {
//             query: {
//                 userId: userData._id,

//             }
//         });
//         newSocket.connect();
//         setSocket(newSocket);

//         newSocket.on("getOnlineUsers", (userIds)=> {
//             setonlineUsers(userIds);

//         })
//     }
//     useEffect(()=>{
//         if(token){
//             axios.defaults.headers.common["token"] = token;

//         }
//         checkAuth()

//     },[])


//     const value ={
//         axios,
//         authUser,
//         onlineUsers,
//         socket,
//         login,
//         logout,
//         updateProfile
//     }

//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     )
// }


// import { useState, useEffect, createContext } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { io } from "socket.io-client";

// // Set backend base URL from environment variable
// const backendUrl = import.meta.env.VITE_BACKEND_URL;
// axios.defaults.baseURL = backendUrl;

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [authUser, setAuthUser] = useState(null);
//   const [onlineUsers, setonlineUsers] = useState([]);
//   const [socket, setSocket] = useState(null);

//   // ✅ Function to check authentication and connect socket
//   const checkAuth = async () => {
//     try {
//       const { data } = await axios.get("/api/auth/check");
//       if (data.success) {
//         setAuthUser(data.user);
//         connectSocket(data.user);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // ✅ Login function
//   const login = async (state, credentials) => {
//     try {
//       const { data } = await axios.post(`/api/auth/${state}`, credentials);
//       if (data.success) {
//         setAuthUser(data.userData);
//         connectSocket(data.userData);
//         axios.defaults.headers.common["token"] = data.token;
//         setToken(data.token);
//         localStorage.setItem("token", data.token);
//         toast.success(data.message);
//       } else {
//         toast.error(data.message || "Login failed");
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // ✅ Logout function
//   const logout = async () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     setAuthUser(null);
//     setonlineUsers([]);
//     axios.defaults.headers.common["token"] = null;
//     toast.success("Logged out successfully");
//     if (socket) {
//       socket.disconnect();
//       setSocket(null);
//     }
//   };

//   // ✅ Update profile function
//   const updateProfile = async (body) => {
//     try {
//       const { data } = await axios.put("/api/auth/update-profile", body);
//       if (data.success) {
//         setAuthUser(data.user);
//         toast.success("Profile updated successfully");
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // ✅ Connect socket and update online users
//   const connectSocket = (userData) => {
//     if (!userData || socket?.connected) return;

//     const newSocket = io(backendUrl, {
//       query: {
//         userId: userData._id,
//       },
//     });

//     newSocket.connect();
//     setSocket(newSocket);

//     newSocket.on("getOnlineUsers", (userIds) => {
//       setonlineUsers(userIds);
//     });
//   };

//   // ✅ On first load, restore token and check auth
//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common["token"] = token;
//     }
//     checkAuth();
//   }, []);

//   // ✅ Context value
//   const value = {
//     axios,
//     authUser,
//     onlineUsers,
//     socket,
//     login,
//     logout,
//     updateProfile,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };





import { useState, useEffect, createContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// ✅ Set backend base URL
const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setonlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  // ✅ Check auth
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Login
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

  // ✅ Logout
  const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setonlineUsers([]);
    delete axios.defaults.headers.common["token"];
    toast.success("Logged out successfully");

    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  // ✅ Update profile
  const updateProfile = async (body) => {

    console.log("📞 updateProfile() function called");

  try {
    console.log("📤 Sending profile update:", body);

    const token = localStorage.getItem("token");

    const { data } = await axios.put("/api/auth/update-profile", body, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ required
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

  // ✅ Connect socket
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

  // ✅ Load token + auth on mount
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    }
    checkAuth();
  }, []);

  // ✅ Provide all
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
