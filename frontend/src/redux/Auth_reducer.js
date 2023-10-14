import {
    LOGIN
} from "./actionTypes.js";

const initialState = { username: '', password: '', loggedIn: false };

export const authReducer = (state = initialState, action) => {
    console.log("inside authReducer------", action.payload);
    switch (action.type) {
        case LOGIN: return { ...state, loggedIn: true, username: action.payload.user.username, password: action.payload.user.password };
        default:
            return state;
    }
};