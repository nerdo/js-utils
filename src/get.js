export const get = function (obj, path, defaultValue) {
  const pathParts = Array.isArray(path) ? path : (typeof path === 'string' ? path.split('.') : [])
  return pathParts.reduce(
    (o, key) => typeof o === 'undefined' ? defaultValue : o[key],
    obj
  )
}
module.exports.get = get
export default get
