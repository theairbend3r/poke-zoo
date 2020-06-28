/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import React from "react"
import LinkedinIcon from "../Icons/Linkedin"
import MediumIcon from "../Icons/Medium"
import TwitterIcon from "../Icons/Twitter"
import GithubIcon from "../Icons/Github"

const Footer = () => {
  return (
    <div>
      <footer tw="flex flex-row items-center justify-center w-full text-gray-900 bg-blue-100 text-sm mt-4">
        Developed by Akshaj Verma.
        <a href="https://www.linkedin.com/in/akshajverma7/">
          <LinkedinIcon tw="h-3 w-3 mx-1" />
        </a>
        <a href="https://medium.com/@theairbend3r">
          <MediumIcon tw="h-3 w-3 mx-1" />
        </a>
        <a href="https://github.com/theairbend3r/">
          <GithubIcon tw="h-3 w-3 mx-1" />
        </a>
        <a href="https://twitter.com/theairbend3r">
          <TwitterIcon tw="h-3 w-3 mx-1" />
        </a>
      </footer>
    </div>
  )
}

export default Footer
