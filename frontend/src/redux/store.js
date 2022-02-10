import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
//import { loadingBarMiddleware } from "react-redux-loading-bar";
import rootReducer from "./reducer";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, logger),
    compose(
      applyMiddleware(thunk, logger),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  ),
);

export default store;
