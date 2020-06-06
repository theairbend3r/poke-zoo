/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { tryLogin } from "../../../authSlice"

const ModalLogin = props => {
  const { loginModalBool, setLoginModalBool } = props
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  let history = useHistory()
  let location = useLocation()

  let { from } = location.state || { from: { pathname: "/" } }

  const attemptLogin = e => {
    e.preventDefault()
    dispatch(tryLogin(username, password))
    history.replace(from)
  }

  return (
    <div tw="flex flex-col text-center h-full w-64 bg-gray-200 text-gray-900 rounded-lg shadow-lg p-2 md:p-4 lg:p-6">
      <div tw="flex flex-row justify-between">
        <p tw="text-lg">Login</p>
        <button tw="text-sm" onClick={() => setLoginModalBool(!loginModalBool)}>
          close
        </button>
      </div>
      <div tw="flex flex-col justify-around my-1">
        <form onSubmit={attemptLogin} tw="">
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
            log in
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModalLogin
