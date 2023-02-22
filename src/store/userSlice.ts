import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { api } from "./apiSlice";

interface IErrorMessage {
  password?: { value: string; msg: string };
  email?: { value: string; msg: string };
  username?: { value: string; msg: string };
}

export interface IUserInitialState {
  status: "checking" | "authenticated" | "not-authenticated";
  user: { username: string; uid: string } | {};
}

const initialState: IUserInitialState = {
  status: "checking",
  user: {},
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
    },
    onLogin: (
      state,
      action: PayloadAction<{ uid: string; username: string }>
    ) => {
      state.status = "authenticated";
      state.user = action.payload;
    },
    onLogout: (state, action: PayloadAction<string>) => {
      state.status = "not-authenticated";
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.login.matchPending, (state) => {
        state.status = "checking";
        state.user = {};
      })
      .addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
        const { uid, username, token } = payload;
        state.status = "authenticated";
        state.user = { uid, username };
        localStorage.setItem("token", token!);
      })
      .addMatcher(api.endpoints.login.matchRejected, (state) => {
        state.status = "not-authenticated";
        state.user = {};
      })
      .addMatcher(api.endpoints.register.matchPending, (state) => {
        state.status = "checking";
        state.user = {};
      })
      .addMatcher(
        api.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          const { uid, username, token } = payload;
          state.status = "authenticated";
          state.user = { uid, username };
          localStorage.setItem("token", token!);
        }
      )
      .addMatcher(api.endpoints.register.matchRejected, (state) => {
        state.status = "not-authenticated";
        state.user = {};
      });
  },
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout } = userSlice.actions;

export default userSlice.reducer;
