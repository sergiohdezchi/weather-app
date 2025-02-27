import axios from "./axios";

const LOGIN_URL = "/oauth/token";
const LOGOUT_URL = "/oauth/revoke";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

export async function loginWithEmailAndPassword(
  email: string,
  password: string
) {
  const data = {
    grant_type: "password",
    email: email,
    password: password,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  return axios
    .post(LOGIN_URL, data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
}

export async function logoutUserWithToken(token: string) {
  const data = {
    token: token,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  return axios
    .post(LOGOUT_URL, data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
}

export async function requestAccessTokenWithRefreshToken(refreshToken: string) {
  const data = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  return axios
    .post(LOGIN_URL, data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
}

