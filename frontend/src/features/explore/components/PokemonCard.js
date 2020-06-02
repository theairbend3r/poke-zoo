/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"
import styled from "@emotion/styled/macro"

import PokeTypeColorElement from "./pokeTypeColor"
import PokeFormForCollection from "./PokeFormForCollection"
import PokeDetailsUI from "./PokeDetailsUI"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { add, selectorCollection } from "../../home/collectionSlice"

const PokemonCard = props => {
  // access the collection state.
  const collection = useSelector(selectorCollection)
  const dispatch = useDispatch()

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

  // create a local state here to edit a collection. We can change the name of collection
  // and pokemon in it.
  const [pokemonCollectionInput, setPokemonCollectionInput] = useState({
    id: "",
    pokemon: "",
  })

  //
  const handlePokemonToCollection = e => {
    setPokemonCollectionInput({
      ...pokemonCollectionInput,
      id: Number(e.target.value),
      pokemon: pokemonName,
    })
  }

  // add pokemon to a collection.
  const addPokemonToCollection = e => {
    e.preventDefault()
    setPokemonCollectionInput({
      ...pokemonCollectionInput,
      id: "",
      pokemon: "",
    })
    dispatch(add(pokemonCollectionInput))
  }

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
        <PokeFormForCollection
          addPokemonToCollection={addPokemonToCollection}
          pokemonCollectionInput={pokemonCollectionInput}
          handlePokemonToCollection={handlePokemonToCollection}
          collection={collection}
          pokemonId={pokemonId}
        />
      </div>
    </div>
  )
}

export default PokemonCard
