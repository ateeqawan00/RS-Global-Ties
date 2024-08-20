import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  forgotPassToken: localStorage.getItem("forgotPassToken") || "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
      // localStorage.removeItem('user')
    },
    setForgotPassToken: (state, action) => {
      state.forgotPassToken = action.payload
      localStorage.setItem("forgotPassToken", action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, logout, setForgotPassToken } = userSlice.actions

export default userSlice.reducer