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

// APPLY WFH
export const applyWFH = createAsyncThunk(
  "attendance/applyWFH",
  async (payload, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        "/employee/apply-wfh",
        payload
      );
      return res.data.data; // EmployeeLeaveDTO
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "WFH apply failed"
      );
    }
  }
);

// APPLY LEAVE
export const applyLeave = createAsyncThunk(
  "attendance/applyLeave",
  async (payload, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        "/employee/apply-leave",
        payload
      );
      return res.data.data; // EmployeeLeaveDTO
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Leave apply failed"
      );
    }
  }
);



const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    record: null, // EmployeeDTO
    wfh: null, // EmployeeLeaveDTO
    leave: null,
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
      })

      // APPLY WFH
      .addCase(applyWFH.pending, (state) => {
        state.loading = true;
    })
      .addCase(applyWFH.fulfilled, (state, action) => {
        state.loading = false;
        state.wfh = action.payload;
    })
      .addCase(applyWFH.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })

    // APPLY LEAVE
      .addCase(applyLeave.pending, (state) => {
        state.loading = true;
    })
      .addCase(applyLeave.fulfilled, (state, action) => {
        state.loading = false;
        state.leave = action.payload;
    })
      .addCase(applyLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });


  },
});

export default attendanceSlice.reducer;
