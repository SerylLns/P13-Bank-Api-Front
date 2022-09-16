import axios from "axios";
import localforage from "localforage";

const URL = process.env.REACT_APP_API_URL;

export const loginUser = async (email, password) => {
  let user;
  await axios
    .post(`${URL}user/login`, {
      email: email,
      password: password,
    })
    .then(({ data }) => {
      if (data.body?.token) {
        const token = `Bearer ${data.body.token}`;
        user = getUserProfile(token);
        localforage.setItem("token", token);
      } else {
        throw new Error("API call error !");
      }
    });
  return user;
};

export const getUserProfile = async (token) => {
  let user;
  await axios
    .post(
      `${URL}user/profile`,
      {},
      {
        headers: {
          Authorization: token.toString(),
          "Content-Type": "application/json",
        },
      }
    )
    .then(({ data }) => {
      user = data.body;
    });
  return user;
};

export const setUserProfil = async (firstName, lastName, token) => {
  await axios
    .put(
      `${URL}user/profile`,
      {
        firstName,
        lastName,
      },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      return res;
    });
};
