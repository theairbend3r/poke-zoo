/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw, { styled } from "twin.macro"

import React, { useState } from "react"

const UploadImageComponent = props => {
  const { handleImageUpload } = props
  return (
    <div tw="text-gray-100 px-1 py-4">
      <input
        onChange={handleImageUpload}
        tw="rounded text-gray-200"
        type="file"
      />
    </div>
  )
}

const CaptureImageComponent = props => {
  return (
    <div tw="text-gray-100 px-1 py-4">
      <button
        tw="rounded border border-white text-gray-100 hover:bg-gray-100 hover:font-semibold hover:text-gray-900 px-4 py-1 ml-2"
        type="submit"
      >
        capture
      </button>
    </div>
  )
}

const ImageLinkComponent = props => {
  const { handleImageUpload } = props

  return (
    <div tw="text-gray-100 text-center px-1 py-4">
      <form>
        <input
          onChange={handleImageUpload}
          tw="rounded text-gray-900 p-1"
          placeholder="enter link to image"
        />
        <button
          tw="rounded border border-white text-gray-100 hover:bg-gray-100 hover:font-semibold hover:text-gray-900 px-4 py-1 ml-2"
          type="submit"
        >
          search
        </button>
      </form>
    </div>
  )
}

const InputListButton = props => {
  const { activeButton, ...others } = props
  return (
    <div>
      {activeButton === true ? (
        <button
          tw="border-b-2 sm:border-l-2 border-gray-100 font-bold text-white hover:font-semibold p-1"
          {...others}
        />
      ) : (
        <button tw="text-gray-100 hover:font-semibold p-1" {...others} />
      )}
    </div>
  )
}

const ImageInput = () => {
  const [inputType, setInputType] = useState("upload_image")
  const [uploadedImage, setUploadedImage] = useState([])

  const handleImageUpload = e => {
    setUploadedImage(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div tw="text-gray-100 bg-blue-800 py-8 px-2 md:py-10 md:px-4">
      <section tw="flex flex-col">
        <h3 tw=" text-lg md:text-xl text-center">Search Pokemon by Image</h3>
        <div tw="flex flex-col sm:flex-row sm:justify-center sm:items-center">
          <ul tw="flex flex-row sm:flex-col text-gray-100 justify-center text-sm sm:text-base">
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
            <li>
              <InputListButton
                activeButton={inputType === "image_link"}
                onClick={() => setInputType("image_link")}
              >
                image link
              </InputListButton>
            </li>
          </ul>
          <div tw="text-center">
            {inputType === "upload_image" ? (
              <UploadImageComponent handleImageUpload={handleImageUpload} />
            ) : inputType === "capture_image" ? (
              <CaptureImageComponent />
            ) : inputType === "image_link" ? (
              <ImageLinkComponent />
            ) : (
              "lol"
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ImageInput
