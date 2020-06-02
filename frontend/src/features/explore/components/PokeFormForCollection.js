/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import tw from "twin.macro"

const PokeFormForCollection = props => {
  const {
    collection,
    pokemonId,
    addPokemonToCollection,
    pokemonCollectionInput,
    handlePokemonToCollection,
  } = props

  return (
    <div tw="mt-4">
      {/* A form to add pokemon to collections. */}
      {/* We use select input for this. */}
      <form onSubmit={addPokemonToCollection}>
        <label>
          <select
            tw="rounded"
            value={pokemonCollectionInput.id}
            onChange={handlePokemonToCollection}
          >
            {/* Options for this select input are generated dynamically from the state. */}
            <option value={-1}>...</option>
            {collection.map(clctn => (
              <option key={`${clctn.id}-${pokemonId}`} value={Number(clctn.id)}>
                {clctn.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          tw="rounded border border-white text-gray-100 hover:bg-gray-100 hover:font-semibold hover:text-gray-900 px-4 py-1 ml-2"
        >
          add
        </button>
      </form>
    </div>
  )
}

export default PokeFormForCollection
