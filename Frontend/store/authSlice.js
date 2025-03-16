import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import axios from "axios";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PURGE } from "redux-persist";

const cookies = new Cookies();

// Async thunk to fetch user data
export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, { rejectWithValue }) => {
  try {
    const token = cookies.get("token");
    if (!token) {
      return rejectWithValue("No token found");
    }

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("User fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || "Failed to fetch user");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
    clearState: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      // Handle persistence clearing
      .addCase(PURGE, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      });
  },
});

export const { login, logout, clearState } = authSlice.actions;

export const handleLogin = (token) => (dispatch) => {
  cookies.set("token", token, {
    path: "/",
    expires: new Date(Date.now() + 2 * 60 * 60 * 1000), 
  });

  dispatch(login(token));
  dispatch(fetchUser());
};

export const handleLogout = () => (dispatch) => {
  cookies.remove("token", { path: "/" });
  dispatch(logout());
  dispatch(clearState()); 
};

export default authSlice.reducer;
