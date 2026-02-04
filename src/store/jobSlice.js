import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import axios from "axios";
import { BACKEND_BASE_URL } from "../api/config";

// ================= THUNK =================
export const fetchAllJobs = createAsyncThunk(
  "jobs/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/hr/allJobs"); // primary admin endpoint
      console.log("Jobs API response:", response.data);
      return response.data.data;
    } catch (err) {
      // If admin endpoint is forbidden, fall back to public career jobs
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        try {
          const publicRes = await axios.get(`${BACKEND_BASE_URL}/career/jobs`);
          console.log("Fallback career jobs response:", publicRes.data);
          return publicRes.data.data || publicRes.data;
        } catch (publicErr) {
          return rejectWithValue(publicErr.response?.data || publicErr.message);
        }
      }

      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchJobById = createAsyncThunk(
  "jobs/fetchById",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/career/job/${jobId}`);
      console.log("Job detail API response:", response.data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ================= SLICE =================
const initialState = {
  jobs: [],
  selectedJob: null,
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobSlice.reducer;