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
    <div tw="flex flex-row justify-around items-center bg-blue-800 p-2 rounded-lg overflow-x-auto">
      <div tw="flex flex-col flex-wrap w-1/3 m-1">
        <img
          tw="object-contain transform sm:scale-125"
          alt={pokemonName}
          src={pokemonSprite}
        />
        <p tw="bg-gray-100 text-gray-900 font-extrabold text-center whitespace-normal rounded p-1 m-1">
          {pokemonName}
        </p>

        <PokeTypeColorElement
          tw="text-center text-white font-semibold text-center whitespace-normal rounded p-1 m-1"
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
            tw="rounded border border-white text-gray-100 hover:bg-gray-100 hover:font-semibold hover:text-gray-900 px-4 py-1 ml-2"
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
