import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editTodo: null,
  isAddOpen: false,
  isEditOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openAddModal: (state) => {
      state.isAddOpen = true;
    },
    closeAddModal: (state) => {
      state.isAddOpen = false;
    },
    openEditModal: (state, action) => {
      state.isEditOpen = true;
      state.editTodo = action.payload;
    },
    closeEditModal: (state) => {
      state.isEditOpen = false;
      state.editTodo = null;
    },
  },
});

export const { openAddModal, closeAddModal, openEditModal, closeEditModal } =
  modalSlice.actions;

export default modalSlice.reducer;
