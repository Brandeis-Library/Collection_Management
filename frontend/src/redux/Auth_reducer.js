import {
    LOGIN
} from "./actionTypes.js";

const initialState = { username: '', role: '', loggedIn: false };

export const authReducer = (state = initialState, action) => {
    console.log("inside authReducer------", action);
    switch (action.type) {
        case LOGIN: return { ...state, loggedIn: true, username: action.payload.user.data[0].name, role: action.payload.user.data[0].role };
        default:
            return state;
    }
};