import map from './map'

export const clone = <T>(subject: T): T =>
  map(subject, v => {
    const t = typeof v

    if (t === 'undefined' || t === 'number' || t === 'string' || t === 'boolean' || v === null) {
      return v
    }

    if (Array.isArray(v)) {
      return v.slice().map(clone)
    }

    return { ...(v as object) }
  })
