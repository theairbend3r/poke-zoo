/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"
import axios from "axios"
import * as tf from "@tensorflow/tfjs"

import { useSelector, useDispatch } from "react-redux"
import { selectorFind, storePredictions } from "./findSlice"
import { useEffect, useState, useRef } from "react"
import { selectorPokemon } from "../explore/pokemonCardsSlice"

import getTopKPredPokeObj from "./utils/getTopKPred"
import PokemonCardML from "./components/PokemonCardML"

const SearchOutput = () => {
  const findState = useSelector(selectorFind)
  const pokemonState = useSelector(selectorPokemon)

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
        try {
          const classifierModel = await tf.loadLayersModel(MODEL_HTTP_URL)
          setModel(classifierModel)

          await classifierModel.save(MODEL_INDEXEDDB_URL)
          console.log("Model saved to IndexedDB")
        } catch (e) {
          console.log("Unable to load model at all: ", e)
        }
      }
    }
    fetchModel()
  }, [])

  useEffect(() => {
    async function makePredictions() {
      if (imageRef && model) {
        console.log(
          "Uploaded Image from inside the useEffect",
          findState.uploadedImage
        )
        console.log("ImageRef from inside the useEffect", imageRef.current)
        try {
          const imgTensor = tf.browser
            .fromPixels(imageRef.current)
            .resizeNearestNeighbor([160, 160])
            .toFloat()
            .sub(127)
            .div(127)
            .expandDims()

          const y_pred = await model.predict(imgTensor).data()
          console.log(y_pred)
          console.log(pokemonState)

          const topkPredNames = getTopKPredPokeObj(y_pred, 6, pokemonState)

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
        <h3 tw="bg-gray-400 mb-2 text-gray-900 font-semibold p-1 rounded">
          Preview Input Image
        </h3>
        <div tw="flex flex-row justify-between p-1">
          <div></div>
          {console.log(
            "Uploaded Image from inside the useEffect",
            findState.uploadedImage
          )}
          {console.log("ImageRef from inside the useEffect", imageRef.current)}
          {findState.uploadedImage && (
            <img
              ref={imageRef}
              tw="border border-purple-700 p-1 rounded shadow-lg"
              src={findState.uploadedImage}
              width={600}
              height={600}
            />
          )}
          <div></div>
        </div>
      </div>
      <div tw="md:w-1/2 md:h-screen m-1 text-black">
        <h3 tw="bg-gray-400 mb-2 text-gray-900 font-semibold p-1 rounded">
          Search Results (top-6 matches)
        </h3>
        <div tw="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-2 p-1">
          {findState.matchesFound.length === 6 &&
            findState.matchesFound.map(poke => (
              <PokemonCardML
                key={`key-${poke.id}`}
                pokemonId={poke.id}
                pokemonName={poke.name}
                pokemonType={poke.type}
                pokemonHeight={poke.height}
                pokemonWeight={poke.weight}
                pokemonBaseExperience={poke.baseExperience}
                pokemonSprite={poke.sprites}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default SearchOutput
