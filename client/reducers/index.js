import { combineReducers } from "redux";

import auth from "./auth";
import error from "./error";
import users from "./users"
import chatRooms from './chatRooms'
import messages from './messages'

export const reducers = combineReducers({ auth, error, users, chatRooms, messages });
