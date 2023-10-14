import {
    LOGIN
} from "./actionTypes.js";

const initialState = { username: '', pasword: '', loggedIn: false };

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};