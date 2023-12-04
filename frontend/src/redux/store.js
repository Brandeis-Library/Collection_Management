
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./reducer";

let store;

if (process.env.NODE_ENV === 'development') {
  store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk, logger),
      compose(
        applyMiddleware(thunk, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      ),
    ),
  );

}


if (process.env.NODE_ENV === 'production') {
  store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk, logger),
      compose(
        applyMiddleware(thunk, logger),

      ),
    ),
  );

}

export default store;