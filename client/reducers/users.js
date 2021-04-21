import { FETCHUSERS } from "../constants/actionTypes";

const usersReducer = (users = [], action) => {
    switch (action.type) {
        case FETCHUSERS:
            return action.data;
        default:
            return users
    }
};

export default usersReducer;