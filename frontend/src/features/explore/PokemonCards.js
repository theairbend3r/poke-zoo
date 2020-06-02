/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import PokemonCard from "./components/PokemonCard"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchPokemonNameUrl,
  selectorFilteredPokemon,
  selectorPokemon,
} from "./pokemonCardsSlice"

const PokemonCards = () => {
  const dispatch = useDispatch()
  // A state array that contains all the pokemon fetched from the API.
  const pokemonList = useSelector(selectorPokemon)
  // A state array that contains an array of pokemon that match the search filter.
  const filteredPokemonList = useSelector(selectorFilteredPokemon)

  // Fetch pokemon by dispatching the action.
  useEffect(() => {
    dispatch(fetchPokemonNameUrl())
  }, [dispatch])

  return (
    <div tw="p-2 md:p-4">
      <ul>
        <div tw="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
          {/* If "xxx" is present in the 0th position of the state array, return "No pokemon found." */}
          {/* Else If "xxx" is not returned and the length of the state is 0, then return all the pokemon. */}
          {/* Else return pokemon that match the search filter.*/}
          {filteredPokemonList[0] === "xxx"
            ? "No Pokemon found."
            : filteredPokemonList.length === 0
            ? pokemonList.map(poke => (
                <PokemonCard
                  key={`key-${poke.id}`}
                  pokemonId={poke.id}
                  pokemonName={poke.name}
                  pokemonType={poke.type}
                  pokemonHeight={poke.height}
                  pokemonWeight={poke.weight}
                  pokemonBaseExperience={poke.baseExperience}
                  pokemonSprite={poke.sprites}
                />
              ))
            : filteredPokemonList.map(poke => (
                <PokemonCard
                  key={`key-${poke.id}`}
                  pokemonId={poke.id}
                  pokemonName={poke.name}
                  pokemonType={poke.type}
                  pokemonHeight={poke.height}
                  pokemonWeight={poke.weight}
                  pokemonBaseExperience={poke.baseExperience}
                  pokemonSprite={poke.sprites}
                />
              ))}
        </div>
      </ul>
    </div>
  )
}

export default PokemonCards
