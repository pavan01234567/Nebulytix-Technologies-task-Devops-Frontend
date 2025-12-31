import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// FETCH TODAY'S ATTENDANCE
export const fetchTodayAttendance = createAsyncThunk(
  "attendance/fetchToday",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/employee/attendance/today");
      return res.data.data; // EmployeeDTO
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch attendance"
      );
    }
  }
);

// CLOCK IN
export const clockIn = createAsyncThunk(
  "attendance/clockIn",
  async (employeeId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/employee/webclockin/${employeeId}`);
      return res.data.data; // EmployeeDTO
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Clock in failed"
      );
    }
  }
);

// CLOCK OUT
export const clockOut = createAsyncThunk(
  "attendance/clockOut",
  async (employeeId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/employee/webclockout/${employeeId}`);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Clock out failed"
      );
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    record: null, // EmployeeDTO
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchTodayAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodayAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.record = action.payload;
      })
      .addCase(fetchTodayAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CLOCK IN
      .addCase(clockIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(clockIn.fulfilled, (state, action) => {
        state.loading = false;
        state.record = action.payload;
      })
      .addCase(clockIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CLOCK OUT
      .addCase(clockOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(clockOut.fulfilled, (state, action) => {
        state.loading = false;
        state.record = action.payload;
      })
      .addCase(clockOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default attendanceSlice.reducer;
