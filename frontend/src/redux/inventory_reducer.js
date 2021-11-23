import { INCREMENT, DECREMENT, BARCODE, SENDBARCODE } from './actionTypes.js';

const initialState = {inventory:4, barcode: "", barcode2: "", title: "",}


export const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return {...state, inventory: state.inventory + 1};
        case DECREMENT:
            return {...state, inventory: state.inventory - 1};
        case BARCODE:
            return {...state, barcode: action.payload.text.text };
        case SENDBARCODE:
            return {...state, barcode2: action.payload.barcode2, title: action.payload.title,};
        default: return state
    }
}