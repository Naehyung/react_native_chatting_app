import Message from '../models/message.js'
import ChatRoom from '../models/chatRoom.js'
import User from '../models/user.js'
function socket(io){

    io.on("connect", (socket) => {

        console.log(socket.id)
        
        socket.on("joinRoom", async (roomId) => {
            socket.join(roomId)
            const chatRoom = await ChatRoom.findById(roomId);
            const result =  await Message.find({
                chatroom: {
                    $all: chatRoom
                }
            }).populate("user")
            io.to(roomId).emit("getMessages", result)
            
        })

        socket.on("sendMessage", async (text) => {
            const { Content, RoomID, UserID, Date } = text;
            const user = await User.findById(UserID)
            const chatRoom = await ChatRoom.findById(RoomID)
    
            const result = await Message.create({
                content: Content,
                createdAt: Date,
                chatroom: chatRoom,
                user: user,
            });
            const update = await chatRoom.update({
                lastMessage: result
            })
            io.to(RoomID).emit("text", result);
        });

        socket.on("disconnect", () => {
            console.log("USER DISCONNECTED");
        })



        



    });
};

export default socket;