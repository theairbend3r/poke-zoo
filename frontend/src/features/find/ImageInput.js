/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw, { styled } from "twin.macro"

import { useState } from "react"

// import components
import UploadImageComponent from "./components/UploadImageComponent"
import CaptureImageComponent from "./components/CaptureImageComponent"
import ImageLinkComponent from "./components/ImageLinkComponent"
import InputListButton from "./components/InputListButton"

const ImageInput = () => {
  const [inputType, setInputType] = useState("upload_image")

  return (
    <div tw="text-gray-100 bg-blue-800 py-8 px-2 md:py-10 md:px-4">
      <section tw="flex flex-col">
        <h3 tw=" text-lg md:text-xl text-center">Find Pokemon by Image</h3>
        <div tw="flex flex-col">
          <ul tw="flex flex-row text-gray-100 justify-center text-sm sm:text-base">
            <li>
              <InputListButton
                activeButton={inputType === "upload_image"}
                onClick={() => setInputType("upload_image")}
              >
                upload image
              </InputListButton>
            </li>
            <li>
              <InputListButton
                activeButton={inputType === "capture_image"}
                onClick={() => setInputType("capture_image")}
              >
                capture image
              </InputListButton>
            </li>
            {/* <li>
              <InputListButton
                activeButton={inputType === "image_link"}
                onClick={() => setInputType("image_link")}
              >
                image link
              </InputListButton>
            </li> */}
          </ul>
          <div tw="text-center">
            {inputType === "upload_image" ? (
              <UploadImageComponent />
            ) : inputType === "capture_image" ? (
              <CaptureImageComponent />
            ) : (
              <div> CANNOT DISPLAY INPUT COMPONENTS </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

// : inputType === "image_link" ? (
//   <ImageLinkComponent />
// )

export default ImageInput
