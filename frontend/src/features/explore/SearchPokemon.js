/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import React, { useState } from "react"
import Bin from "../../Icons/Bin"

import { useDispatch } from "react-redux"
import { search } from "./pokemonCardsSlice"

const SearchPokemon = () => {
  const dispatch = useDispatch()

  const [searchTerm, setSearchTerm] = useState("")
  const [uploadedImage, setUploadedImage] = useState([])

  // dispatch search action.
  const handleSearchTermChange = e => {
    setSearchTerm(e.target.value)
    dispatch(search({ searchTerm: e.target.value }))
  }

  return (
    <div tw="bg-blue-800 py-8 px-2 md:py-10 md:px-4">
      <section tw="flex flex-row justify-center">
        <div tw="mx-2 text-center">
          <h3 tw="text-gray-100 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
            Explore
          </h3>
          <form>
            <input
              tw="rounded text-gray-900 border border-purple-700 p-1"
              value={searchTerm}
              onChange={handleSearchTermChange}
              placeholder="search pokemon"
            />
          </form>
        </div>
      </section>
    </div>
  )
}

export default SearchPokemon
