/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"
import axios from "axios"
import * as tf from "@tensorflow/tfjs"
// import * as mobilenet from "@tensorflow-models/mobilenet"

import { useSelector, useDispatch } from "react-redux"
import { selectorFind, setModel } from "./findSlice"
import { useEffect, useState, useRef } from "react"

const SearchOutput = () => {
  const findState = useSelector(selectorFind)
  const dispatch = useDispatch()
  const imageRef = useRef(null)

  const [model, setModel] = useState(null)

  // NEED TO SERVE A CUSTOM MODEL FROM NODEJS
  useEffect(() => {
    async function fetchModel() {
      // const mobileNetModel = await mobilenet.load()

      const classifierModel = await tf.loadLayersModel(
        // "../../../../classifier_models/original/model.json"
        "http://localhost:3001/api/pokeml/classify"
      )

      setModel(classifierModel)
    }
    fetchModel()
  }, [])

  useEffect(() => {
    async function makePredictions() {
      if (imageRef && model) {
        const imgTensor = tf.browser
          .fromPixels(imageRef.current)
          .resizeNearestNeighbor([224, 224])
          .toFloat()
          .expandDims()

        const pred = await model.predict(imgTensor)
        console.log(pred)
        return pred
      }
    }
    makePredictions()
  }, [findState.uploadedImage])

  return (
    <div tw="flex flex-col text-center p-2 md:flex-row ">
      <div tw="md:w-1/2 m-1">
        <h3 tw="bg-gray-700 mb-1 text-gray-100 font-semibold p-1 rounded">
          Preview Input Image
        </h3>
        <div tw="flex flex-row justify-between">
          <div></div>
          {findState.uploadedImage && (
            <img
              ref={imageRef}
              tw="border border-gray-800 p-1 rounded shadow-lg"
              src={findState.uploadedImage}
              width="600"
              height="600"
            />
          )}
          <div></div>
        </div>
      </div>
      <div tw="md:w-1/2 md:h-screen m-1">
        <h3 tw="bg-gray-700 mb-1 text-gray-100 font-semibold p-1 rounded">
          Search Results
        </h3>
      </div>
    </div>
  )
}

export default SearchOutput
