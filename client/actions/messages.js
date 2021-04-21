import { GETMESSAGES, CREATEMESSAGE, UPDATELASTMESSAGE } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const updateLastMessage = (formData) => async (dispatch) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}

export const getMessages = (formData) => async (dispatch) => {
    try {
        

        const { data } = await api.getMessages(formData);

        dispatch({type:GETMESSAGES, data})

    } catch (error) {
        console.log(error);
    }
};

export const createMessage = (formData) => async (dispatch) => {


    try {

        const { data } = await api.createMessage(formData);

        dispatch({ type: CREATEMESSAGE, data })
    } catch (error) {
        console.log(error);
    }


}