/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"
import axios from "axios"
import * as tf from "@tensorflow/tfjs"

import { useSelector, useDispatch } from "react-redux"
import { selectorFind, setModel } from "./findSlice"
import { useEffect, useState, useRef } from "react"
import {} from "@tensorflow/tfjs"
import idx2class from "./components/classIdxDict"

const SearchOutput = () => {
  const findState = useSelector(selectorFind)
  const dispatch = useDispatch()
  const imageRef = useRef(null)

  const [model, setModel] = useState(null)
  const [predictions, setPredictions] = useState([])

  const MODEL_HTTP_URL = "http://localhost:3001/api/pokeml/classify"
  const MODEL_INDEXEDDB_URL = "indexeddb://poke-model"

  useEffect(() => {
    async function fetchModel() {
      try {
        const localClassifierModel = await tf.loadLayersModel(
          MODEL_INDEXEDDB_URL
        )
        console.log("Model loaded from IndexedDB")

        setModel(localClassifierModel)
      } catch (e) {
        const classifierModel = await tf.loadLayersModel(MODEL_HTTP_URL)

        await classifierModel.save(MODEL_INDEXEDDB_URL)
        console.log("Model loaded from server and saved to IndexedDB.")
        console.error(e)

        setModel(classifierModel)
      }
    }
    fetchModel()
  }, [])

  useEffect(() => {
    async function makePredictions() {
      if (imageRef && model) {
        try {
          const imgTensor = tf.browser
            .fromPixels(imageRef.current)
            .resizeNearestNeighbor([160, 160])
            .toFloat()
            .expandDims()

          const y_pred = await model.predict(imgTensor).dataSync()
          const topkPred = [...y_pred].sort((a, b) => b - a).slice(0, 5)
          const topkPredIdx = []
          const topkPredNames = []
          topkPred.map(i => topkPredIdx.push(y_pred.indexOf(i)))
          topkPredIdx.map(i => topkPredNames.push(idx2class[i]))

          console.log(topkPredNames)
          console.log(predictions)
          return topkPredNames
        } catch (e) {
          console.log("Unable to run predictions.")
        }
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
        {predictions.map(i => (
          <p key={i}> i </p>
        ))}
      </div>
    </div>
  )
}

export default SearchOutput
