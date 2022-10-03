import { DayOfWeek, DayOfWeekValues } from './DayOfWeek'

export interface DateInterface {
  setDate: (dayValue: number) => void
  getDay: () => number
  valueOf(): number
  getMonth(): number
  getFullYear(): number
}

export interface RepresentMonthFunctionArgs {
  date?: DateInterface
  startingDayOfWeek?: DayOfWeekValues
}

export interface DateConstructor {
  new (unixTimestampMilliseconds?: number): DateInterface
}

export type Day = number | null

export interface Month {
  date: DateInterface
  numberOfDays: number
  weeks: Day[][]
  prevMonthNumberOfDays: number
  prevMonthLastWeek: Day[]
  nextMonthNumberOfDays: number
  nextMonthFirstWeek: Day[]
}

export interface RepresentMonthFunction {
  (args?: RepresentMonthFunctionArgs): Month
  DateAdapter: DateConstructor
}

const defaults = {
  date: () => new representMonth.DateAdapter(),
  startingDayOfWeek: DayOfWeek.Sunday,
}

const makeCounterGenerator = (n: number, offset: number) => {
  const valueKey = Symbol.for('value')

  return {
    [valueKey]: void 0 as number | undefined,
    next() {
      this[valueKey] = this[valueKey] === void 0 ? n : (this[valueKey] as number) + offset

      return this
    },
    get value() {
      return this[valueKey]
    },
  }
}

export const representMonth: RepresentMonthFunction = (args = expandFlatDefaults(defaults)) => {
  const { date = getDefault('date', defaults), startingDayOfWeek = getDefault('startingDayOfWeek', defaults) } = args

  const firstOfMonth = new representMonth.DateAdapter(date.valueOf())
  firstOfMonth.setDate(1)
  const currentMonthNumber = date.getMonth()
  const currentYear = date.getFullYear()
  const firstDayOfWeek = firstOfMonth.getDay()
  const numberOfDays = numDaysInMonth(currentMonthNumber, currentYear)
  const prependAdjustment = firstDayOfWeek > startingDayOfWeek ? 0 : 7
  const prepend = new Array((prependAdjustment + firstDayOfWeek - startingDayOfWeek) % 7).fill(null)
  const append = new Array((7 - ((prepend.length + numberOfDays) % 7)) % 7).fill(null)
  const days = new Array(numberOfDays).fill(1).map((value, index) => value + index)
  const weeks: (number | null)[][] = prepend.concat(days, append).reduce((container, value) => {
    const last = container[container.length - 1]
    const needNewWeek = !last || last.length === 7
    const current = !needNewWeek ? last : []
    if (needNewWeek) {
      container.push(current)
    }
    current.push(value)
    return container
  }, [])
  const prevMonthNumberOfDays = numDaysInMonth(currentMonthNumber === 0 ? 11 : currentMonthNumber - 1, currentYear - (currentMonthNumber === 0 ? 1 : 0))
  const numPrevNulls = weeks[0].filter(n => n === null).length
  const prevMonthLastWeek: Day[] = new Array(numPrevNulls)
    .fill(null)
    .map((_, index) => 1 + prevMonthNumberOfDays - (numPrevNulls - index))
    .concat(new Array(Math.max(0, 7 - numPrevNulls)).fill(null))
  const nextMonthNumberOfDays = numDaysInMonth(currentMonthNumber === 11 ? 0 : currentMonthNumber + 1, currentYear + (currentMonthNumber === 11 ? 1 : 0))
  const nextMonthGenerator = makeCounterGenerator(1, 1)
  const nextMonthFirstWeek: Day[] = [...weeks[weeks.length - 1]].map(value => (value === null ? nextMonthGenerator.next().value : null)) as Day[]

  return {
    date,
    numberOfDays,
    weeks,
    prevMonthNumberOfDays,
    prevMonthLastWeek,
    nextMonthNumberOfDays,
    nextMonthFirstWeek,
  }
}
representMonth.DateAdapter = Date

const commonDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

/**
 * Gets the number of days in a calendar month (0 = January, 11 = December).
 */
export const numDaysInMonth = (month: number, year: number) => (month === 1 && isLeapYear(year) ? 1 : 0) + commonDaysInMonth[month]

/**
 * Whether or not year is a leap year.
 */
export const isLeapYear = (year: number) => year !== 0 && year % 4 === 0

const getDefault = <Container extends object>(path: keyof Container, container: Container) => {
  const value = container[path]
  return typeof value === 'function' ? value() : value
}

export type ExpandedFunctionCalls<Obj extends object> = {
  [Key in keyof Obj]: Obj[Key] extends () => unknown ? ReturnType<Obj[Key]> : Obj[Key]
}

const expandFlatDefaults = <T extends object>(obj: T): ExpandedFunctionCalls<T> => {
  return Object.fromEntries(
    Object.keys(obj).map(k => {
      const v = obj[k as keyof typeof obj]
      return [k, typeof v === 'function' ? v() : v]
    })
  ) as ExpandedFunctionCalls<T>
}

export default representMonth
