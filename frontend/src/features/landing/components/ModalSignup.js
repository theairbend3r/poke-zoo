/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import React from "react"

const ModalSignup = props => {
  const { signupModalBool, setSignupModalBool } = props

  return (
    <div tw="flex flex-col text-center h-full w-64 bg-gray-200 text-gray-900 rounded-lg shadow-lg p-2 md:p-4 lg:p-6">
      <div tw="flex flex-row justify-between">
        <p tw="text-lg">Sign up</p>
        <button
          tw="text-sm"
          onClick={() => setSignupModalBool(!signupModalBool)}
        >
          close
        </button>
      </div>
      <div tw="flex flex-col justify-around my-1">
        <form tw="">
          <p tw="my-1">
            username
            <input />
          </p>
          <p tw="my-1">
            password
            <input />
          </p>
          <button tw="my-1 p-1 rounded bg-gray-800 text-gray-100 hover:bg-gray-900">
            sign up
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModalSignup
