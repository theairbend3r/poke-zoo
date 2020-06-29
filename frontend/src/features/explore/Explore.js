/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import React from "react"

import Footer from "../../components/Footer"
import SearchPokemon from "./SearchPokemon"
import PokemonCards from "./PokemonCards"

const Explore = () => {
  return (
    <div tw="flex flex-1 flex-col h-screen justify-start bg-blue-100">
      <SearchPokemon />
      <PokemonCards />
    </div>
  )
}

export default Explore
