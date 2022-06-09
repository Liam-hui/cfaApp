import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootState, AppThunk } from '@/store';
import { checkJwtApi, getAdApi, resend2FAApi, signInApi, signOutApi, verifyApi } from './api';

export interface AuthState {
  status: 'notReady' | 'idle' | 'loading' | 'success' | 'failed' | 'pending';
  verifyStatus: 'idle' | 'loading' | 'success' | 'failed';
  resendStatus: 'idle' | 'loading' | 'success' | 'failed';
  jwt: string | null;
  ad: any;
  errorMsg?: string
}

const initialState: AuthState = {
  status: 'idle',
  verifyStatus: 'idle',
  resendStatus: 'idle',
  jwt: null,
  ad: null,
  errorMsg: undefined,
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
    await AsyncStorage.removeItem('jwt');
    const response = await signOutApi();
    return response;
  }
);

export const verify = createAsyncThunk(
  'auth/verify',
  async (code: string) => {
    const response = await verifyApi(code);
    return response;
  }
);

export const resend2FA = createAsyncThunk(
  'auth/resend2FA',
  async () => {
    const response = await resend2FAApi();
    return response;
  }
);

export const resetAuth = createAsyncThunk(
  'auth/resetAuth',
  async () => {
    await AsyncStorage.removeItem('jwt');
    return;
  }
);

export const initAuth = createAsyncThunk(
  'auth/initAuth',
  async () => {
    const jwt = await AsyncStorage.getItem('jwt');
    if (jwt) {
      return await checkJwtApi();
    }
    else {
      return {
        isSuccess: false
      }
    }
  }
);

export const getAd = createAsyncThunk(
  'auth/getAd',
  async () => {
    const response = await getAdApi();
    return response;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAd: (state) => {
      state.ad = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
        state.errorMsg = undefined;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        if (action.payload.isSuccess) {
          state.status = "pending";
          state.jwt = action.payload.jwt;
        }
        else {
          state.status = "failed";
          state.errorMsg = action.payload.errorMsg;
        }
      })
      .addCase(resend2FA.pending, (state) => {
        state.resendStatus = "loading";
      })
      .addCase(resend2FA.fulfilled, (state, action) => {
        if (action.payload.isSuccess) {
          state.resendStatus = "success";
          state.errorMsg = undefined;
        }
        else {
          state.resendStatus = "failed";
          state.errorMsg = action.payload.errorMsg ?? "Try Again";
        }
      })
      .addCase(verify.pending, (state) => {
        state.verifyStatus = 'loading';
        state.errorMsg = undefined;
      })
      .addCase(verify.fulfilled, (state, action) => {
        if (action.payload.isSuccess) {
          state.verifyStatus = "idle";
          state.status = "success";
          state.errorMsg = undefined;
        }
        else {
          state.verifyStatus = "failed";
          state.errorMsg = action.payload.errorMsg ?? "Try Again";
        }
      })
      .addCase(verify.rejected, (state, action) => {
        state.verifyStatus = "failed";
        state.errorMsg = "Try Again";
      })
      .addCase(signOut.fulfilled, (state, action) => {
        if (action.payload.isSuccess) {
          state.status = "idle";
          state.jwt = null;
          state.ad = null;
        }
      })
      .addCase(resetAuth.fulfilled, (state) => {
        state.status = 'idle';
        state.verifyStatus = 'idle';
        state.resendStatus = 'idle';
        state.jwt = null;
        state.errorMsg = undefined;
      })
      .addCase(initAuth.pending, (state) => {
        state.status = "notReady";
        state.verifyStatus = "idle";
        state.resendStatus = "idle";
        state.errorMsg = undefined;
      })
      .addCase(initAuth.fulfilled, (state, action) => {
        if (action.payload.isSuccess) {
          state.status = "success";
        }
        else {
          state.status = "idle";
        }
        state.errorMsg = undefined;
      })
      .addCase(getAd.fulfilled, (state, action) => {
        if (action.payload.isSuccess) {
          state.ad = action.payload.data;
        }
      });
  },
});

export const { clearAd } = authSlice.actions;

export default authSlice.reducer;
