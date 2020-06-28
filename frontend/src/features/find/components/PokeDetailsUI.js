/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

// A component to display the pokemon attributes.
const PokeDetailsUI = props => {
  const { keyAttribute, val } = props
  return (
    <p tw="flex flex-row justify-between my-2 p-1 bg-gray-700 rounded">
      <span tw="font-semibold text-gray-100 p-1 mx-2 rounded">
        {keyAttribute}
      </span>
      <span tw="font-semibold bg-gray-200 self-stretch text-gray-900 p-1 rounded">
        {val}
      </span>
    </p>
  )
}

export default PokeDetailsUI
