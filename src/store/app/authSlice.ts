import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { api } from "../";
import { IUserInitialState } from "../../interfaces";

const initialState: IUserInitialState = {
  status: "checking",
  user: {},
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.token = null;
    },
    onLogin: (
      state,
      action: PayloadAction<{ uid: string; username: string; token: string }>
    ) => {
      const { uid, username, token } = action.payload;
      localStorage.setItem("token", token);
      state.status = "authenticated";
      state.user = { uid, username };
      state.token = token;
    },
    onLogout: (state) => {
      localStorage.clear();
      state.status = "not-authenticated";
      state.user = {};
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.login.matchPending, (state) => {
        state.status = "checking";
        state.user = {};
        state.token = null;
      })
      .addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
        const { uid, username, token } = payload;
        localStorage.setItem("token", token);
        state.status = "authenticated";
        state.user = { uid, username };
        state.token = token;
      })
      .addMatcher(api.endpoints.login.matchRejected, (state) => {
        localStorage.clear();
        state.status = "not-authenticated";
        state.user = {};
        state.token = null;
      })
      .addMatcher(api.endpoints.register.matchPending, (state) => {
        state.status = "checking";
        state.user = {};
        state.token = null;
      })
      .addMatcher(
        api.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          const { uid, username, token } = payload;
          localStorage.setItem("token", token);
          state.status = "authenticated";
          state.user = { uid, username };
          state.token = token;
        }
      )
      .addMatcher(api.endpoints.register.matchRejected, (state) => {
        localStorage.clear();
        state.status = "not-authenticated";
        state.user = {};
        state.token = null;
      })
      .addMatcher(api.endpoints.refeshToken.matchPending, (state) => {
        state.status = "checking";
        state.user = {};
        state.token = null;
      })
      .addMatcher(
        api.endpoints.refeshToken.matchFulfilled,
        (state, { payload }) => {
          const { uid, username, token } = payload;
          localStorage.setItem("token", token);
          state.status = "authenticated";
          state.user = { uid, username };
          state.token = token;
        }
      )
      .addMatcher(api.endpoints.refeshToken.matchRejected, (state) => {
        localStorage.clear();
        state.status = "not-authenticated";
        state.user = {};
        state.token = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout } = authSlice.actions;
