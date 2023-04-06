import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { userInfoReducer } from "./reducer/userReducer";

const finalReducer = combineReducers({
  userInfoReducer,
});

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const initialState = {
  userInfoReducer: { ...currentUser },
};

const rootReducer = (state, action) => {
  if (action.type === "USER_SIGN_OUT") {
    return finalReducer({}, action);
  }

  return finalReducer(state, action);
};

const composeEnhancers = composeWithDevTools({
  // specify here name, actionsBlacklist, actionCreators and other options
});

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk)
    //   other store enhancers
  )
);

export default store;
