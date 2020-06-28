/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import UserInfo from "./UserInfo"
import Collection from "./Collection"
import { fetchPokemonNameUrl } from "../explore/pokemonCardsSlice"

import { useDispatch } from "react-redux"
import { useEffect } from "react"

const Home = () => {
  const dispatch = useDispatch()

  // Fetch pokemon by dispatching the action.
  useEffect(() => {
    dispatch(fetchPokemonNameUrl())
  }, [dispatch])

  return (
    <div tw="flex flex-1 flex-col h-screen bg-blue-100">
      <UserInfo />
      <Collection />
    </div>
  )
}

export default Home
