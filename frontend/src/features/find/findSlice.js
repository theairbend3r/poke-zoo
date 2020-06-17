import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  uploadedImage: "",
  matchesFound: [],
}

export const findSlice = createSlice({
  name: "find",
  initialState: initialState,
  reducers: {
    storeInputImage: (state, action) => {
      state.uploadedImage = action.payload.uploadedImage
    },
  },
})

export const selectorFind = state => state.find
export const { storeInputImage } = findSlice.actions
export default findSlice.reducer
