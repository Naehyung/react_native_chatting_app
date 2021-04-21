import mongoose from "mongoose"

const chatRoomSchema = mongoose.Schema({
    id: { type: String },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }
});

export default mongoose.model("ChatRoom", chatRoomSchema)