import api from '@/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function signInApi(email: string, password: string) {
  try {
    const response = await api.post('/', {}, {
      params : {
        rest_route: "/simple-jwt-login/v1/auth",
        email,
        password
      }
    });
    if (response.status == 200 && response.data.success) {
      await AsyncStorage.setItem('jwt', response.data.data.jwt);
      // send 2fa
      const send2FAResponse = await api.post('/wp-json/my-json/v1/mobile/resend2fa');
      if (send2FAResponse.status == 200 && response.data.success) {
        return {
          isSuccess: true,
          jwt: response.data.data.jwt
        }
      }
    }
    await AsyncStorage.removeItem('jwt');
    return {
      isSuccess: false
    }
  } catch (error: any) {
    await AsyncStorage.removeItem('jwt');
    return {
      isSuccess: false,
      errorMsg: error?.response?.data?.data?.message ?? "Try Again"
    }
  }
}

export async function verifyApi(code: string) {
  try {
    let body = new FormData();
    body.append("code", code);
    const response = await api.post('/wp-json/my-json/v1/mobile/2fa', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    if (response.status == 200 && response.data.success) {
      return {
        isSuccess: true,
      }
    }
    else {
      return {
        isSuccess: false,
        errorMsg: response.data?.data ?? undefined
      }
    }
  } catch (error: any) {
    return {
      isSuccess: false,
      errorMsg: error?.response?.data?.data?.message ?? "Try Again"
    }
  }
}

export async function resend2FAApi() {
  try {
    const response = await api.post('/wp-json/my-json/v1/mobile/resend2fa');
    if (response.status == 200 && response.data.success) {
      return {
        isSuccess: true,
      }
    }
    else {
      return {
        isSuccess: false,
        errorMsg: response.data?.data ?? undefined
      }
    }
  } catch (error: any) {
    return {
      isSuccess: false,
      errorMsg: error?.response?.data?.data?.message ?? "Try Again"
    }
  }
}

export async function signOutApi() {
  try {
    return {
      isSuccess: true,
    }
  } catch (error) {
    return {
      isSuccess: false
    }
  }
}

export async function checkJwtApi() {
  try {
    const jwt = await AsyncStorage.getItem('jwt');
    if (jwt) {
      const validateResponse = await api.get(`/?rest_route=/simple-jwt-login/v1/auth/validate&JWT=${jwt}`);
      if (validateResponse.status == 200 && validateResponse.data.success) {
        const refreshResponse = await api.post(`/?rest_route=/simple-jwt-login/v1/auth/refresh&JWT=${jwt}`);
          if (refreshResponse.status == 200 && refreshResponse.data.success) {
            await AsyncStorage.setItem('jwt', refreshResponse.data.data.jwt);
            return {
              isSuccess: true
            }
          }
      }
    }
    await AsyncStorage.removeItem('jwt');
    return {
      isSuccess: false
    }
  } catch (error) {
    await AsyncStorage.removeItem('jwt');
    return {
      isSuccess: false
    }
  }
}

export async function getAdApi() {
  try {
    const response = await api.get("/wp-json/my-json/v1/advertising");
    if (response.status == 200) {
      return {
        isSuccess: true,
        data: response.data.data
      }
    }
    else {
      return {
        isSuccess: false
      }
    }
  } catch (error) {
    return {
      isSuccess: false
    }
  }
}
