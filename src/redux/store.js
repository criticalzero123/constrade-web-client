import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { userInfoReducer, getUserByIdReducer } from "./reducer/userReducer";
import { followCountReducer } from "./reducer/followReducer";
import { getMessagesByUserIdsReducer } from "./reducer/userMessageReducer";
import {
  getProductMessagesReducer,
  getProductChatByUserIdReducer,
} from "./reducer/productMessageReducer";

import {
  getProductByUserReducer,
  getProductByIdReducer,
  getFavoriteByUserIdReducer,
} from "./reducer/productReducer";

import {
  getMyCommunityReducer,
  getCommunityByIdReducer,
  getAllCommunityReducer,
  getCommentPostReducer,
  getCommunityMembersReducer,
  getAllMyCommunityJoinedReducer,
  getPopularCommunityReducer,
  communityData,
} from "./reducer/communityReducer";

import {
  getOtherReviewsUserReducer,
  getMyReviewsUserReducer,
  getNotRatedReducer,
} from "./reducer/reviewReducer";

const finalReducer = combineReducers({
  userInfoReducer,
  followCountReducer,
  getMessagesByUserIdsReducer,
  getProductMessagesReducer,
  getProductChatByUserIdReducer,
  getProductByUserReducer,
  getProductByIdReducer,
  getFavoriteByUserIdReducer,
  getMyCommunityReducer,
  getCommunityByIdReducer,
  getAllCommunityReducer,
  getCommentPostReducer,
  getCommunityMembersReducer,
  getAllMyCommunityJoinedReducer,
  getPopularCommunityReducer,
  communityData,
  getUserByIdReducer,
  getOtherReviewsUserReducer,
  getMyReviewsUserReducer,
  getNotRatedReducer,
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
