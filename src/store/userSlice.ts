import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { api } from "./apiSlice";

interface User {
  ok?: boolean;
  uid?: string;
  username?: string;
  token: string;
}

interface Note {
  _id?: string;
  title?: string;
  content?: string;
  data?: Date;
  user?: User;
}

export interface IUserInitialState {
  status: "checking" | "authenticated" | "not-authenticated";
  user: { username: string; uid: string } | {};
  activeNote: Note | null;
}

const initialState: IUserInitialState = {
  status: "checking",
  user: {},
  activeNote: null,
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
    onLogout: (state) => {
      state.status = "not-authenticated";
      state.user = {};
    },
    onSetActiveNote: (state, { payload }) => {
      state.activeNote = payload;
    },
    onClearActiveNote: (state) => {
      state.activeNote = null;
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
        localStorage.setItem("token", token!);
        state.status = "authenticated";
        state.user = { uid, username };
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
          localStorage.setItem("token", token!);
          state.status = "authenticated";
          state.user = { uid, username };
        }
      )
      .addMatcher(api.endpoints.register.matchRejected, (state) => {
        state.status = "not-authenticated";
        state.user = {};
      });
  },
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, onSetActiveNote } =
  userSlice.actions;

export default userSlice.reducer;
