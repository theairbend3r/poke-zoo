import { configureStore } from "@reduxjs/toolkit"
import collectionReducer from "../features/home/collectionSlice"
import pokemonCardsReducer from "../features/explore/pokemonCardsSlice"
import findReducer from "../features/find/findSlice"
import authReducer from "../authSlice"

export default configureStore({
  reducer: {
    collection: collectionReducer,
    pokemon: pokemonCardsReducer,
    auth: authReducer,
    find: findReducer,
  },
})
