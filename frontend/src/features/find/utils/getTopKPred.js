import idx2class from "./classIdxDict"

const getTopKPred = (pred, k) => {
  const predIdx = []
  const predNames = []

  const topkPred = [...pred].sort((a, b) => b - a).slice(0, k)

  topkPred.map(i => predIdx.push(pred.indexOf(i)))
  predIdx.map(i => predNames.push(idx2class[i]))

  return predNames
}

const pokeObjFromName = (pokeName, pokeObjList) => {
  return pokeObjList.find(obj => obj.name === pokeName)
}

const getTopKPredPokeObj = (pred, k, pokeObjList) => {
  const foundPokeObj = []
  const predPokeName = getTopKPred(pred, k)
  predPokeName.map(name =>
    foundPokeObj.push(pokeObjFromName(name, pokeObjList))
  )

  return foundPokeObj
}

export default getTopKPredPokeObj
