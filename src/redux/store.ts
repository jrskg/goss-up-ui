import { RESET } from "@/utils/constants";
import { Action, combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";

const appReducer = combineReducers({
  user:userReducer
});

const rootReducer = (state:ReturnType<typeof appReducer> | undefined, action:Action) => {
  if(action.type === RESET){
    return appReducer(undefined, action);
  }else{
    return appReducer(state, action);
  }
}

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;