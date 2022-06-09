import { createSlice } from '@reduxjs/toolkit';

export interface DialogState {
  isVisible: boolean;
  message?: string;
  confirm?: any, 
  confirmText?: string, 
  cancel?: any, 
  cancelText?: string 
  hideCancel?: boolean;
}

const initialState: DialogState = {
  isVisible: false,
  message: undefined,
  confirm: undefined,
  confirmText: undefined,
  cancel: undefined,
  cancelText: undefined,
  hideCancel: undefined
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    showDialog: (state, { payload }) => {
      const { message, confirm, confirmText, cancel, cancelText, hideCancel } = payload;
      state.isVisible = true;
      state.message = message;
      state.confirm = confirm;
      state.confirmText = confirmText;
      state.cancel = cancel;
      state.cancelText = cancelText;
      state.hideCancel = hideCancel;
    },
    hideDialog: (state) => {
      state.isVisible = false;
      state.message = undefined;
      state.confirm = undefined;
      state.confirmText = undefined;
      state.cancel = undefined;
      state.cancelText = undefined;
      state.hideCancel = undefined;
    }
  },
});

export const { showDialog, hideDialog } = dialogSlice.actions;

export default dialogSlice.reducer;