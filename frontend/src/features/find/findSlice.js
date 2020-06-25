import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  uploadedImage: "",
  model: null,
  matchesFound: [],
}

export const findSlice = createSlice({
  name: "find",
  initialState: initialState,
  reducers: {
    storeInputImage: (state, action) => {
      state.uploadedImage = action.payload.uploadedImage
    },
    setModel: (state, action) => {
      state.model = action.payload.model
    },
  },
})

export const selectorFind = state => state.find
export const { storeInputImage, setModel } = findSlice.actions
export default findSlice.reducer
