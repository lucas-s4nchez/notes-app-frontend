import { createSlice } from "@reduxjs/toolkit";
import { IUiInitialState } from "../../interfaces";

const initialState: IUiInitialState = {
  isModalOpen: false,
  isDarkTheme: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    onOpenModal: (state) => {
      state.isModalOpen = true;
    },
    onCloseModal: (state) => {
      state.isModalOpen = false;
    },
    onChangeTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const { onOpenModal, onCloseModal, onChangeTheme } = uiSlice.actions;
