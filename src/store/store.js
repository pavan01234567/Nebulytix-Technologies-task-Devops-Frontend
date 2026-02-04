import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import adminReducer from "./adminSlice";
import hrReducer from "./hrSlice";
import employeeReducer from "./employeeSlice";
import managerReducer from "./managerSlice";
import clientReducer from "./clientSlice";
import userManagementReducer from "./userManagementSlice";
import userListsReducer from "./userListsSlice";
import hrEmployeeReducer from "./hrEmployeeSlice";
import projectReducer from "./projectSlice";
import salaryReducer from "./salarySlice";
import bankReducer from "./bankSlice";
import attendanceReducer from "./attendanceSlice";
import employeeProjectReducer from "./employeeProjectSlice";
import notificationReducer from "./notificationSlice";
import jobReducer from "./jobSlice"; // ✅ NEW

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

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // keep as-is
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
  hrEmployee: hrEmployeeReducer,
  project: projectReducer,
  salary: salaryReducer,
  bank: bankReducer,
  attendance: attendanceReducer,
  employeeProject: employeeProjectReducer,
  notification: notificationReducer,
  jobs: jobReducer, // ✅ NEW
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
          REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store); 