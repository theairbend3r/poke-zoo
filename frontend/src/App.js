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

import { selectorAuth } from "./authSlice"

import React from "react"
import { useSelector } from "react-redux"

import Navbar from "./components/Navbar"
import Landing from "./features/landing/Landing"
import Home from "./features/home/Home"
import Explore from "./features/explore/Explore"

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authState = useSelector(selectorAuth)
  const location = useLocation()
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
  return (
    <Router>
      <div tw="flex flex-col bg-green-100 min-h-screen">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <ProtectedRoute path="/home" component={Home} />
          <ProtectedRoute path="/explore" component={Explore} />
          <Route path="*" component={() => "404 Not found."} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
