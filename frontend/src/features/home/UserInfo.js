/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import React from "react"

import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { selectorCollection } from "./collectionSlice"
import { selectorAuth } from "../../authSlice"

const UserInfo = () => {
  const authState = useSelector(selectorAuth)

  const dateTime = new Date()
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(dateTime)
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(dateTime)
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(dateTime)

  const collections = useSelector(selectorCollection)

  // Number of Pokemon
  const numPokemon = collections.reduce((accumulator, poke) => {
    return accumulator + poke.pokemons.length
  }, 0)

  // Pokemon Weights
  const pokemonWeightsArray = []
  collections.map(col =>
    col.pokemons.map(poke => pokemonWeightsArray.push(poke.pokeWeight))
  )

  const minPokemonWeight = Math.min(...pokemonWeightsArray)
  const maxPokemonWeight = Math.max(...pokemonWeightsArray)

  // Pokemon Height
  const pokemonHeightsArray = []
  collections.map(col =>
    col.pokemons.map(poke => pokemonHeightsArray.push(poke.pokeHeight))
  )

  const minPokemonHeight = Math.min(...pokemonHeightsArray)
  const maxPokemonHeight = Math.max(...pokemonHeightsArray)

  // p component
  const Info = tw.p`flex flex-row items-center justify-between m-1 p-2 bg-gray-800 text-gray-500 rounded text-base sm:text-lg md:text-xl lg:text-2xl`

  return (
    <div tw="flex flex-row justify-around items-center bg-blue-800 py-8 px-2 md:py-10 md:px-4">
      <section tw="w-1/3 text-center text-gray-100 rounded p-4 mr-1">
        <h3 tw="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Hello {authState.username}!
        </h3>
        <p> {`${da}-${mo}-${ye}`} </p>
      </section>
      <section tw="flex flex-1 flex-col sm:flex-row w-2/3 text-gray-100 justify-center items-center">
        <div tw="flex flex-row sm:flex-col">
          <Info>
            <span tw="text-gray-100 font-semibold text-lg m-1 p-1 sm:mx-2 sm:text-xl md:text-2xl lg:text-4xl">
              {collections.length}
            </span>
            collections
          </Info>
          <Info>
            <span tw="text-gray-100 font-semibold text-lg m-1 p-1 sm:mx-2 sm:text-xl md:text-2xl lg:text-4xl">
              {numPokemon}
            </span>
            pokemon
          </Info>
        </div>
        {numPokemon !== 0 && (
          <div tw="flex flex-col sm:flex-row">
            <div tw="flex flex-row sm:flex-col">
              <Info>
                <span tw="text-gray-100 font-semibold text-lg m-1 p-1 sm:mx-2 sm:text-xl md:text-2xl lg:text-4xl">
                  {minPokemonHeight}
                </span>
                min height
              </Info>
              <Info>
                <span tw="text-gray-100 font-semibold text-lg m-1 p-1 sm:mx-2 sm:text-xl md:text-2xl lg:text-4xl">
                  {maxPokemonHeight}
                </span>
                max height
              </Info>
            </div>
            <div tw="flex flex-row sm:flex-col">
              <Info>
                <span tw="text-gray-100 font-semibold text-lg m-1 p-1 sm:mx-2 sm:text-xl md:text-2xl lg:text-4xl">
                  {minPokemonWeight}
                </span>
                min weight
              </Info>
              <Info>
                <span tw="text-gray-100 font-semibold text-lg m-1 p-1 sm:mx-2 sm:text-xl md:text-2xl lg:text-4xl">
                  {maxPokemonWeight}
                </span>
                max weight
              </Info>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default UserInfo
