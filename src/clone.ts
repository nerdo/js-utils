import map from './map'

export const clone = <T>(obj: T): T =>
  map(obj, (v) => {
    const t = typeof v
    if (t === 'number' || t === 'string' || t === 'boolean' || v === null) {
      return v
    }
    if (Array.isArray(v)) {
      return v.slice().map(clone)
    }
    return {...v as object}
  })
