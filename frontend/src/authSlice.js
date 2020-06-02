import { createSlice } from "@reduxjs/toolkit"
import { useHistory } from "react-router-dom"

const initialState = {
  isUserLoggedIn: false,
  username: "",
}

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload
      if (username === "test" && password === "test") {
        state.isUserLoggedIn = true
        state.username = username
      }
    },
    logout: state => {
      state.isUserLoggedIn = false
      state.username = ""
    },
  },
})

export const selectorAuth = state => state.auth
export const { login, logout } = authSlice.actions
export default authSlice.reducer
