import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api";

const initialState = {
  status: "idle",
  error: null,
  data: null,
};

// ***** Async Thunks *****
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await api.get({ endpoint: "/user" });
  return response;
});

export const registerUser = createAsyncThunk(
  "/user/registerUser",
  async body => {
    const response = await api.post({ endpoint: "/user/register", body });
    if (!response.error) localStorage.setItem("token", response.token);

    return response;
  }
);

export const loginUser = createAsyncThunk("user/loginUser", async body => {
  const response = await api.post({ endpoint: "/user/login", body });
  if (!response.error) localStorage.setItem("token", response.token);
  return response;
});

export const logoutUser = createAsyncThunk("user/logoutUser", () => {
  localStorage.removeItem("token");
});

// ***** Slice *****
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: state => {
      state.status = "loading";
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },

    [registerUser.pending]: state => {
      state.status = "loading";
    },
    [registerUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },

    [loginUser.pending]: state => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },

    [logoutUser.fulfilled]: state => {
      state.status = "idle";
      state.data = null;
    },
  },
});

export default userSlice.reducer;

export const selectUser = state => state.user.data;
