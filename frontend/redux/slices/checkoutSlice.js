import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createCheckout = createAsyncThunk(
    "checkout/createCheckout",
    async (checkoutData, { rejectWithValue }) => { // Remove the destructuring
      try {
        const token = localStorage.getItem("userToken");
        
        if (!token) {
          return rejectWithValue({ message: "No authentication token found" });
        }
  
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
          checkoutData, // Send data directly
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        return response.data;
      } catch (err) {
        console.log("Checkout error:", err);
        return rejectWithValue(err.response?.data || { message: err.message });
      }
    }
  );

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: null,
    loading: false,
    error: null
  },
  reducers: {
    clearCheckout: (state) => {
      state.checkout = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.checkout = action.payload;
        state.loading = false;
      })
      .addCase(createCheckout.rejected, (state, action) => {
        console.log("Checkout rejected:", action.payload);
        
        if (action.payload?.status === 401) {
            state.error = "Please log in again";
        } else {
            state.error = action.payload?.message || "Failed to create checkout";
        }
        state.loading = false;
    })
  }
});

export const { clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;