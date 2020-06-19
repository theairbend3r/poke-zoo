/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import { useSelector } from "react-redux"
import { selectorFind } from "./findSlice"

const SearchOutput = () => {
  const findState = useSelector(selectorFind)

  return (
    <div tw="flex flex-col text-center p-2 md:flex-row ">
      <div tw="md:w-1/2 m-1">
        <h3 tw="bg-gray-700 mb-1 text-gray-100 font-semibold p-1 rounded">
          Preview Input Image
        </h3>
        <div tw="flex flex-row justify-between">
          <div></div>
          {findState.uploadedImage && (
            <img
              tw="border border-gray-800 p-1 rounded shadow-lg"
              src={findState.uploadedImage}
            />
          )}
          <div></div>
        </div>
      </div>
      <div tw="md:w-1/2 md:h-screen m-1">
        <h3 tw="bg-gray-700 mb-1 text-gray-100 font-semibold p-1 rounded">
          Search Results
        </h3>
      </div>
    </div>
  )
}

export default SearchOutput
