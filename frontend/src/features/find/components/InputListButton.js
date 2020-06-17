/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import React from "react"

const InputListButton = props => {
  const { activeButton, ...others } = props

  return (
    <div>
      {activeButton === true ? (
        <button
          tw="border-b-2 border-gray-100 font-bold text-white hover:font-semibold p-1 mx-2"
          {...others}
        />
      ) : (
        <button tw="text-gray-200 hover:font-semibold p-1 mx-2" {...others} />
      )}
    </div>
  )
}

export default InputListButton
