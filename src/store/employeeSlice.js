// //src/store/employeeSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../api/axiosInstance";

// /* ================= FETCH EMPLOYEES (HR) ================= */

// export const fetchEmployeeProfile = createAsyncThunk(
//   "employee/fetchProfile",
//   async ( status = "active", thunkAPI) => {
//     try {
//       const res = await axiosInstance.get(`/hr/getEmpList?status=${status}`);
//       return res.data.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to load employee profile");
//     }
//   }
// );

// // -----------------ENABLE EMPLOYEE (HR ACTION)------------------------
// export const enableEmployee = createAsyncThunk(
//   "employee/enable",
//   async (empId, thunkAPI) => {
//     try {
//       // const res = await axiosInstance.put(`/hr/emp/${empId}/enable`);
//       await axiosInstance.put(`/hr/emp/${empId}/enable`);
//       // thunkAPI.dispatch(fetchEmployees("active")); // ✅ refresh list
//       return { id: empId, empStatus: "active" };

//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || "Enable failed"
//       );
//     }
//   }
// );

// /* ================= DISABLE EMPLOYEE ================= */

// // DISABLE EMPLOYEE (HR ACTION)
// export const disableEmployee = createAsyncThunk(
//   "employee/disable",
//   async (empId, thunkAPI) => {
//     try {
//       // const res = await axiosInstance.put(`/hr/emp/${empId}/disable`);
//       await axiosInstance.put(`/hr/emp/${empId}/disable`);
//       // thunkAPI.dispatch(fetchEmployees("active")); // ✅ refresh list
//       return { id: empId, empStatus: "inactive" }; // 👈 MANUAL SUCCESS
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || "Disable failed"
//       );
//     }
//   }
// );


// /* ================= SLICE ================= */
// const employeeSlice = createSlice({
//   name: "employee",
//   initialState: { profile: null, loading: false, error: null },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchEmployeeProfile.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchEmployeeProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.profile = action.payload;
//       })
//       .addCase(fetchEmployeeProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default employeeSlice.reducer;

//src/store/employeeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const fetchEmployeeProfile = createAsyncThunk(
  "employee/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/employee/me");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to load employee profile");
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: { profile: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployeeProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchEmployeeProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;