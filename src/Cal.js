import { get } from './get'

const defaults = {
  represent: {
    unit: 'month',
    date: () => new Cal.DateAdapter()
  }
}

const getDefault = function (path) {
  const value = get(defaults, path)
  return (typeof value === 'function') ? value() : value
}

export class Cal {
  represent (args = defaults.represent) {
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
Cal.DateAdapter = Date

module.exports.Cal = Cal
export default Cal
