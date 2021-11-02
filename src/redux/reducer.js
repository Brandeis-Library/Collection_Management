import { combineReducers } from 'redux'

const inventoryReducer = (state = {inventory:4}, action) => {
    switch (action.type) {
        default: return state
    }
}

const rootReducer = combineReducers({
    inventory: inventoryReducer
});

export default rootReducer;