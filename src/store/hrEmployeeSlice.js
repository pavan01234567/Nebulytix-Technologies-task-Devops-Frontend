//src/store/hrEmployeeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

/* ================= HR ADD EMPLOYEE ================= */

export const hrAddEmployee = createAsyncThunk(
  "hrEmployee/addEmployee",
  async (payload, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        "/hr/create-employee",
        payload
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add employee"
      );
    }
  }
);

/* ================= FETCH EMPLOYEES (HR) ================= */

export const fetchHrEmployees = createAsyncThunk(
  "hrEmployee/fetchEmployees",
  async (status = "active", thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `/hr/getEmpList?status=${status}`
      );
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch employees"
      );
    }
  }
);

/* ================= ENABLE EMPLOYEE ================= */

export const enableEmployee = createAsyncThunk(
  "hrEmployee/enable",
  async (empId, thunkAPI) => {
    try {
      await axiosInstance.put(`/hr/emp/${empId}/enable`);
      return empId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Enable failed"
      );
    }
  }
);

/* ================= DISABLE EMPLOYEE ================= */

export const disableEmployee = createAsyncThunk(
  "hrEmployee/disable",
  async (empId, thunkAPI) => {
    try {
      await axiosInstance.put(`/hr/emp/${empId}/disable`);
      return empId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Disable failed"
      );
    }
  }
);

/* ================= SLICE ================= */

const hrEmployeeSlice = createSlice({
  name: "hrEmployee",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearHrStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
     // FETCH
      .addCase(fetchHrEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHrEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchHrEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ADDEmployee
      .addCase(hrAddEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(hrAddEmployee.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(hrAddEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ENABLE
      .addCase(enableEmployee.fulfilled, (state, action) => {
        const emp = state.employees.find(e => e.id === action.payload);
        if (emp) emp.empStatus = "active";
      })

      // DISABLE
      .addCase(disableEmployee.fulfilled, (state, action) => {
        const emp = state.employees.find(e => e.id === action.payload);
        if (emp) emp.empStatus = "inactive";
      });
  },
});

export const { clearHrStatus } = hrEmployeeSlice.actions;
export default hrEmployeeSlice.reducer;
