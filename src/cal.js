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

    return {
      unit,
      date
    }
  }
}
cal.DateAdapter = Date

module.exports.cal = cal
export default cal
