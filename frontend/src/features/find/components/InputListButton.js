/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import React from "react"

import { useDispatch } from "react-redux"
import { storeInputImage } from "../findSlice"

const InputListButton = props => {
  const { activeButton, ...others } = props

  return (
    <div>
      {activeButton === true ? (
        <button
          tw="border-b-2 sm:border-l-2 border-gray-100 font-bold text-white hover:font-semibold p-1"
          {...others}
        />
      ) : (
        <button tw="text-gray-100 hover:font-semibold p-1" {...others} />
      )}
    </div>
  )
}

export default InputListButton
