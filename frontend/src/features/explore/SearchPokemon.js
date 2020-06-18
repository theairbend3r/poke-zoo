/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import React, { useState } from "react"

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
          <h3 tw="text-gray-100"> Search Pokemon by Name </h3>
          <form>
            <input
              tw="rounded"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </form>
        </div>
      </section>
    </div>
  )
}

export default SearchPokemon
