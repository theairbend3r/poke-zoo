/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import styled from "@emotion/styled"
import tw from "twin.macro"

import React, { useState, useEffect } from "react"

import mobile_phone_wallpaper from "./assets/images/pikachu_phone.jpg"
import desktop_wallpaper from "./assets/images/pikachu.jpg"

import ModalSignup from "./components/ModalSignup"
import ModalLogin from "./components/ModalLogin"

const ButtonBase = styled.button(
  tw`hover:text-gray-900 hover:bg-gray-100 border border-white rounded font-semibold text-lg p-2 m-2 md:text-xl md:px-2 md:px-4 lg:text-2xl lg:py-4 lg:px-6`
)

const Landing = () => {
  const [loginModalBool, setLoginModalBool] = useState(false)
  const [signupModalBool, setSignupModalBool] = useState(false)

  const imageUrl =
    window.innerWidth >= 650 ? desktop_wallpaper : mobile_phone_wallpaper

  return (
    <div
      css={[
        tw`flex flex-1 flex-col items-center justify-around h-screen w-full`,
        css`
          background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url(${imageUrl});
          ${tw`bg-auto bg-cover bg-center bg-no-repeat`}
        `,
      ]}
    >
      <div>
        <h1 tw="text-white text-4xl md:text-4xl lg:text-6xl font-bold">
          PokeZoo
        </h1>
      </div>
      <div tw="flex flex-col text-white">
        {signupModalBool === true ? (
          <ModalSignup
            signupModalBool={signupModalBool}
            setSignupModalBool={setSignupModalBool}
          />
        ) : loginModalBool === true ? (
          <ModalLogin
            loginModalBool={loginModalBool}
            setLoginModalBool={setLoginModalBool}
          />
        ) : (
          <div>
            <ButtonBase onClick={() => setLoginModalBool(!loginModalBool)}>
              log in
            </ButtonBase>
            <ButtonBase onClick={() => setSignupModalBool(!signupModalBool)}>
              sign up
            </ButtonBase>
          </div>
        )}
      </div>

      <div></div>
    </div>
  )
}

export default Landing
