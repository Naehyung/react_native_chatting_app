import express from "express";
import { getMessages, createMessage, updateLastMessage } from "../controllers/message.js"

const router = express.Router();

router.post("/createMessage", createMessage);
router.post("/getMessages", getMessages)
router.post("/updateLastMessage", updateLastMessage)

export default router;