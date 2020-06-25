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
    storePredictions: (state, action) => {
      state.matchesFound = action.payload.predictions
    },
  },
})

export const selectorFind = state => state.find
export const { storeInputImage, storePredictions } = findSlice.actions
export default findSlice.reducer
