import { get } from './get'
import { map } from './map'

const defaults = {
  represent: {
    unit: 'month',
    date: () => new cal.DateAdapter(),
    startingDayOfWeek: 0
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
      date = getDefault('represent.date'),
      ...remainingArgs
    } = args

    const parts = representUnit({
      unit,
      date,
      ...remainingArgs
    })

    return {
      unit,
      date,
      ...parts
    }
  }
}
cal.DateAdapter = Date
cal.DayOfWeek = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6
}

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
  const {
    date,
    startingDayOfWeek = getDefault('represent.startingDayOfWeek')
  } = args

  const firstOfMonth = new cal.DateAdapter(date.valueOf())
  firstOfMonth.setUTCDate(1)
  const firstOfMonthWeekday = firstOfMonth.getUTCDay()
  const numberOfDays = getDaysInMonth(1 + date.getUTCMonth())
  const days = (new Array(numberOfDays))
    .fill(1)
    .map((value, index) => value + index)

  startingDayOfWeek//?
  return {
    month: {
      numberOfDays,
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

const commonDaysInMonth = [
  31,
  28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
]
const getDaysInMonth = (month, year) => (month === 2 && isLeapYear(year) ? 1 : 0) + commonDaysInMonth[month - 1]

const isLeapYear = year => year !== 0 && year % 4 === 0

module.exports.cal = cal
export default cal
