import { setContext } from "@apollo/client/link/context";

const STORAGE_KEY = "accessToken";

export const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(STORAGE_KEY);

  return {
    headers: {
      ...headers,
      ...(token && { authorization: `Bearer ${token}` }),
    },
  };
});
