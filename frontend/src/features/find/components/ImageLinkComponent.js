/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import React from "react"

import { useDispatch } from "react-redux"
import { storeInputImage } from "../findSlice"

const ImageLinkComponent = props => {
  return (
    <div tw="text-gray-100 text-center px-1 py-4">
      <form>
        <input
          tw="rounded text-gray-900 p-1"
          placeholder="enter link to image"
        />
        <button
          tw="rounded border border-white text-gray-100 hover:bg-gray-100 hover:font-semibold hover:text-gray-900 px-4 py-1 ml-2"
          type="submit"
        >
          search
        </button>
      </form>
    </div>
  )
}

export default ImageLinkComponent
