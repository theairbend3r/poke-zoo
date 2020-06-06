/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"
import React, { useState } from "react"

import { useDispatch } from "react-redux"
import { remove, edit } from "../collectionSlice"

const CollectionCard = props => {
  // Get the collectionObj using props for displaying pokemon in
  // collection cards.
  const { collectionObj } = props
  const dispatch = useDispatch()
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
    dispatch(remove({ id: collectionId }))
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
    const newPokemonList = pokemonList.filter(poke => poke !== pokeName)
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
      edit({
        id: collectionId,
        editedName: collectionName,
        editedPokemonList: pokemonList,
      })
    )
    setIsEdit("no")
  }

  return (
    <div tw="flex flex-col bg-blue-800 hover:bg-blue-900 h-full shadow-lg text-gray-100 rounded-lg overflow-auto m-1">
      {/* conditional render based on edit button. */}
      {isEdit === "no" ? (
        // if edit mode is off, then display the the collections as is.
        <section>
          <div tw="flex flex-row justify-end py-1 px-2">
            <button
              onClick={handleEditToggle}
              tw="mx-1 p-1 rounded hover:text-white hover:font-semibold hover:p-1"
            >
              edit
            </button>
            <button
              onClick={() => handleRemoveCollection(collectionObj.collectionId)}
              tw="mx-1 p-1 rounded hover:text-white hover:font-semibold hover:p-1"
            >
              delete
            </button>
          </div>
          <div tw="flex flex-row justify-around pt-4 pb-12 px-2">
            <div tw="my-auto text-xl md:text-lg">
              <h3 tw="bg-purple-600 whitespace-pre-line rounded px-4 py-2 md:p-2 text-center font-bold text-lg sm:text-xl md:text-lg">
                {collectionObj.collectionName}
              </h3>
            </div>
            <div tw="w-2/3 my-auto text-center sm:text-lg md:text-base">
              <ul>
                {collectionObj.pokemons.map(poke => (
                  <li
                    key={poke}
                    tw="text-gray-900 font-semibold bg-gray-100 p-1 rounded m-1"
                  >
                    {poke}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : (
        // if edit mode is on, display an <input /> element in the place of collection name and
        // display "x" buttons to delete pokemon from the collection.
        // Also display a "cancel" and "save" button.
        <div>
          <section>
            <div tw="flex flex-row justify-between py-1 px-2">
              <button
                onClick={handleEditToggle}
                tw="mx-1 p-1 rounded hover:text-white hover:font-semibold hover:p-1"
              >
                cancel
              </button>
              <button
                onClick={() => handleSave(collectionObj.id)}
                tw="mx-1 p-1 rounded hover:text-white hover:font-semibold hover:p-1"
              >
                save
              </button>
            </div>
            <div tw="flex flex-row justify-around pt-4 pb-8 px-2">
              <div tw="my-auto text-xl md:text-lg">
                <input
                  value={collectionName}
                  onChange={handleCollectionNameChange}
                  tw="bg-purple-600 whitespace-pre-line rounded px-1 py-4 md:p-2 text-center font-bold text-lg sm:text-xl md:text-lg"
                />
              </div>
              <div tw="w-2/3 my-auto text-center sm:text-lg md:text-base">
                <ul>
                  {pokemonList.map(poke => (
                    <li
                      key={poke}
                      tw="flex flex-row justify-between items-center text-gray-900 mx-4 font-semibold bg-gray-100 p-1 my-1 rounded"
                    >
                      <p>{poke}</p>
                      <button
                        onClick={() => handleRemovePokemon(poke)}
                        tw="font-semibold bg-red-800 m-1 px-2 py-1 rounded-full text-gray-100"
                      >
                        x
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default CollectionCard
