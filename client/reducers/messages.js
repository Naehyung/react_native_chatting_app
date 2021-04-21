import { GETMESSAGES, CREATEMESSAGE } from "../constants/actionTypes";

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case CREATEMESSAGE:
      return action.data.result;
    case GETMESSAGES:
      return action.data.result;
    default:
      return state;
  }
};

export default messageReducer;