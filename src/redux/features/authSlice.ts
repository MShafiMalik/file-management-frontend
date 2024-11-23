import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TUser = {
  _id: string;
  name: string;
  email: string;
};

export type TAuthState = {
  isAuthenticated: boolean;
  user: TUser | null;
  token: string | null;
};

const initialState: TAuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const getAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
