/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"
import styled from "@emotion/styled/macro"

// generating colours like this because twin.macro doesn't
// support passing colours as strings
const generatePokeTypeColor = color => {
  switch (color) {
    case "normal":
      return tw`bg-orange-700`
    case "fighting":
      return tw`bg-red-800`
    case "flying":
      return tw`bg-purple-600`
    case "poison":
      return tw`bg-pink-800`
    case "ground":
      return tw`bg-yellow-600`
    case "rock":
      return tw`bg-yellow-800`
    case "bug":
      return tw`bg-green-600`
    case "ghost":
      return tw`bg-purple-900`
    case "steel":
      return tw`bg-gray-600`
    case "fire":
      return tw`bg-orange-500`
    case "water":
      return tw`bg-blue-500`
    case "grass":
      return tw`bg-green-800`
    case "electric":
      return tw`bg-yellow-500`
    case "psychic":
      return tw`bg-pink-600`
    case "ice":
      return tw`bg-blue-300`
    case "dragon":
      return tw`bg-purple-400`
    case "dark":
      return tw`bg-orange-900`
    case "fairy":
      return tw`bg-pink-300`
    case "unknown":
      return tw`bg-gray-500`
    case "shadow":
      return tw`bg-gray-700`
    default:
      return tw`bg-white`
  }
}

// generate a styled p tag with dynamic background colour.
const PokeTypeColorElement = styled.p`
  ${({ color }) => generatePokeTypeColor(color)}
`
export default PokeTypeColorElement
