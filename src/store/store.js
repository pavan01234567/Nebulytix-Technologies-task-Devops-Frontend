import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "./adminSlice";
import hrReducer from "./hrSlice";
import employeeReducer from "./employeeSlice";
import managerReducer from "./managerSlice";
import clientReducer from "./clientSlice";
import userManagementReducer from "./userManagementSlice";
import userListsReducer from "./userListsSlice";


import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  hr: hrReducer,
  employee: employeeReducer,
  manager: managerReducer,
  client: clientReducer,
  userManagement: userManagementReducer,
  userLists: userListsReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER, // redux-persist internal non-serializable action
        ],
      },
    }),
});

export const persistor = persistStore(store);
