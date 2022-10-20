import map from './map'
import isDate from './isDate'

export const clone = <T>(subject: T): T =>
  map(subject, (v) => {
    const t = typeof v

    if (t === 'undefined' || t === 'number' || t === 'string' || t === 'boolean' || v === null) {
      return v
    }

    if (Array.isArray(v)) {
      return v.slice().map(clone)
    }

    if (isDate(v)) {
      return new Date((v as Date).valueOf())
    }

    return { ...(v as object) }
  })
