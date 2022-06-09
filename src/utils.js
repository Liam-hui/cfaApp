export const getHtmlWithJwt = async (url, jwt) => {
  const response = await axios.get(url,
    {
      headers: { "Authorization" : `Bearer ${jwt}` }
    },
  );
  console.log(response);
  return null;
}