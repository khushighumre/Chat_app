

// Get all user except the logged in user
export const getUsersForSidebar = async (req, res) =>{
    try {
        const userId = req.user._id;
        const filteredUsers =await User.find({ _id: { $ne: userId } }).select("password");

        //  count number of messages not seen
        const unseenMessages = {}
        const promises = filteredUsers.map(async (user)=>{
            const messages = await Message.find({senderId: user._id, receiverId:userId, seen:false})
            if(messages.length > 0){
                unseenMessages[user._id] = messages.length;
            }
        })
    }
}