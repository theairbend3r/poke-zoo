/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"
import React, { useState } from "react"

import CloseIcon from "../../../Icons/Bin"

import { useDispatch, useSelector } from "react-redux"
import { removeCollection, editCollection } from "../collectionSlice"

import { selectorAuth } from "../../../authSlice"

const CollectionCard = props => {
  // Get the collectionObj using props for displaying pokemon in
  // collection cards.
  const { collectionObj } = props

  const dispatch = useDispatch()
  const authState = useSelector(selectorAuth)

  // Initialise state for renaming collection.
  const [collectionName, setCollectionName] = useState(
    collectionObj.collectionName
  )
  // Edit state is initialised with a "no"
  const [isEdit, setIsEdit] = useState("no")
  // Initialise state for removing pokemon from a collection.
  const [pokemonList, setPokemonList] = useState(collectionObj.pokemons)

  // Remove collection from the store.
  const handleRemoveCollection = collectionId => {
    dispatch(
      removeCollection({
        username: authState.username,
        collectionId: collectionId,
      })
    )
  }

  // Toggle edit functionality of a card.
  const handleEditToggle = () => {
    if (isEdit === "no") {
      setIsEdit("yes")
      setCollectionName(collectionObj.collectionName)
    } else {
      setIsEdit("no")
      setCollectionName(collectionObj.collectionName)
      setPokemonList(collectionObj.pokemons)
    }
  }

  // Remove pokemon from a collection.
  const handleRemovePokemon = pokeName => {
    const newPokemonList = pokemonList.filter(
      poke => poke.pokeName !== pokeName
    )
    setPokemonList(newPokemonList)
  }

  // Rename collection.
  const handleCollectionNameChange = e => {
    setCollectionName(e.target.value)
  }

  // Save the changes made to a card.
  // This involves renaming a collection and editing the pokemon list.
  const handleSave = collectionId => {
    dispatch(
      editCollection({
        collectionId: collectionId,
        username: authState.username,
        newCollectionName: collectionName,
        editedPokemonList: pokemonList,
      })
    )
    setIsEdit("no")
  }

  return (
    <div tw="flex flex-col bg-blue-800 hover:border hover:border-2 hover:border-purple-700 h-full shadow-lg text-gray-100 rounded overflow-auto m-2">
      {/* conditional render based on edit button. */}
      {isEdit === "no" ? (
        // if edit mode is off, then display the the collections as is.
        <section tw="p-2">
          <div tw="flex flex-row justify-end mt-1">
            <button
              onClick={handleEditToggle}
              tw="mx-1 px-2 py-1 rounded bg-yellow-500 text-gray-800 hover:text-gray-900 hover:font-semibold text-sm sm:text-base"
            >
              edit
            </button>
            <button
              onClick={() => handleRemoveCollection(collectionObj.collectionId)}
              tw="mx-1 px-2 py-1 rounded bg-gray-100 text-gray-800 hover:text-gray-900 hover:font-semibold text-sm sm:text-base"
            >
              delete
            </button>
          </div>

          <div tw="flex flex-col">
            <h3 tw="whitespace-pre-line my-1 rounded text-center font-bold text-3xl sm:text-4xl md:text-3xl">
              {collectionObj.collectionName}
            </h3>
            <ul tw="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-6 px-2 py-2 md:py-0">
              {collectionObj.pokemons.map(poke => (
                <li
                  key={poke.pokeName}
                  tw="flex flex-row bg-gray-200 text-gray-800 p-2 rounded-lg justify-between"
                >
                  <div>
                    <img
                      tw="h-16 w-16 sm:h-20 sm:w-20 md:h-20 md:w-20"
                      src={poke.pokeUrl}
                    />
                  </div>
                  <div tw="text-sm sm:text-base font-semibold">
                    {poke.pokeName}
                  </div>
                  <div></div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        // if edit mode is on, display an <input /> element in the place of collection name and
        // display "x" buttons to delete pokemon from the collection.
        // Also display a "cancel" and "save" button.
        <section tw="p-2">
          <div tw="flex flex-row justify-end mt-1">
            <button
              onClick={() => handleSave(collectionObj.collectionId)}
              tw="mx-1 px-2 py-1 rounded bg-yellow-500 text-gray-800 hover:text-gray-900 hover:font-semibold text-sm sm:text-base"
            >
              save
            </button>
            <button
              onClick={handleEditToggle}
              tw="mx-1 px-2 py-1 rounded bg-gray-100 text-gray-800 hover:text-gray-900 hover:font-semibold text-sm sm:text-base"
            >
              cancel
            </button>
          </div>

          <div tw="flex flex-col">
            <h3 tw="whitespace-pre-line my-1 rounded text-center font-bold text-3xl sm:text-4xl md:text-3xl">
              <input
                value={collectionName}
                onChange={handleCollectionNameChange}
                tw="bg-blue-800 rounded p-1"
              />
            </h3>
            <ul tw="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-6 px-2 py-2 md:py-0">
              {pokemonList.map(poke => (
                <li
                  key={poke.pokeName}
                  tw="flex flex-col bg-gray-200 text-gray-800 rounded-lg px-2 py-1"
                >
                  <button
                    onClick={() => handleRemovePokemon(poke.pokeName)}
                    tw="text-sm text-gray-900 self-end"
                  >
                    <CloseIcon tw="h-3 w-3 sm:h-4 sm:w-4 fill-current text-red-800" />
                  </button>
                  <div tw="flex flex-row justify-between">
                    <div>
                      <img
                        tw="h-16 w-16 sm:h-20 sm:w-20 md:h-20 md:w-20"
                        src={poke.pokeUrl}
                      />
                    </div>
                    <div tw="text-sm sm:text-base font-semibold">
                      {poke.pokeName}
                    </div>
                    <div></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        // <section>
        //   <div tw="flex flex-row justify-between py-1 px-2">
        //     <button
        //       onClick={handleEditToggle}
        //       tw="mx-1 p-1 rounded hover:text-white hover:font-semibold hover:p-1"
        //     >
        //       cancel
        //     </button>
        //     <button
        //       onClick={() => handleSave(collectionObj.collectionId)}
        //       tw="mx-1 p-1 rounded hover:text-white hover:font-semibold hover:p-1"
        //     >
        //       save
        //     </button>
        //   </div>
        //   <div tw="flex flex-row justify-around pt-4 pb-8 px-2">
        //     <div tw="my-auto text-xl md:text-lg">
        //   <input
        //     value={collectionName}
        //     onChange={handleCollectionNameChange}
        //     tw="bg-purple-600 whitespace-pre-line rounded px-1 py-4 md:p-2 text-center font-bold text-lg sm:text-xl md:text-lg"
        //   />
        //     </div>
        //     <div tw="w-2/3 my-auto text-center sm:text-lg md:text-base">
        //       <ul>
        //         {pokemonList.map(poke => (
        //           <li
        //             key={poke.pokeName}
        //             tw="flex flex-row justify-between items-center text-gray-900 mx-4 font-semibold bg-gray-100 p-1 my-1 rounded"
        //           >
        //             <p>{poke.pokeName}</p>
        // <button
        //   onClick={() => handleRemovePokemon(poke.pokeName)}
        //   tw="font-semibold bg-red-800 m-1 px-2 py-1 rounded-full text-gray-100"
        // >
        //               x
        //             </button>
        //           </li>
        //         ))}
        //       </ul>
        //     </div>
        //   </div>
        // </section>
      )}
    </div>
  )
}

export default CollectionCard

{
  /* Bin Icon by Kiranshastry => https://www.flaticon.com/authors/kiranshastry */
}
