import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    id: { type: String },
    content: { type: String, required: true },
    createdAt: { type: String, required: true },
    chatroom:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatRoom"
    },
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    
  
});

export default mongoose.model("Message", messageSchema);