import { FETCHUSERS } from "../constants/actionTypes";
import * as api from "../api/index.js"

export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.getUsers();
        dispatch({ type: FETCHUSERS, data });
    } catch (error) {
        console.log(error);
    }
}