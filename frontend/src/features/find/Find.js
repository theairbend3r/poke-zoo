/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import ImageInput from "./ImageInput"
import SearchOutput from "./SearchOutput"

const Find = () => {
  return (
    <div tw="flex flex-1 flex-col bg-blue-100 overflow-y-auto">
      <ImageInput />
      <SearchOutput />
    </div>
  )
}

export default Find
