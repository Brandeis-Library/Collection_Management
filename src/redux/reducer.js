import { combineReducers } from 'redux';
import { INCREMENT, DECREMENT } from './actionTypes.js';

const inventoryReducer = (state = {inventory:4, barcode: "", }, action) => {
    switch (action.type) {
        case INCREMENT:
        return {...state, inventory: state.inventory + 1};
        case DECREMENT:
        return {...state, inventory: state.inventory - 1};
        default: return state
    }
}

const rootReducer = combineReducers({
    inventory: inventoryReducer
});

export default rootReducer;