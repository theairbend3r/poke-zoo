import { createSlice } from "@reduxjs/toolkit"

// intialize a counter for collection id.
let collectionId = 1

const initialState = {
  collectionList: [],
}

export const collectionSlice = createSlice({
  name: "collection",
  initialState: initialState,
  reducers: {
    // create a collection only if the same name does not already exists.
    create: (state, action) => {
      if (action.payload !== "") {
        const doesCollectionNameExist = state.collectionList.find(
          cn => cn.name === action.payload
        )

        if (!doesCollectionNameExist) {
          state.collectionList.push({
            id: collectionId,
            name: action.payload,
            pokemons: [],
          })
          collectionId++
        } else {
          alert(
            `Collection name "${action.payload}" already exists. Please choose another name.`
          )
        }
      } else {
        alert("Collection name cannot be blank.")
      }
    },
    // add pokemon to a collection
    add: (state, action) => {
      // get the index of the selected collection in the collectionList array using the collection ID.
      const collectionListIndex = state.collectionList.findIndex(
        x => x.id === action.payload.id
      )

      const collectionName = state.collectionList.find(
        c => c.id === action.payload.id
      ).name

      // If collection exists, then push the pokemon in it.
      if (collectionListIndex !== -1) {
        if (
          // If a pokemon with the same name already exists, do not put into the list.
          // Instead, alert the user.
          state.collectionList[collectionListIndex].pokemons.includes(
            action.payload.pokemon
          )
        ) {
          alert(
            `${action.payload.pokemon} already exists in collection "${collectionName}".`
          )
        } else {
          state.collectionList[collectionListIndex].pokemons.push(
            action.payload.pokemon
          )
        }
      }
    },
    // remove a collection.
    remove: (state, action) => {
      const collectionIdToRemove = action.payload.id

      const collectionIdRemoveIndex = state.collectionList.findIndex(
        col => col.id === collectionIdToRemove
      )

      if (collectionIdRemoveIndex !== -1) {
        state.collectionList.splice(collectionIdRemoveIndex, 1)
      }
    },
    // Edit collection name and pokemon in it.
    edit: (state, action) => {
      const collectionIdToEdit = action.payload.id
      const editedName = action.payload.editedName
      const editedPokemonList = action.payload.editedPokemonList

      const collectionIdEditIndex = state.collectionList.findIndex(
        col => col.id === collectionIdToEdit
      )

      if (collectionIdEditIndex !== -1) {
        state.collectionList[collectionIdEditIndex].name = editedName
        state.collectionList[collectionIdEditIndex].pokemons = editedPokemonList
      }
    },
  },
})

export const selectorCollection = state => state.collection.collectionList
export const { create, add, remove, edit } = collectionSlice.actions
export default collectionSlice.reducer
