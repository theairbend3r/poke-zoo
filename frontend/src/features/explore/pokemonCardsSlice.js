import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

// A constant that determines how many pokemon are fetched from the API.
export const NUMBER_OF_POKEMON = 150

// URL for the get request.
const URL = `https://pokeapi.co/api/v2/pokemon?limit=${NUMBER_OF_POKEMON}`

// We initialize 2 arrays. pokemonList is where we store all the pokemon fetched.
// filteredPokemonList is where we store pokemon that match the search filter.
const initialState = {
  pokemonList: [],
  filteredPokemonList: [],
}

// A function that checks if a pokemon exists in an array.
const pokemonExists = (arr, val) => {
  return arr.some(arrVal => val === arrVal)
}

export const pokemonCardsSlice = createSlice({
  name: "pokemonCards",
  initialState: initialState,
  reducers: {
    // Add a pokemon to the array. Pokemon is added only if it
    // does not already exist in the state.
    add: (state, action) => {
      const existingPokeIds = state.pokemonList.map(poke => poke.id)
      if (!pokemonExists(existingPokeIds, action.payload.id)) {
        state.pokemonList.push(action.payload)
      }
    },
    // Search for a pokemon in the pokemonList state. The matches are stored in the
    // filteredPokemonList state.
    search: (state, action) => {
      const searchTerm = action.payload.searchTerm

      // If the search term is empty, then pokemonList is
      // returned.
      if (searchTerm === "") {
        state.filteredPokemonList = state.pokemonList
      }

      // Convert the searchTerm and existing pokemon to lowercase while searhcing.
      const filteredList = state.pokemonList.filter(poke =>
        poke.name.toLowerCase().includes(searchTerm.toLowerCase())
      )

      // if searchTerm is not empty and no match is found, return "xxx".
      // Else return the filtered list.
      if (searchTerm !== "" && filteredList.length === 0) {
        state.filteredPokemonList = ["xxx"]
      } else {
        state.filteredPokemonList = filteredList
      }
    },
  },
})

export const { add, search } = pokemonCardsSlice.actions

// Async function to fetch pokemon.
// We only fetch pokemon if they already don't exist in the state.
// We do this so that a request is not made everytime we go to the explore page.
export const fetchPokemonNameUrl = () => {
  return async (dispatch, getState) => {
    // get state
    const state = getState()

    try {
      // if length of pokemonList is not equal to NUMBER_OF_POKEMON, then fetch
      // pokemon.
      if (state.pokemon.pokemonList.length !== NUMBER_OF_POKEMON) {
        const response = await axios.get(URL)
        const data = response.data.results

        // create a temp object for every pokemon fetched, extract all relevant
        // details into it, and push it into the pokemonList state.
        data.map(async poke => {
          const responseDetails = await axios.get(poke.url)

          let tempDetails = {
            id: responseDetails.data.id,
            name: responseDetails.data.species.name,
            baseExperience: responseDetails.data.base_experience,
            height: responseDetails.data.height,
            weight: responseDetails.data.weight,
            type: responseDetails.data.types[0].type.name,
            sprites: responseDetails.data.sprites.front_default,
          }

          dispatch(add(tempDetails))
        })
      }
    } catch (e) {
      console.log("Could not fetch data.")
    }
  }
}

export const selectorPokemon = state => state.pokemon.pokemonList
export const selectorFilteredPokemon = state =>
  state.pokemon.filteredPokemonList

export default pokemonCardsSlice.reducer
