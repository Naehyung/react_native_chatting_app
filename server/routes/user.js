import express from "express";
import { login, registration, getUsers,updateStatus,getAuthUser } from "../controllers/user.js"

const router = express.Router();

router.post("/login", login);
router.post("/registration", registration);
router.get("/getUsers", getUsers)
router.post("/updateStatus", updateStatus)
router.post("/getAuthUser", getAuthUser)

export default router;