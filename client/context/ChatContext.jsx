// import { createContext, useContext, useState } from "react";
// import { AuthContext } from "./AuthContext";
// import { useEffect } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";



// export const ChatContext = createContext();

// export const ChatProvider = ({ children })=> {

//     const [messages, setMessages] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null)
//     const [unseenMessages, setUnseenMessages] = useState({})

//     const {socket, axiox} = useContext(AuthContext);

//     // function to get ll users for sidebar

//     const getUsers = async () =>{
        
//         try {
//             const {data} = await axios.get("/api/messages/users");
//             console.log("Fetched users:", data); // 🔍 Add this to debug
//             if (data.success) {
//                 setUsers(data.users)
//                 setUnseenMessages(data.unseenMessages)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     // function to get message for selected user
//     const getMessages = async (userId)=>{
//         try {
//             const {data} = await axios.get(`/api/messages/${userId}`);
//             if (data.success){
//                 setMessages(data.messages)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     // function to send message to selected user
//     const sendMessage = async (messageData)=>{
//         try {
//             const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
//             if(data.success){
//                 setMessages((prevMessages)=>[...prevMessages, data.newMessage])
//             }else{
//                 toast.error(data.message);
//             }

//         } catch (error) {
//             toast.error(error.message);
//         }
//     }

//     // function to subscribe to message for selected user
//     const subscribeToMessages = async () =>{
//         if(!socket) return;

//         socket.on("newMessage", (newMessage)=>{
//             if(selectedUser && newMessage.senderId === selectedUser._id){
//                 newMessage.seen = true;
//                 setMessages((prevMessages)=> [...prevMessages, newMessage]);
//                 axios.put(`/api/messages/mark/${newMessage._id}`);
//             }else{
//                 setUnseenMessages(()=>({
//                     ...prevUnseenMessages, [newMessage.senderId] : 
//                     prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages
//                     [newMessage.senderId] + 1 : 1
//                 }))
//             }
//         })

//     }

//     // function to unsubscribe from messages
//     const unsubscribeFromMessages = ()=>{
//         if(socket) socket.off("newMessage");
//     }

//     useEffect(()=>{
//         subscribeToMessages();
//         return ()=> unsubscribeFromMessages();
//     },[socket, selectedUser])

//     const value = {
//         messages, users, selectedUser, getUsers, getMessages, setMessages, sendMessage, setSelectedUser, unseenMessages, setUnseenMessages
//     }

//     return(
//         <ChatContext.Provider value={value}>
//             { children }
//         </ChatContext.Provider>
//     )
// }

import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  const { socket } = useContext(AuthContext);

  // ✅ Get all users
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      console.log("Fetched users:", data);
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages || {});
      }
    } catch (error) {
      toast.error("Error fetching users");
      console.error(error);
    }
  };

  // ✅ Get messages for a selected user
  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      console.log("Fetched messages:", data);

      if (data.success) {
        // Ensure messages is always an array
        setMessages(Array.isArray(data.messages) ? data.messages : []);
      } else {
        setMessages([]);
      }
    } catch (error) {
      toast.error("Error loading messages");
      console.error(error);
      setMessages([]);
    }
  };

  // ✅ Send a message
  const sendMessage = async (messageData) => {
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );

      if (data.success) {
        setMessages((prev) => [...prev, data.newMessage]);
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message");
      console.error(error);
    }
  };

  // ✅ Subscribe to socket messages
  const subscribeToMessages = () => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prev) => [...prev, newMessage]);
        axios.put(`/api/messages/mark/${newMessage._id}`);
      } else {
        setUnseenMessages((prevUnseenMessages) => ({
          ...prevUnseenMessages,
          [newMessage.senderId]: prevUnseenMessages[newMessage.senderId]
            ? prevUnseenMessages[newMessage.senderId] + 1
            : 1,
        }));
      }
    });
  };

  const unsubscribeFromMessages = () => {
    if (socket) socket.off("newMessage");
  };

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [socket, selectedUser]);

  const value = {
    messages,
    users,
    selectedUser,
    getUsers,
    getMessages,
    setMessages,
    sendMessage,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
