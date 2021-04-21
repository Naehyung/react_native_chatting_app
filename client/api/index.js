import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const API = axios.create({ baseURL: "http://192.168.0.3:5002" });

API.interceptors.request.use(async (req) => {
    const user = await AsyncStorage.getItem("profile")
    if (user) {
        req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
    }
    return req;
});

export const login = (formData) => API.post("/user/login", formData);
export const registration = (formData) => API.post("/user/registration", formData);
export const updateStatus = (formData) => API.post("/user/updateStatus", formData);
export const getAuthUser = (formData) => API.post("/user/getAuthUser", formData)
export const updateImageFile = (formData) => API.post("/user/updateImageFile", formData);

export const getUsers = () => API.get("user/getUsers");

export const getChatRooms = () => API.get("/chatRoom/getChatRooms")
export const createChatRoom = (formData) => API.post("/chatRoom/createChatRoom",formData)

export const getMessages = (roomId) => API.post("/message/getMessages",roomId)
export const createMessage = (formData) => API.post("/message/createMessage", formData)
export const updateLastMessage = (formData) => API.post("/message/updateLastMessage", formData)

