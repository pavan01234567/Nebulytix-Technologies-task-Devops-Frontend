import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

/* ================= ADD ADMIN ================= */
export const addAdmin = createAsyncThunk(
  "userManagement/addAdmin",
  async (payload, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        "/admin/create-admin",
        payload
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to create admin"
      );
    }
  }
);

/* ================= ADD EMPLOYEE / HR / MANAGER ================= */
export const addEmployee = createAsyncThunk(
  "userManagement/addEmployee",
  async (payload, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        "/admin/create-employee",
        payload
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to create user"
      );
    }
  }
);

/* ================= ADD CLIENT ================= */
export const addClient = createAsyncThunk(
  "userManagement/addClient",
  async (payload, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        "/admin/create-client",
        payload
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to create client"
      );
    }
  }
);

/* ================= SLICE ================= */
const userManagementSlice = createSlice({
  name: "userManagement",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ADMIN */
      .addCase(addAdmin.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(addAdmin.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* EMPLOYEE / HR / MANAGER */
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(addEmployee.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* CLIENT */
      .addCase(addClient.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(addClient.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStatus } = userManagementSlice.actions;
export default userManagementSlice.reducer;
