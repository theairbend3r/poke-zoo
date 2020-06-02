/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import React from "react"

import UserInfo from "./UserInfo"
import Collection from "./Collection"

const Home = () => {
  return (
    <div tw="flex flex-1 flex-col h-screen bg-blue-100">
      <UserInfo />
      <Collection />
    </div>
  )
}

export default Home
