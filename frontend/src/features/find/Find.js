/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import React from "react"
import ImageInput from "./ImageInput"
import SearchOutput from "./SearchOutput"

const Find = () => {
  return (
    <div tw="flex flex-1 flex-col h-screen bg-blue-100">
      <ImageInput />
      <SearchOutput />
    </div>
  )
}

export default Find
