/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

import React, { useState } from "react"

import CollectionCard from "./components/CollectionCard"
import { useSelector, useDispatch } from "react-redux"
import { create, selectorCollection } from "./collectionSlice"

const Collection = () => {
  const [collectionName, setCollectionName] = useState("")
  const dispatch = useDispatch()
  const collection = useSelector(selectorCollection)

  const handleCollectionCreation = e => {
    e.preventDefault()
    dispatch(create(collectionName))
    setCollectionName("")
  }

  return (
    <div tw="p-2 md:p-4">
      <section tw="text-base md:text-lg lg:text-xl">
        <h3 tw="mx-1"> Your Collection </h3>
        <form onSubmit={handleCollectionCreation}>
          <input
            tw="rounded border border-purple-700 m-1"
            value={collectionName}
            onChange={e => setCollectionName(e.target.value)}
          />
          <button
            tw="bg-purple-700 hover:bg-purple-800 text-gray-200 hover:text-white rounded p-1 m-1"
            type="submit"
          >
            create collection
          </button>
        </form>
      </section>
      <section tw="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-2">
        {collection.map(col => (
          <CollectionCard key={col.id} collectionObj={col} />
        ))}
      </section>
    </div>
  )
}

export default Collection
