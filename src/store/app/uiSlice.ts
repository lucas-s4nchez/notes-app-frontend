import { createSlice } from "@reduxjs/toolkit";
import { IUiInitialState } from "../../interfaces";

const initialState: IUiInitialState = {
  isVisiblePassword: false,
  isModalOpen: false,
  isDarkTheme: false,
  errorMessage: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    onChangePasswordVisibility: (state) => {
      state.isVisiblePassword = !state.isVisiblePassword;
    },
    onOpenModal: (state) => {
      state.isModalOpen = true;
    },
    onCloseModal: (state) => {
      state.isModalOpen = false;
    },
    onChangeTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
    hasError: (state, { payload }) => {
      state.errorMessage = payload;
    },
    onClearError: (state) => {
      state.errorMessage = null;
    },
  },
});

export const {
  onChangePasswordVisibility,
  onOpenModal,
  onCloseModal,
  onChangeTheme,
  hasError,
  onClearError,
} = uiSlice.actions;
