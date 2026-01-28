import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

/* ================= EMPLOYEE PROJECTS ================= */
export const fetchEmployeeProjects = createAsyncThunk(
  "employeeProject/fetchEmployeeProjects",
  async (employeeId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `/employee/listProj/${employeeId}`
      );
      return res.data.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch projects");
    }
  }
);

/* ================= ALL PROJECTS (ADMIN) ================= */
export const fetchAllProjects = createAsyncThunk(
  "employeeProject/fetchAllProjects",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/admin/projects");
      return res.data.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch all projects");
    }
  }
);

/* ================= ASSIGN PROJECT ================= */
export const assignProjectToEmployee = createAsyncThunk(
  "employeeProject/assignProject",
  async ({ projectId, employeeId }, thunkAPI) => {
    try {
      await axiosInstance.post(
        `/admin/add/project/${projectId}/employees/${employeeId}`
      );
      return true;
    } catch {
      return thunkAPI.rejectWithValue("Failed to assign project");
    }
  }
);

const employeeProjectSlice = createSlice({
  name: "employeeProject",
  initialState: {
    loading: false,
    oldProjects: [],
    allProjects: [],
    error: null,
    success: false,
  },
  reducers: {
    clearProjectStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeProjects.fulfilled, (state, action) => {
        state.oldProjects = action.payload || [];
      })
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.allProjects = action.payload || [];
      })
      .addCase(assignProjectToEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(assignProjectToEmployee.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(assignProjectToEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProjectStatus } = employeeProjectSlice.actions;
export default employeeProjectSlice.reducer;
