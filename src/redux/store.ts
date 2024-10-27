import { RESET } from "@/utils/constants";
import { Action, combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import searchedUsersReducer from "./slices/searchResult";
import userDetailsReducer from "./slices/userDetails";
import friendRequestsReducer from "./slices/friendRequests";
import requestsSentReducer from "./slices/requestSent";
import friendsReducer from "./slices/friends";

const appReducer = combineReducers({
  user: userReducer,
  searchedUsers: searchedUsersReducer,
  userDetails:userDetailsReducer,
  friendRequests: friendRequestsReducer,
  requestsSent: requestsSentReducer,
  friends: friendsReducer
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: Action) => {
  if (action.type === RESET) {
    return appReducer(undefined, action);
  } else {
    return appReducer(state, action);
  }
}

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;