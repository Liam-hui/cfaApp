export async function signInApi(email: string, password: string) {
  try {
    // const { data } = await api.get('/bu/' + id);
    return {
      isSuccess: true,
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}

export async function signOutApi() {
  try {
    // const { data } = await api.get('/bu/' + id);
    return {
      isSuccess: true,
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}

