import { LOGINERROR, REGERROR } from "../constants/actionTypes";
import AsyncStorage from "@react-native-community/async-storage";

const errorReducer = (state = { loginErrorMessage: null, regErrorMessage: null }, action) => {
    switch (action.type) {
        case REGERROR:
            return { regErrorMessage: action?.error.response.data.message }
        case LOGINERROR:
            return { loginErrorMessage: action?.error.response.data.message };
        default:
            return { loginErrorMessage: null, regErrorMessage: null };
    }
};

export default errorReducer;