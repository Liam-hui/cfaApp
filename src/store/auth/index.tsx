import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store';
import { signInApi, signOutApi } from './api';

export interface AuthState {
  status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: AuthState = {
  status: 'idle',
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string, password: string} ) => {
    const response = await signInApi(email, password);
    return response;
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async () => {
    const response = await signOutApi();
    return response;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        if (action.payload.isSuccess) {
          state.status = "success";
        }
        else {
          state.status = "failed";
        }
      })
      .addCase(signOut.fulfilled, (state, action) => {
        console.log(action);
        if (action.payload.isSuccess) {
          state.status = "idle";
        }
      });
  },
});

// export const { increment, decrement, incrementByAmount } = authSlice.actions;

export default authSlice.reducer;
