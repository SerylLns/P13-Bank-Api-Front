import { createSlice } from "@reduxjs/toolkit";
import localforage from "localforage";

const initialState = {
  token: null,
  firstName: null,
  lastName: null,
  email: null,
  isConnected: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...action.payload, isConnected: true };
    },
    setProfil: (state, {payload}) => {
      return {...state, firstName: payload.firstName, lastName: payload.lastName }
    },
    logOut: (state) => {
      localforage.removeItem("token")
      return initialState;
    },
  },
});

export const { setUser, setProfil, logOut } = userSlice.actions;
export default userSlice.reducer;
