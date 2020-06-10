/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { trySignup } from "../../../authSlice"

const ModalSignup = props => {
  const { signupModalBool, setSignupModalBool } = props
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  let history = useHistory()
  let location = useLocation()

  let { from } = location.state || { from: { pathname: "/" } }

  const attemptSignup = e => {
    e.preventDefault()
    dispatch(trySignup(username, password))
    history.replace(from)
  }

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
        <form onSubmit={attemptSignup} tw="">
          <input
            tw="my-1"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="username"
          />
          <input
            tw="my-1"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button
            type="submit"
            tw="my-1 p-1 rounded bg-gray-800 text-gray-100 hover:bg-gray-900"
          >
            sign up
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModalSignup
