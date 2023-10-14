import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import { inventoryReducer } from "./inventory_reducer.js";
import { authReducer } from "./Auth_reducer.js";

const rootReducer = combineReducers({
  inventory: inventoryReducer,
  account: authReducer,
  loadingBar: loadingBarReducer,

});

export default rootReducer;
