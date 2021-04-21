import express from "express";
import { createChatRoom, getChatRooms } from "../controllers/chatRoom.js"

const router = express.Router();

router.post("/createChatRoom", createChatRoom);
router.get("/getChatRooms", getChatRooms)

export default router;