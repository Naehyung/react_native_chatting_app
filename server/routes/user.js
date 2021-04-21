import express from "express";
import { login, registration, getUsers,updateStatus,getAuthUser,updateImageFile } from "../controllers/user.js"

const router = express.Router();

router.post("/login", login);
router.post("/registration", registration);
router.get("/getUsers", getUsers)
router.post("/updateStatus", updateStatus)
router.post("/getAuthUser", getAuthUser)
router.post("/updateImageFile", updateImageFile)

export default router;