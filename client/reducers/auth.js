import { AUTH, LOGOUT, UPDATESTATUS, GETAUTHUSER } from "../constants/actionTypes";
import AsyncStorage from "@react-native-community/async-storage";
const asyncStorageClear = async () => {
  await AsyncStorage.clear();
}
const asyncStorageSetAuth = async (action) => {
  await AsyncStorage.setItem("profile", JSON.stringify({ ...action?.data }));
}


const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case LOGOUT:
      asyncStorageClear();
      return { ...state, authData: null };
    case AUTH:
      asyncStorageSetAuth(action);
      return { ...state, authData: action?.data };
    case UPDATESTATUS:
      return state;
    case GETAUTHUSER:
      return action.data;
    default:
      return state;
  }
};

export default authReducer;