interface Mapper {
  (value: unknown, obj: object, path?: Array<string>): unknown
}

interface Meta {
  root: any,
  parentPath: string[]
}

const recursiveMap = <T>(obj: T, mapper: Mapper, meta: Meta): any => {
  if (typeof obj !== 'object') {
    return obj
  }

  for (const key in obj as unknown as object) {
    obj[key] = mapper(obj[key], {object: meta.root, path: [].concat(meta.parentPath, key)})
    const current = obj[key]
    if (typeof current === 'object' && !Array.isArray(current)) {
      recursiveMap(current, mapper, {...meta, parentPath: meta.parentPath.concat(key)})
    }
  }

  return obj
}

export const map = <I, O>(obj: I, mapper: Mapper): O => {
  const subject = typeof mapper === 'function' ? mapper(obj, {object: obj, path: []}) : obj
  return recursiveMap(subject, mapper, {root: obj, parentPath: []})
}

export default map
