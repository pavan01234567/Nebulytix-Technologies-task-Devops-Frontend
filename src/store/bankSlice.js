//src/store/bankSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../api/axiosInstance";

// /* ================= FETCH BANK ================= */

// export const fetchEmployeeBank = createAsyncThunk(
//   "bank/fetchEmployeeBank",
//   async (employeeId, thunkAPI) => {
//     try {
//       const res = await axiosInstance.get(
//         `/employee/get/${employeeId}/bank-detail`
//       );
//       return res.data.data;
//     } catch (err) {
//       if (err.response?.status === 404) return null;
//       return thunkAPI.rejectWithValue("Failed to fetch bank details");
//     }
//   }
// );

// /* ================= ADD BANK ================= */

// export const addEmployeeBank = createAsyncThunk(
//   "bank/addEmployeeBank",
//   async ({ employeeId, payload }, thunkAPI) => {
//     try {
//       const res = await axiosInstance.post(
//         `/hr/add/bank-details/${employeeId}`,
//         payload
//       );
//       return res.data.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue("Failed to add bank details");
//     }
//   }
// );

// /* ================= UPDATE BANK ================= */

// export const updateEmployeeBank = createAsyncThunk(
//   "bank/updateEmployeeBank",
//   async ({ employeeId, payload }, thunkAPI) => {
//     try {
//       const res = await axiosInstance.put(
//         `/hr/update/${employeeId}/bank-details`,
//         payload
//       );
//       return res.data.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue("Failed to update bank details");
//     }
//   }
// );

// const bankSlice = createSlice({
//   name: "bank",
//   initialState: {
//     loading: false,
//     error: null,
//     bank: null,
//   },
//   reducers: {
//     clearBankState: (state) => {
//       state.bank = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchEmployeeBank.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchEmployeeBank.fulfilled, (state, action) => {
//         state.loading = false;
//         state.bank = action.payload;
//       })
//       .addCase(fetchEmployeeBank.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(addEmployeeBank.fulfilled, (state, action) => {
//         state.bank = action.payload;
//       })
//       .addCase(updateEmployeeBank.fulfilled, (state, action) => {
//         state.bank = action.payload;
//       });
//   },
// });

// export const { clearBankState } = bankSlice.actions;
// export default bankSlice.reducer;
  
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../api/axiosInstance";

// /* ================= FETCH BANK ================= */

// export const fetchEmployeeBank = createAsyncThunk(
//   "bank/fetchEmployeeBank",
//   async (employeeId, thunkAPI) => {
//     try {
//       const res = await axiosInstance.get(
//         `/employee/get/${employeeId}/bank-detail`
//       );
//       return res.data.data;
//     } catch (err) {
//       if (err.response?.status === 404) return null;
//       return thunkAPI.rejectWithValue("Failed to fetch bank details");
//     }
//   }
// );

// /* ================= ADD BANK ================= */

// export const addEmployeeBank = createAsyncThunk(
//   "bank/addEmployeeBank",
//   async ({ employeeId, payload }, thunkAPI) => {
//     try {
//       const res = await axiosInstance.post(
//         `/hr/add/bank-details/${employeeId}`,
//         payload
//       );
//       return res.data.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue("Failed to add bank details");
//     }
//   }
// );

// /* ================= UPDATE BANK ================= */

// export const updateEmployeeBank = createAsyncThunk(
//   "bank/updateEmployeeBank",
//   async ({ employeeId, payload }, thunkAPI) => {
//     try {
//       const res = await axiosInstance.put(
//         `/hr/update/${employeeId}/bank-details`,
//         payload
//       );
//       return res.data.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue("Failed to update bank details");
//     }
//   }
// );

// const bankSlice = createSlice({
//   name: "bank",
//   initialState: {
//     loading: false,
//     error: null,
//     bank: null,
//   },
//   reducers: {
//     clearBankState: (state) => {
//       state.bank = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchEmployeeBank.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchEmployeeBank.fulfilled, (state, action) => {
//         state.loading = false;
//         state.bank = action.payload;
//       })
//       .addCase(fetchEmployeeBank.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(addEmployeeBank.fulfilled, (state, action) => {
//         state.bank = action.payload;
//       })
//       .addCase(updateEmployeeBank.fulfilled, (state, action) => {
//         state.bank = action.payload;
//       });
//   },
// });

// export const { clearBankState } = bankSlice.actions;
// export default bankSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

/* ================= FETCH BANK ================= */
export const fetchEmployeeBank = createAsyncThunk(
  "bank/fetchEmployeeBank",
  async (employeeId, thunkAPI) => {
    try {
      // Ensure employeeId is valid
      const numericId = Number(employeeId);
      if (!numericId || numericId <= 0) throw new Error("Invalid employee ID");

      const token = localStorage.getItem("token"); // Get auth token if needed
      const res = await axiosInstance.get(
        `/employee/get/${numericId}/bank-detail`,
        {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        }
      );

      // If bank details exist, return them
      return res.data.data || null;
    } catch (err) {
      console.error("Fetch bank error:", err.response?.status, err.response?.data);

      if (err.response?.status === 404) return null; // No bank details found
      if (err.response?.status === 403)
        return thunkAPI.rejectWithValue("Access forbidden");
      if (err.response?.status === 400)
        return thunkAPI.rejectWithValue("Bad request");

      return thunkAPI.rejectWithValue(err.message || "Failed to fetch bank details");
    }
  }
);

/* ================= ADD BANK ================= */
export const addEmployeeBank = createAsyncThunk(
  "bank/addEmployeeBank",
  async ({ employeeId, payload }, thunkAPI) => {
    try {
      const numericId = Number(employeeId);
      if (!numericId || numericId <= 0) throw new Error("Invalid employee ID");

      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(
        `/hr/add/bank-details/${numericId}`,
        payload,
        {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        }
      );

      return res.data.data;
    } catch (err) {
      console.error("Add bank error:", err.response?.status, err.response?.data);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add bank details"
      );
    }
  }
);

/* ================= UPDATE BANK ================= */
export const updateEmployeeBank = createAsyncThunk(
  "bank/updateEmployeeBank",
  async ({ employeeId, payload }, thunkAPI) => {
    try {
      const numericId = Number(employeeId);
      if (!numericId || numericId <= 0) throw new Error("Invalid employee ID");

      const token = localStorage.getItem("token");
      const res = await axiosInstance.put(
        `/hr/update/${numericId}/bank-details`,
        payload,
        {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        }
      );

      return res.data.data;
    } catch (err) {
      console.error("Update bank error:", err.response?.status, err.response?.data);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update bank details"
      );
    }
  }
);

/* ================= BANK SLICE ================= */
const bankSlice = createSlice({
  name: "bank",
  initialState: {
    loading: false,
    error: null,
    bank: null,
    status: "idle", // idle | loading | succeeded | failed
  },
  reducers: {
    clearBankState: (state) => {
      state.bank = null;
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      /* ===== FETCH ===== */
      .addCase(fetchEmployeeBank.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchEmployeeBank.fulfilled, (state, action) => {
        state.loading = false;
        state.bank = action.payload; // null if no details
        state.status = "succeeded";
      })
      .addCase(fetchEmployeeBank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      })

      /* ===== ADD ===== */
      .addCase(addEmployeeBank.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(addEmployeeBank.fulfilled, (state, action) => {
        state.loading = false;
        state.bank = action.payload;
        state.status = "succeeded";
      })
      .addCase(addEmployeeBank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      })

      /* ===== UPDATE ===== */
      .addCase(updateEmployeeBank.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateEmployeeBank.fulfilled, (state, action) => {
        state.loading = false;
        state.bank = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateEmployeeBank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { clearBankState } = bankSlice.actions;
export default bankSlice.reducer;
