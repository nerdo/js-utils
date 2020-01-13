export const cal = {
  represent (args = expandDefaults(defaults.represent)) {
    const {
      unit = getDefault('unit', defaults.represent),
      date = getDefault('date', defaults.represent),
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
  },

  DateAdapter: Date,

  DayOfWeek: {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
  }
}

const defaults = {
  represent: {
    unit: 'month',
    date: () => new cal.DateAdapter(),
    startingDayOfWeek: cal.DayOfWeek.Sunday
  }
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
    startingDayOfWeek = getDefault('startingDayOfWeek', defaults.represent)
  } = args

  const firstOfMonth = new cal.DateAdapter(date.valueOf())
  firstOfMonth.setDate(1)
  const firstDayOfWeek = firstOfMonth.getDay()
  const numberOfDays = getDaysInMonth(1 + date.getMonth(), date.getFullYear())
  const prependAdjustment = firstDayOfWeek > startingDayOfWeek ? 0 : 7
  const prepend = (new Array(prependAdjustment + firstDayOfWeek - startingDayOfWeek))
    .fill(null)
  const append = (new Array((7 - (prepend.length + numberOfDays) % 7) % 7))
    .fill(null)
  const days = (new Array(numberOfDays))
    .fill(1)
    .map((value, index) => value + index)
  const weeks = prepend
    .concat(days, append)
    .reduce(
      (container, value) => {
        const last = container[container.length - 1]
        const needNewWeek = !last || last.length === 7
        const current = !needNewWeek ? last : []
        if (needNewWeek) {
          container.push(current)
        }
        current.push(value)
        return container
      },
      []
    )

  return {
    month: {
      numberOfDays,
      weeks
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

const getDefault = function (path, container) {
  const value = container[path]
  return (typeof value === 'function') ? value() : value
}

const expandDefaults = function (obj) {
  const o = {}
  for (const k in obj) {
    const v = obj[k]
    o[k] = typeof v === 'function' ? v() : v
  }
  return o
}

module.exports.cal = cal
export default cal
