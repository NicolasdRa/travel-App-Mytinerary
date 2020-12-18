import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const middleWare = [thunk];
const composeEnhancers = composeWithDevTools({ trace: true, tracelimit: 25 });

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleWare)),
);

export default store;
