/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"
import React, { useState } from "react"

import CloseIcon from "../../../Icons/Bin"
import PokeTypeColorElement from "./pokeTypeColor"

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
    <div tw="flex flex-col m-1 bg-blue-800 h-full shadow-lg text-gray-100 rounded overflow-auto">
      {/* conditional render based on edit button. */}
      {isEdit === "no" ? (
        // if edit mode is off, then display the the collections as is.
        <section tw="p-2">
          <div tw="flex flex-row justify-end mt-1">
            <button
              onClick={handleEditToggle}
              tw="mx-1 px-2 py-1 rounded bg-yellow-500 text-gray-800 hover:text-gray-900 hover:font-semibold text-xs sm:text-base"
            >
              edit
            </button>
            <button
              onClick={() => handleRemoveCollection(collectionObj.collectionId)}
              tw="mx-1 px-2 py-1 rounded bg-gray-100 text-gray-800 hover:text-gray-900 hover:font-semibold text-xs sm:text-base"
            >
              delete
            </button>
          </div>

          <div tw="flex flex-col">
            <h3 tw="whitespace-pre-line my-1 mb-4 rounded text-center font-bold text-3xl sm:text-4xl md:text-3xl">
              {collectionObj.collectionName}
            </h3>
            <ul tw="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-2 gap-6 px-2 py-2 md:py-0">
              {collectionObj.pokemons.map(poke => (
                <li
                  key={poke.pokeName}
                  tw="flex flex-row bg-gray-200 text-gray-800 p-2 rounded-lg justify-between"
                >
                  <div>
                    <img
                      tw="object-contain transform sm:scale-125 h-16 w-16 sm:h-20 sm:w-20 md:h-20 md:w-20"
                      src={poke.pokeUrl}
                    />
                  </div>
                  <div tw="flex flex-col items-center">
                    <span tw="text-sm sm:text-lg md:text-base font-semibold">
                      {poke.pokeName}
                    </span>
                    <PokeTypeColorElement
                      tw="text-xs sm:text-sm font-semibold text-gray-100 p-1 rounded"
                      color={poke.pokeType}
                    >
                      {poke.pokeType}
                    </PokeTypeColorElement>
                    {/* <span tw="text-xs sm:text-sm">{poke.pokeType}</span> */}
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
              tw="mx-1 px-2 py-1 rounded bg-green-700 text-gray-200 hover:text-gray-100 hover:font-semibold text-xs sm:text-base"
            >
              save
            </button>
            <button
              onClick={handleEditToggle}
              tw="mx-1 px-2 py-1 rounded bg-gray-100 text-gray-800 hover:text-gray-900 hover:font-semibold text-xs sm:text-base"
            >
              cancel
            </button>
          </div>

          <div tw="flex flex-col">
            <h3 tw="whitespace-pre-line my-1 mb-4 rounded text-center font-bold text-3xl sm:text-4xl md:text-3xl">
              <input
                value={collectionName}
                onChange={handleCollectionNameChange}
                tw="bg-blue-800 rounded p-1 text-gray-300 border border-gray-200"
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
                    <div tw="flex flex-col items-center">
                      <span tw="text-sm sm:text-lg md:text-base font-semibold">
                        {poke.pokeName}
                      </span>
                      <PokeTypeColorElement
                        tw="text-xs sm:text-sm font-semibold text-gray-100 p-1 rounded"
                        color={poke.pokeType}
                      >
                        {poke.pokeType}
                      </PokeTypeColorElement>
                    </div>
                    <div></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  )
}

export default CollectionCard

{
  /* Bin Icon by Kiranshastry => https://www.flaticon.com/authors/kiranshastry */
}
