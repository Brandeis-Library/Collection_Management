import { combineReducers } from 'redux';
import { INCREMENT, DECREMENT, BARCODE, SENDBARCODE } from './actionTypes.js';

const inventoryReducer = (state = {inventory:4, barcode: "", barcode2: "",}, action) => {
    switch (action.type) {
        case INCREMENT:
            return {...state, inventory: state.inventory + 1};
        case DECREMENT:
            return {...state, inventory: state.inventory - 1};
        case BARCODE:
            return {...state, barcode: action.payload.text.text };
        case SENDBARCODE:
            return {...state, barcode2: action.payload.barcode2};
        default: return state
    }
}

const rootReducer = combineReducers({
    inventory: inventoryReducer
});

export default rootReducer;