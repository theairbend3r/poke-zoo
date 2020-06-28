import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  collectionList: [],
}

export const collectionSlice = createSlice({
  name: "collection",
  initialState: initialState,
  reducers: {
    setInitialCollection: (state, action) => {
      state.collectionList = action.payload
    },

    // create a collection only if the same name does not already exists.
    create: (state, action) => {
      if (action.payload !== "") {
        state.collectionList.push({
          collectionId: action.payload.collectionId,
          collectionName: action.payload.collectionName,
          pokemons: [],
        })
      } else {
        alert("Collection name cannot be blank.")
      }
    },
    // add pokemon to a collection
    addPoke: (state, action) => {
      // get the index of the selected collection in the collectionList array using the collection ID.
      const collectionListIndex = state.collectionList.findIndex(
        x => x.collectionId === action.payload.collectionId
      )

      const collectionName = state.collectionList.find(
        c => c.collectionId === action.payload.collectionId
      ).name

      // If collection exists, then push the pokemon in it.
      if (collectionListIndex !== -1) {
        if (
          // If a pokemon with the same name already exists, do not put into the list.
          // Instead, alert the user.
          state.collectionList[collectionListIndex].pokemons.find(
            poke => poke.pokeName === action.payload.pokeName
          )
        ) {
          alert(
            `${action.payload.pokeName} already exists in collection "${collectionName}".`
          )
        } else {
          state.collectionList[collectionListIndex].pokemons.push({
            pokeName: action.payload.pokeName,
            pokeUrl: action.payload.pokeUrl,
            pokeType: action.payload.pokeType,
          })
        }
      }
    },

    // remove a collection.
    remove: (state, action) => {
      const collectionIdToRemove = action.payload.collectionId

      const collectionIdRemoveIndex = state.collectionList.findIndex(
        col => col.collectionId === collectionIdToRemove
      )

      if (collectionIdRemoveIndex !== -1) {
        state.collectionList.splice(collectionIdRemoveIndex, 1)
      }
    },
    // Edit collection name and pokemon in it.
    edit: (state, action) => {
      const collectionIdToEdit = action.payload.collectionId
      const editedName = action.payload.collectionName
      const editedPokemonList = action.payload.pokemonList

      const collectionIdEditIndex = state.collectionList.findIndex(
        col => col.collectionId === collectionIdToEdit
      )

      if (collectionIdEditIndex !== -1) {
        state.collectionList[collectionIdEditIndex].collectionName = editedName
        state.collectionList[collectionIdEditIndex].pokemons = editedPokemonList
      }
    },
  },
})

// fetch all collections
export const fetchCollection = username => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`api/collection/display/${username}`, {
        headers: { "auth-token": window.localStorage.getItem("token") },
      })
      dispatch(setInitialCollection(response.data))
    } catch (e) {
      console.log(e)
    }
  }
}

// create a collection - async
export const createCollection = collectionObj => {
  return async dispatch => {
    try {
      const response = await axios.post(
        "api/collection/create",
        collectionObj,
        { headers: { "auth-token": window.localStorage.getItem("token") } }
      )

      const collectionName =
        response.data.pokeCollection[response.data.pokeCollection.length - 1]
          .collectionName

      const collectionId =
        response.data.pokeCollection[response.data.pokeCollection.length - 1]
          .collectionId
      dispatch(
        create({ collectionId: collectionId, collectionName: collectionName })
      )
    } catch (e) {
      alert(e.response.data.msg)
      console.log(e)
    }
  }
}

// remove a collection - async
export const removeCollection = collectionObj => {
  console.log(collectionObj)
  return async dispatch => {
    try {
      const response = await axios.post(
        "api/collection/delete",
        collectionObj,
        { headers: { "auth-token": window.localStorage.getItem("token") } }
      )
      dispatch(remove({ collectionId: response.data.collectionId }))
    } catch (e) {
      console.log(e)
    }
  }
}

// add pokemon to a collection - async
export const addPokemon = pokeObj => {
  return async dispatch => {
    try {
      const response = await axios.post("api/collection/addpoke", pokeObj, {
        headers: { "auth-token": window.localStorage.getItem("token") },
      })
      dispatch(addPoke(response.data))
    } catch (e) {
      alert(e.response.data.msg)
      console.log(e)
    }
  }
}

// edit collection -  async
export const editCollection = collectionObj => {
  return async dispatch => {
    try {
      const response = await axios.post(
        "api/collection/editcollection",
        collectionObj,
        {
          headers: { "auth-token": window.localStorage.getItem("token") },
        }
      )
      dispatch(edit(response.data))
    } catch (e) {
      console.log(e)
    }
  }
}

export const selectorCollection = state => state.collection.collectionList
export const {
  setInitialCollection,
  create,
  add,
  remove,
  edit,
  addPoke,
} = collectionSlice.actions
export default collectionSlice.reducer
