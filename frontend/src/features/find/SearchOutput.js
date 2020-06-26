/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"
import axios from "axios"
import * as tf from "@tensorflow/tfjs"

import { useSelector, useDispatch } from "react-redux"
import { selectorFind, storePredictions } from "./findSlice"
import { useEffect, useState, useRef } from "react"
import idx2class from "./components/classIdxDict"
import { loadLayersModel } from "@tensorflow/tfjs"

const SearchOutput = () => {
  const findState = useSelector(selectorFind)
  const imageRef = useRef(null)
  const dispatch = useDispatch()
  // const [imageRef, setImageRef] = useState(null)

  // const onChangeRef = useCallback(node => {
  //   setImageRef(node)
  // }, [])

  const [model, setModel] = useState(null)

  const MODEL_HTTP_URL = "api/pokeml/classify"
  const MODEL_INDEXEDDB_URL = "indexeddb://poke-model"

  useEffect(() => {
    async function fetchModel() {
      try {
        const localClassifierModel = await tf.loadLayersModel(
          MODEL_INDEXEDDB_URL
        )

        setModel(localClassifierModel)
        console.log("Model loaded from IndexedDB")
      } catch (e) {
        const classifierModel = await tf.loadLayersModel(MODEL_HTTP_URL)
        setModel(classifierModel)

        await classifierModel.save(MODEL_INDEXEDDB_URL)

        console.log(e)
      }
    }
    fetchModel()
  }, [])

  const getTopKPred = (pred, k) => {
    const predIdx = []
    const predNames = []

    const topkPred = [...pred].sort((a, b) => b - a).slice(0, k)

    topkPred.map(i => predIdx.push(pred.indexOf(i)))
    predIdx.map(i => predNames.push(idx2class[i]))

    return predNames
  }

  useEffect(() => {
    async function makePredictions() {
      if (imageRef && model) {
        console.log(findState.uploadedImage)
        console.log(imageRef.current)
        try {
          const imgTensor = tf.browser
            .fromPixels(imageRef.current)
            .resizeNearestNeighbor([160, 160])
            .toFloat()
            .sub(127)
            .div(127)
            .expandDims()

          const y_pred = await model.predict(imgTensor)
          const topkPredNames = getTopKPred(y_pred, 5)
          dispatch(storePredictions({ predictions: topkPredNames }))

          console.log(topkPredNames)

          return topkPredNames
        } catch (e) {
          console.log("Unable to run predictions.", e)
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
      <div tw="md:w-1/2 md:h-screen m-1 text-black">
        <h3 tw="bg-gray-700 mb-1 text-gray-100 font-semibold p-1 rounded">
          Search Results
        </h3>
        {findState.matchesFound.map(poke => (
          <p key={poke}> {poke} </p>
        ))}
      </div>
    </div>
  )
}

export default SearchOutput
