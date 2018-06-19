// conver string to title case
export const strToTitleCase = (str) => {
  let handler = (t) => `${t[0].toUpperCase()}${t.substr(1).toLowerCase()}`
  return str.replace(/\w\S*/g, handler)
}
// leaves only specific keys in object
export const only = (obj, keys) => {
  return Object.keys(obj)
    .filter(i => keys.includes(i))
    .reduce((acc, key) => {
      acc[key] = obj[key]
      return acc
    }, {})
}
