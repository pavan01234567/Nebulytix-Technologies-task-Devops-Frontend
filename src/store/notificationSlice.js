import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// FETCH HR NOTIFICATIONS
export const fetchHRNotifications = createAsyncThunk(
  "notification/fetchHR",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/hr/notifications");
      return res.data; // List<Notification>
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch notifications"
      );
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHRNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHRNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchHRNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default notificationSlice.reducer;
