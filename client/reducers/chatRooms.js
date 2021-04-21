import { CREATECHATROOM, GETCHATROOMS } from "../constants/actionTypes";
import AsyncStorage from "@react-native-community/async-storage";

const chatRoomReducer = (state = [], action) => {
  switch (action.type) {
    case CREATECHATROOM:
      return state;
    case GETCHATROOMS:
      
      return action.data;
    default:
      return state;
  }
};

export default chatRoomReducer;