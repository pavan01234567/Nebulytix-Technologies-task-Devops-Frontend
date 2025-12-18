//src/store/userListsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

/* =======================
   ASYNC THUNKS
======================= */


// ADMINS
export const fetchAdmins = createAsyncThunk(
  "userLists/fetchAdmins",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/admin/fetch/admin");
      return res.data.data; // ResponseMessage<List<AdminProfileDto>>
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch admins"
      );
    }
  }
);

// MANAGERS
export const fetchManagers = createAsyncThunk(
  "userLists/fetchManagers",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/admin/fetch/manager");
      return res.data.data; // List<EmployeeProfileDto>
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch managers"
      );
    }
  }
);

// HRs
export const fetchHrs = createAsyncThunk(
  "userLists/fetchHrs",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/admin/fetch/hr");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch HRs"
      );
    }
  }
);

// EMPLOYEES
export const fetchEmployees = createAsyncThunk(
  "userLists/fetchEmployees",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/admin/fetch/employee");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch employees"
      );
    }
  }
);

// CLIENTS
export const fetchClients = createAsyncThunk(
  "userLists/fetchClients",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/admin/fetch/clients");
      return res.data.data; // List<ClientProfileDto>
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch clients"
      );
    }
  }
);

/* =======================
   SLICE
======================= */

const userListsSlice = createSlice({
  name: "userLists",
  initialState: {
    admins: [],
    managers: [],
    hrs: [],
    employees: [],
    clients: [],

    loading: false,
    error: null,
    lastFetched: null,
  },

  reducers: {
    clearUserListsError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ========= ADMINS ========= */
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload;
        state.lastFetched = "admins";
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ========= MANAGERS ========= */
      .addCase(fetchManagers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchManagers.fulfilled, (state, action) => {
        state.loading = false;
        state.managers = action.payload;
        state.lastFetched = "managers";
      })
      .addCase(fetchManagers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ========= HR ========= */
      .addCase(fetchHrs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHrs.fulfilled, (state, action) => {
        state.loading = false;
        state.hrs = action.payload;
        state.lastFetched = "hrs";
      })
      .addCase(fetchHrs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ========= EMPLOYEE ========= */
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
        state.lastFetched = "employees";
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ========= CLIENT ========= */
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
        state.lastFetched = "clients";
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserListsError } = userListsSlice.actions;
export default userListsSlice.reducer;
