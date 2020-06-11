/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"
import "tailwindcss/dist/base.css"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom"

import { selectorAuth, tryAutoLogin } from "./authSlice"

import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import Navbar from "./components/Navbar"
import Landing from "./features/landing/Landing"
import Home from "./features/home/Home"
import Explore from "./features/explore/Explore"

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authState = useSelector(selectorAuth)

  return (
    <Route
      {...rest}
      render={props => {
        if (authState.isUserLoggedIn) {
          return <Component {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      }}
    />
  )
}

const AuthRoute = ({ component: Component, ...rest }) => {
  const authState = useSelector(selectorAuth)

  const location = useLocation()
  return (
    <Route
      {...rest}
      render={props => {
        if (!authState.isUserLoggedIn) {
          return <Component {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: "/home",
                state: {
                  from: location,
                },
              }}
            />
          )
        }
      }}
    />
  )
}

const App = () => {
  const dispatch = useDispatch()
  const authState = useSelector(selectorAuth)

  useEffect(() => {
    dispatch(tryAutoLogin())
  }, [])

  return (
    <Router>
      <div tw="flex flex-col bg-green-100 min-h-screen">
        <Navbar />
        <Switch>
          <AuthRoute exact path="/" component={Landing} />
          <ProtectedRoute path="/home" component={Home} />
          <ProtectedRoute path="/explore" component={Explore} />
          <Route path="*" component={() => "404 Not found."} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
