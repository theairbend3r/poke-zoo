/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import { useState, useCallback, useRef } from "react"
import Webcam from "react-webcam"
import { useDispatch } from "react-redux"
import { storeInputImage } from "../findSlice"

const CaptureImageComponent = () => {
  const webcamRef = useRef(null)

  const dispatch = useDispatch()

  const videoConstraints = {
    facingMode: "environment",
  }

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    dispatch(storeInputImage({ uploadedImage: imageSrc }))
  }, [webcamRef])

  return (
    <div tw="flex flex-col items-center text-gray-100 px-1 py-4">
      <Webcam
        tw="rounded"
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <button
        onClick={capture}
        tw="rounded border border-white text-gray-100 hover:bg-gray-100 hover:font-semibold hover:text-gray-900 px-4 py-1 mt-1"
        type="submit"
      >
        capture
      </button>
    </div>
  )
}

export default CaptureImageComponent
