const recursiveMap = function (obj, mapper, meta) {
  if (typeof obj !== 'object') {
    return obj
  }

  for (const key in obj) {
    obj[key] = mapper(obj[key], {object: meta.root, path: [].concat(meta.parentPath, key)})
    const current = obj[key]
    if (typeof current === 'object' && !Array.isArray(current)) {
      recursiveMap(current, mapper, {...meta, parentPath: meta.parentPath.concat(key)})
    }
  }

  return obj
}

export const map = function (obj, mapper) {
  const subject = typeof mapper === 'function' ? mapper(obj, {object: obj, path: []}) : obj
  return recursiveMap(subject, mapper, {root: obj, parentPath: []})
}

module.exports.map = map
export default map
