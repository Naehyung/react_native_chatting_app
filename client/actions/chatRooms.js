import { CREATECHATROOM, GETCHATROOMS } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const createChatRoom = (formData) => async (dispatch) => {


    
    try {
        const { data } = await api.createChatRoom(formData);
        
        dispatch({ type: CREATECHATROOM, data });

    } catch (error) {
        console.log(error);
    }
};

export const getChatRooms = () => async (dispatch) => {

    try {
        const { data } = await api.getChatRooms();
        dispatch({ type: GETCHATROOMS, data })
    } catch (error) {
        console.log(error);
    }


}