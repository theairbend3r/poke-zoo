// This is the Navbar component. It is present on all webpages.

/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import React from "react"
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { selectorAuth, logout } from "../authSlice"

const Navbar = () => {
  const authState = useSelector(selectorAuth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <nav tw="flex flex-row p-2 md:p-4 justify-between items-center text-gray-200 bg-purple-700 sm:text-lg">
        <NavLink tw="hover:text-white hover:font-semibold" to="/home">
          <h3> PokeZoo</h3>
        </NavLink>
        {authState.isUserLoggedIn && (
          <ul tw="flex flex-row">
            <li tw="mx-1 md:mx-2">
              <NavLink tw="hover:text-white hover:font-semibold" to="/home">
                home
              </NavLink>
            </li>
            <li tw="mx-1 md:mx-2">
              <NavLink tw="hover:text-white hover:font-semibold" to="/explore">
                explore
              </NavLink>
            </li>
            <li tw="mx-1 md:mx-2">
              <NavLink tw="hover:text-white hover:font-semibold" to="/find">
                find
              </NavLink>
            </li>
            <li tw="mx-1 md:mx-2">
              <button
                onClick={handleLogout}
                tw="p-1 text-sm rounded bg-gray-200 text-gray-900 hover:font-semibold"
              >
                logout
              </button>
            </li>
          </ul>
        )}
      </nav>
    </div>
  )
}

export default Navbar
