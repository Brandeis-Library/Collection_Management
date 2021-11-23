import { combineReducers } from 'redux';

import { inventoryReducer } from './inventory_reducer.js';

const rootReducer = combineReducers({
    inventory: inventoryReducer
});

export default rootReducer;