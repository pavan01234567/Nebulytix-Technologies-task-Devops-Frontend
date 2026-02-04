// src/store/bankSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

/* ================= FETCH BANK ================= */
export const fetchEmployeeBank = createAsyncThunk(
  "bank/fetchEmployeeBank",
  async (employeeId, thunkAPI) => {
    try {
      const id = Number(employeeId);
      if (!id) throw new Error("Invalid employee id");

      const res = await axiosInstance.get(
        `/employee/get/${id}/bank-detail`
      );

      // backend returns object OR null (200 OK)
      return res.data.data ?? null;
    } catch (err) {
      if (err.response?.status === 403)
        return thunkAPI.rejectWithValue("Access denied");
      if (err.response?.status === 404)
        return thunkAPI.rejectWithValue("Employee not found");

      return thunkAPI.rejectWithValue("Failed to fetch bank details");
    }
  }
);

/* ================= ADD BANK ================= */
export const addEmployeeBank = createAsyncThunk(
  "bank/addEmployeeBank",
  async ({ employeeId, payload }, thunkAPI) => {
    try {
      const id = Number(employeeId);
      if (!id) throw new Error("Invalid employee id");

      const res = await axiosInstance.post(
        `/hr/add/bank-details/${id}`,
        payload
      );

      return res.data.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to add bank details");
    }
  }
);

/* ================= UPDATE BANK ================= */
export const updateEmployeeBank = createAsyncThunk(
  "bank/updateEmployeeBank",
  async ({ employeeId, payload }, thunkAPI) => {
    try {
      const id = Number(employeeId);
      if (!id) throw new Error("Invalid employee id");

      const res = await axiosInstance.put(
        `/hr/update/${id}/bank-details`,
        payload
      );

      return res.data.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to update bank details");
    }
  }
);

/* ================= SLICE ================= */
  const bankSlice = createSlice({
  name: "bank",
  initialState: {
    bank: null,            // object | null
    status: "idle",        // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearBankState: (state) => {
      state.bank = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ===== FETCH ===== */
      .addCase(fetchEmployeeBank.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchEmployeeBank.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bank = action.payload; // null OR object
      })
      .addCase(fetchEmployeeBank.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addEmployeeBank.fulfilled, (state, action) => {
        state.bank = action.payload;
        state.status = "succeeded";
      })

      /* ===== UPDATE ===== */
      .addCase(updateEmployeeBank.fulfilled, (state, action) => {
        state.bank = action.payload;
        state.status = "succeeded";
      });
  },
});

export const { clearBankState } = bankSlice.actions;
export default bankSlice.reducer;