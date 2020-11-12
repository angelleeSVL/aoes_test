import { createStore, combineReducers, applyMiddleware } from "redux";
import { middleware as reduxPackMiddleware } from "redux-pack";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import {
  routeReducerSimple,
  routeMapReducer
} from "./common/reducers/reducers";
import {
  leiConnectionTreeReducer,
  newRequestReducer,
  requestListReducer,
  getDataReducer,
  kpxDataReducer,
  demoReducer
} from "./main/reducer";
import { authReducer } from "./main/authReducer";

const reducer = combineReducers({
  helloWorld: routeReducerSimple("helloWorld"),
  echo: routeMapReducer("echo", p => p.arg), // <"echo", any, any>

  authReducer,
  newRequestReducer,
  requestListReducer,
  getDataReducer,
  kpxDataReducer,
  leiConnectionTreeReducer,
  demoReducer
  /*
  a_selectedUser
  b_selectedUser
  */
});

const red1 = combineReducers({});
/*
const red2 = combineReducers({
  selectedUser,
  ownerReducer,
})
const red3 = combineReducers({
})

// state.red1.portfolioReducer

const exampleNestedReducer = combineReducers({
  red1,
  red2,
  red3,
})
*/

//export const storeState = createStore(initialState)

const composeEnhancers = composeWithDevTools;
const enhancers = null;
const middlewares = [thunkMiddleware, reduxPackMiddleware];

export default () => {
  return createStore(
    reducer,
    {},
    composeEnhancers(applyMiddleware(...middlewares))
  );
};
