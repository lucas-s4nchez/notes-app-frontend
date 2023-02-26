import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  isDarkTheme: false,
};

const uiSlice = createSlice({
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

export default uiSlice.reducer;
