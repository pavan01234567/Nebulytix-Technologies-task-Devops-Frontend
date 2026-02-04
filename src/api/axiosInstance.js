
import axios from "axios";
import { BACKEND_BASE_URL } from "./config";
import { clearAuth, refreshToken } from "../store/authSlice";

let reduxStore = null;

export const injectStore = (store) => {
  reduxStore = store;
};

const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let queue = [];

const processQueue = (error, token = null) => {
  queue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  queue = [];
};

// REQUEST
axiosInstance.interceptors.request.use(
  (config) => {
    const token = reduxStore?.getState()?.auth?.accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response || !originalRequest) {
      return Promise.reject(error);
    }

    // ❗ NO SPECIAL LOGOUT HANDLING (fixed)
    // ❗ DO NOT block logout request
    // ❗ LET logout proceed normally

    if ((error.response.status === 401 || error.response.status === 403) &&
        !originalRequest._retry) {

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const newToken = await reduxStore.dispatch(refreshToken()).unwrap();
        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);

      } catch (refreshErr) {
        processQueue(refreshErr, null);
        reduxStore.dispatch(clearAuth());
        window.location.href = "/login";
        console.warn("Refresh token failed, letting app handle auth state");
        return Promise.reject(refreshErr);

      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
