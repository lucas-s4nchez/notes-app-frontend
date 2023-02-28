import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { notesApi } from "../";
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
      .addMatcher(notesApi.endpoints.login.matchPending, (state) => {
        state.status = "checking";
        state.user = {};
        state.token = null;
      })
      .addMatcher(
        notesApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          const { uid, username, token } = payload;
          localStorage.setItem("token", token);
          state.status = "authenticated";
          state.user = { uid, username };
          state.token = token;
        }
      )
      .addMatcher(notesApi.endpoints.login.matchRejected, (state) => {
        localStorage.clear();
        state.status = "not-authenticated";
        state.user = {};
        state.token = null;
      })
      .addMatcher(notesApi.endpoints.register.matchPending, (state) => {
        state.status = "checking";
        state.user = {};
        state.token = null;
      })
      .addMatcher(
        notesApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          const { uid, username, token } = payload;
          localStorage.setItem("token", token);
          state.status = "authenticated";
          state.user = { uid, username };
          state.token = token;
        }
      )
      .addMatcher(notesApi.endpoints.register.matchRejected, (state) => {
        localStorage.clear();
        state.status = "not-authenticated";
        state.user = {};
        state.token = null;
      })
      .addMatcher(notesApi.endpoints.refeshToken.matchPending, (state) => {
        state.status = "checking";
        state.user = {};
        state.token = null;
      })
      .addMatcher(
        notesApi.endpoints.refeshToken.matchFulfilled,
        (state, { payload }) => {
          const { uid, username, token } = payload;
          localStorage.setItem("token", token);
          state.status = "authenticated";
          state.user = { uid, username };
          state.token = token;
        }
      )
      .addMatcher(notesApi.endpoints.refeshToken.matchRejected, (state) => {
        localStorage.clear();
        state.status = "not-authenticated";
        state.user = {};
        state.token = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout } = authSlice.actions;
