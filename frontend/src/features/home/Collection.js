/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"
import { v4 as uuidv4 } from "uuid"

import React, { useState, useEffect } from "react"

import CollectionCard from "./components/CollectionCard"
import { useSelector, useDispatch } from "react-redux"
import {
  createCollection,
  fetchCollection,
  selectorCollection,
} from "./collectionSlice"
import { selectorAuth, tryAutoLogin } from "../../authSlice"

const Collection = () => {
  const [collectionName, setCollectionName] = useState("")
  const dispatch = useDispatch()
  const collectionState = useSelector(selectorCollection)
  const authState = useSelector(selectorAuth)

  // Try autologin
  useEffect(() => {
    dispatch(tryAutoLogin())
  }, [dispatch])

  // Fetch collection by dispatching the action with username.
  useEffect(() => {
    dispatch(fetchCollection(authState.username))
  }, [dispatch, authState.username])

  const handleCollectionCreation = e => {
    e.preventDefault()
    const newCollection = {
      collectionId: uuidv4(),
      collectionName: collectionName,
      username: authState.username,
      pokemons: [],
    }

    dispatch(createCollection(newCollection))
    setCollectionName("")
  }

  return (
    <div tw="p-2 md:p-4">
      <section tw="text-base md:text-lg lg:text-xl">
        {/* <h3 tw="mx-1"> Your Collection </h3> */}
        <form tw="text-center" onSubmit={handleCollectionCreation}>
          <input
            tw="rounded text-gray-900 border border-purple-700 p-1 m-1"
            value={collectionName}
            onChange={e => setCollectionName(e.target.value)}
            placeholder="enter collection name"
          />
          <button
            tw="bg-purple-700 hover:bg-purple-800 text-gray-200 hover:text-white rounded p-1 m-1"
            type="submit"
          >
            create
          </button>
        </form>
      </section>
      <section tw="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-2 mt-4">
        {collectionState.map(col => (
          <CollectionCard key={col.collectionId} collectionObj={col} />
        ))}
      </section>
    </div>
  )
}

export default Collection
