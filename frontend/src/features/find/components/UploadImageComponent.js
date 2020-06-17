/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import React from "react"

import { useDispatch } from "react-redux"
import { storeInputImage } from "../findSlice"

const UploadImageComponent = () => {
  const dispatch = useDispatch()

  const handleImageUpload = e => {
    dispatch(
      storeInputImage({ uploadedImage: URL.createObjectURL(e.target.files[0]) })
    )
  }

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

export default UploadImageComponent
