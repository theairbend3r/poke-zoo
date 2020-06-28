/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"
import styled from "@emotion/styled/macro"

import PokeTypeColorElement from "./pokeTypeColor"
import PokeDetailsUI from "./PokeDetailsUI"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addPokemon, selectorCollection } from "../../home/collectionSlice"
import { selectorAuth } from "../../../authSlice"

const PokemonCard = props => {
  // access the collection state.
  const collectionState = useSelector(selectorCollection)
  const authState = useSelector(selectorAuth)
  const dispatch = useDispatch()

  const [currentCollection, setCurrentCollection] = useState({
    username: authState.username,
    collectionId: "",
    pokemon: {
      pokeName: "",
      pokeUrl: "",
      pokeType: "",
      pokeHeight: 0,
      pokeWeight: 0,
    },
  })

  const handleChange = e => {
    setCurrentCollection({
      ...currentCollection,
      username: authState.username,
      collectionId: e.target.value,
      pokemon: {
        pokeName: pokemonName,
        pokeUrl: pokemonSprite,
        pokeType: pokemonType,
        pokeHeight: pokemonHeight,
        pokeWeight: pokemonWeight,
      },
    })
  }

  const handleSubmit = (e, pokeId) => {
    e.preventDefault()
    dispatch(addPokemon(currentCollection))
    setCurrentCollection({
      collectionId: "",
      pokemon: {
        pokeName: "",
        pokeUrl: "",
        pokeType: "",
        pokeHeight: 0,
        pokeWeight: 0,
      },
    })
  }

  // extract details to render a pokemonCard component.
  const {
    pokemonId,
    pokemonName,
    pokemonType,
    pokemonHeight,
    pokemonWeight,
    pokemonBaseExperience,
    pokemonSprite,
  } = props

  return (
    <div tw="flex flex-row justify-around items-center border border-blue-800 p-2 rounded-lg overflow-x-auto">
      <div tw="flex flex-col items-center flex-wrap w-1/3 m-1">
        <img
          tw="object-contain transform sm:scale-125 h-24 w-24 sm:h-32 sm:w-32 md:h-24 md:w-24"
          alt={pokemonName}
          src={pokemonSprite}
        />
        <p tw=" text-gray-900 font-extrabold text-center whitespace-normal rounded p-1 m-1">
          {pokemonName}
        </p>

        <PokeTypeColorElement
          tw="text-center text-white font-semibold text-center whitespace-normal rounded py-1 px-2 m-1"
          color={pokemonType}
        >
          {pokemonType}
        </PokeTypeColorElement>
      </div>
      <div tw="flex flex-col items-center w-2/3">
        <div>
          <PokeDetailsUI keyAttribute="height" val={pokemonHeight} />
          <PokeDetailsUI keyAttribute="weight" val={pokemonWeight} />
          <PokeDetailsUI keyAttribute="base-exp" val={pokemonBaseExperience} />
        </div>
        <form onSubmit={handleSubmit}>
          <select
            tw="border border-gray-900 rounded"
            value={currentCollection.collectionId}
            onChange={handleChange}
          >
            <option value={"NULL"}>...</option>
            {collectionState.map(collection => (
              <option
                key={`${collection.collectionId}-${pokemonId}`}
                value={collection.collectionId}
              >
                {collection.collectionName}
              </option>
            ))}
          </select>
          <button
            tw="rounded border border-gray-900 text-gray-900 hover:bg-gray-800 hover:font-semibold hover:text-gray-100 px-4 py-1 ml-2 mt-2"
            type="submit"
          >
            add
          </button>
        </form>
      </div>
    </div>
  )
}

export default PokemonCard
