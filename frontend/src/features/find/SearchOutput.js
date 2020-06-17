/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import React, { useState, useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"
import { selectorFind } from "./findSlice"

const SearchOutput = props => {
  const findState = useSelector(selectorFind)

  return (
    <div tw="flex flex-col ">
      <div>
        <h2>Preview Input Image</h2>
        {findState.uploadedImage && <img src={findState.uploadedImage} />}
      </div>
      <div>Search Results</div>
    </div>
  )
}

export default SearchOutput
