import ChatRoom from '../models/chatRoom.js'
import User from '../models/user.js'

export const getChatRooms = async (req, res) => {
    try {
        const chatRooms = await ChatRoom.find().populate("users").populate("lastMessage");

        res.status(200).json(chatRooms)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

export const createChatRoom = async (req, res) => {

    const { AUTH, USER } = req.body;
    
    try {
        
        const existingChatRoom = await ChatRoom.find({
            users: {
                $all: [AUTH, USER]
            }
        })

        console.log(existingChatRoom)
        if (existingChatRoom.length > 0) {
            return res.status(200).json({ result: existingChatRoom });
        }

        const result = await ChatRoom.create({
            users: [AUTH, USER]
        });

        await User.findByIdAndUpdate(
            AUTH._id,
            { "$addToSet": { chatrooms: result._id } },
            { new: true, useFindAndModify: false }
        )

        await User.findByIdAndUpdate(
            USER._id,
            { "$addToSet": { chatrooms: result._id } },
            { new: true, useFindAndModify: false }
        )

        return res.status(200).json({ result: result });


    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}