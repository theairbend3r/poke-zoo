/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import React from "react"

import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { selectorCollection } from "./collectionSlice"
import { selectorAuth } from "../../authSlice"

const UserInfo = () => {
  const authState = useSelector(selectorAuth)

  const dateTime = new Date()
  const collections = useSelector(selectorCollection)
  const currentDate = dateTime.toDateString()

  const numPokemon = collections.reduce((accumulator, poke) => {
    return accumulator + poke.pokemons.length
  }, 0)

  const options = {
    title: {
      text: "My chart",
    },
    series: [
      {
        data: [1, 2, 3],
      },
    ],
  }

  return (
    <div tw="flex flex-row justify-around items-center bg-blue-800 py-8 px-2 md:py-10 md:px-4">
      <section tw="w-1/3 text-center text-gray-100 rounded-full p-4 mr-1">
        <h3 tw="font-semibold text-xl md:text-2xl lg:text-3xl">
          Hello {authState.username}!
        </h3>
        <p> {currentDate} </p>
      </section>
      <section tw="w-2/3 text-left text-white p-4 rounded ml-1 sm:text-lg md:text-xl lg:text-2xl md:flex md:flex-row md:justify-center">
        <p tw="m-1 p-2">
          <span tw="text-gray-100 px-4 py-2 m-1 rounded-full">
            {numPokemon}
          </span>
          Total Pokemons
        </p>
        <p tw="m-1 p-2">
          <span tw="text-gray-100 px-4 py-2 m-1 rounded-full">
            {collections.length}
          </span>
          Total Collections
        </p>
        {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}
      </section>
    </div>
  )
}

export default UserInfo
