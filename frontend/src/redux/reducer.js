import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import { inventoryReducer } from "./inventory_reducer.js";

const rootReducer = combineReducers({
  inventory: inventoryReducer,
  loadingBar: loadingBarReducer,
});

export default rootReducer;
