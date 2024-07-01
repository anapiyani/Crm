import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TModalState = {
  isOpen: boolean;
};

const initialState: TModalState = {
  isOpen: false,
};

const modaSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modaSlice.actions;
export default modaSlice.reducer;
