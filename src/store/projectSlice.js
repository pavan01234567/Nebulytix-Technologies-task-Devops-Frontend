import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

/* =========================================================
   HELPER: Get Authorization Headers
   ========================================================= */
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // your JWT token
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/* =========================================================
   ADD PROJECT
   ========================================================= */
export const addProject = createAsyncThunk(
  "project/addProject",
  async ({ data, files }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );
      if (files?.quotation) formData.append("quotation", files.quotation);
      if (files?.requirement) formData.append("requirement", files.requirement);
      if (files?.contract) formData.append("contract", files.contract);

      const res = await axiosInstance.post("/admin/add/project", formData, {
        headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" },
      });
      return res.data.data || null;
    } catch (err) {
      console.error("Add project error:", err.response || err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add project"
      );
    }
  }
);

/* =========================================================
   CLIENT PROJECT LIST
   ========================================================= */
export const fetchClientProjects = createAsyncThunk(
  "project/fetchClientProjects",
  async (clientId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/admin/projects/client/${clientId}`, {
        headers: getAuthHeaders(),
      });
      return res.data.data || []; // ensures always an array
    } catch (err) {
      console.error("Fetch client projects error:", err.response || err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch client projects"
      );
    }
  }
);

/* =========================================================
   ALL PROJECTS
   ========================================================= */
export const fetchAllProjects = createAsyncThunk(
  "project/fetchAllProjects",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/admin/projects", {
        headers: getAuthHeaders(),
      });
      return res.data.data || [];
    } catch (err) {
      console.error("Fetch all projects error:", err.response || err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load projects"
      );
    }
  }
);

/* =========================================================
   PROJECT DETAILS
   ========================================================= */
export const fetchProjectById = createAsyncThunk(
  "project/fetchProjectById",
  async (projectId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/admin/project/${projectId}`, {
        headers: getAuthHeaders(),
      });
      return res.data.data || null;
    } catch (err) {
      console.error("Fetch project by ID error:", err.response || err);
      if (err.response?.status === 403)
        return thunkAPI.rejectWithValue("Access denied: Not authorized");
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load project"
      );
    }
  }
);

/* =========================================================
   DELETE PROJECT
   ========================================================= */
export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (projectId, thunkAPI) => {
    try {
      await axiosInstance.delete(`/admin/${projectId}`, {
        headers: getAuthHeaders(),
      });
      return projectId;
    } catch (err) {
      console.error("Delete project error:", err.response || err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete project"
      );
    }
  }
);

/* =========================================================
   UPDATE PROJECT STATUS
   ========================================================= */
export const updateProjectStatus = createAsyncThunk(
  "project/updateProjectStatus",
  async ({ projectId, status }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `/admin/${projectId}/status?status=${status}`,
        {},
        { headers: getAuthHeaders() }
      );
      return res.data.data || null;
    } catch (err) {
      console.error("Update project status error:", err.response || err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update status"
      );
    }
  }
);

/* =========================================================
   REMOVE EMPLOYEE FROM PROJECT
   ========================================================= */
export const removeEmployeeFromProject = createAsyncThunk(
  "project/removeEmployeeFromProject",
  async ({ projectId, employeeId }, thunkAPI) => {
    try {
      await axiosInstance.delete(
        `/admin/delete/${projectId}/employees/${employeeId}`,
        { headers: getAuthHeaders() }
      );
      return employeeId;
    } catch (err) {
      console.error("Remove employee error:", err.response || err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to remove employee"
      );
    }
  }
);

/* =========================================================
   SLICE
   ========================================================= */
const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    success: false,
    error: null,
    clientProjects: [],
    allProjects: [],
    selectedProject: null,
  },
  reducers: {
    clearProjectStatus(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    setSelectedProject(state, action) {
      state.selectedProject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ADD PROJECT
      .addCase(addProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addProject.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CLIENT PROJECTS
      .addCase(fetchClientProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.clientProjects = action.payload.map((p) => ({
          ...p,
          projectName: p.projectName || p.project_name || "Untitled Project",
        }));
      })
      .addCase(fetchClientProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ALL PROJECTS
      .addCase(fetchAllProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.allProjects = action.payload.map((p) => ({
          ...p,
          projectName: p.projectName || p.project_name || "Untitled Project",
        }));
      })
      .addCase(fetchAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // PROJECT DETAILS
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProject = {
          ...action.payload,
          projectName: action.payload?.projectName || action.payload?.project_name || "Untitled Project",
        };
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE PROJECT
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.allProjects = state.allProjects.filter((p) => p.id !== action.payload);
      })

      // UPDATE STATUS
      .addCase(updateProjectStatus.fulfilled, (state, action) => {
        state.selectedProject = {
          ...action.payload,
          projectName: action.payload?.projectName || action.payload?.project_name || "Untitled Project",
        };
      })

      // REMOVE EMPLOYEE
      .addCase(removeEmployeeFromProject.fulfilled, (state, action) => {
        if (state.selectedProject?.employees) {
          state.selectedProject.employees = state.selectedProject.employees.filter(
            (e) => e.id !== action.payload
          );
        }
      });
  },
});

/* =========================================================
   EXPORTS
   ========================================================= */
export const { clearProjectStatus, setSelectedProject } = projectSlice.actions;
export default projectSlice.reducer;
