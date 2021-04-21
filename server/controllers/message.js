import ChatRoom from '../models/chatRoom.js'
import User from '../models/user.js'
import Message from '../models/message.js'

export const updateLastMessage = async (req, res) => {
    const { MessageID } = req.body;
    try {
        
    } catch (error) {
        
    }
}

export const createMessage = async (req, res) => {
    const { Content, RoomID, UserID, Date } = req.body;

    try {

        const user = await User.findById(UserID)
        const chatRoom = await ChatRoom.findById(RoomID)

        const result = await Message.create({
            content: Content,
            createdAt: Date,
            chatroom: chatRoom,
            user: user,
        });
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }

}

export const getMessages = async (req, res) => {

    const { RoomID } = req.body;

    try {

        const chatRoom = await ChatRoom.findById(RoomID);

    const result = await Message.find({
        chatroom: {
            $all: chatRoom
        }
    }).populate("user")

    res.status(200).json({ result });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}