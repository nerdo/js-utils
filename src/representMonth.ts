import { DayOfWeek } from './DayOfWeek';

export interface DateInterface {
  setDate: (dayValue: number) => void
  getDay: () => number
}

export interface ReferenceDateInterface {
  valueOf(): number
  getMonth(): number
  getFullYear(): number
}

export interface RepresentMonthFunctionArgs {
  date?: ReferenceDateInterface,
  startingDayOfWeek?: DayOfWeek
}

export interface DateConstructor {
  new (unixTimestampMilliseconds?: number): DateInterface
}

export interface Month {
  date: ReferenceDateInterface
  numberOfDays: number
  weeks: Array<Array<number>>
}

export interface RepresentMonthFunction {
  (args?: RepresentMonthFunctionArgs): Month
  DateAdapter: DateConstructor
}

const defaults = {
  date: () => new representMonth.DateAdapter(),
  startingDayOfWeek: 0
}

export const representMonth: RepresentMonthFunction = function (args = <RepresentMonthFunctionArgs> expandDefaults(defaults)) {
  const {
    date = <ReferenceDateInterface> getDefault('date', defaults),
    startingDayOfWeek = getDefault('startingDayOfWeek', defaults)
  } = args

  const firstOfMonth = new representMonth.DateAdapter(date.valueOf())
  firstOfMonth.setDate(1)
  const firstDayOfWeek = firstOfMonth.getDay()
  const numberOfDays = getDaysInMonth(1 + date.getMonth(), date.getFullYear())
  const prependAdjustment = firstDayOfWeek > startingDayOfWeek ? 0 : 7
  const prepend = (new Array((prependAdjustment + firstDayOfWeek - startingDayOfWeek) % 7))
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
    date,
    numberOfDays,
    weeks
  }
}
representMonth.DateAdapter = Date

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
const getDaysInMonth = (month: number, year: number) => (month === 2 && isLeapYear(year) ? 1 : 0) + commonDaysInMonth[month - 1]

const isLeapYear = (year: number) => year !== 0 && year % 4 === 0

const getDefault = <Container extends Object>(path: keyof Container, container: Container) => {
  const value = container[path]
  return (typeof value === 'function') ? value() : value
}

const expandDefaults = (obj: Object) => {
  const o = {}
  for (const k in obj) {
    const v = obj[k]
    o[k] = typeof v === 'function' ? v() : v
  }
  return o
}

export default representMonth
