import { get } from './get'
import { map } from './map'

const defaults = {
  represent: {
    unit: 'month',
    date: () => new cal.DateAdapter()
  }
}

const getDefault = function (path) {
  const value = get(defaults, path)
  return (typeof value === 'function') ? value() : value
}

const cloneSimpleObject = o => typeof o === 'object' && Object.getPrototypeOf(o) === Object.prototype ? {...o} : o

const expandDefaults = obj => map(obj, v => typeof v === 'function' ? v() : cloneSimpleObject(v))

export const cal = {
  represent (args = expandDefaults(defaults.represent)) {
    const {
      unit = getDefault('represent.unit'),
      date = getDefault('represent.date')
    } = args

    const parts = representUnit(args)

    return {
      unit,
      date,
      ...parts
    }
  }
}
cal.DateAdapter = Date

const representUnit = function (args) {
  const {
    unit,
    ...unitArgs
  } = args

  if (unit === 'month') {
    return representMonth(unitArgs)
  }
}

const representMonth = function (args) {
  return {
    month: {
      weeks: [
        [null, null, null, 1, 2, 3, 4],
        [5, 6, 7, 8, 9, 10, 11],
        [12, 13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24, 25],
        [26, 27, 28, 29, 30, 31, null]
      ]
    }
  }
}

module.exports.cal = cal
export default cal
