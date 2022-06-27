import { representMonth } from '../../src/representMonth'

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const year = 2020
const cellSize = 6
const calWidth = 7 * cellSize + 8
monthNames.forEach((monthName, index) => {
  const label = `${monthName} ${year}`
  console.log(`${' '.repeat((calWidth - label.length) / 2)}${label}`) // centers the label over the calendar
  const representation = representMonth({date: new Date(year, index)}) //?
  const renderData: (string | number | null)[][] = [['S', 'M', 'T', 'W', 'T', 'F', 'S']]
  renderData
    .concat(representation.weeks)
    .map((week, weekIndex) => {
      // checking weekIndex as if it were 1-based because we added the header for the week day labels
      const maybeFirstWeek = weekIndex === 1 ? representation.prevMonthLastWeek : void 0
      const maybeLastWeek = weekIndex === representation.weeks.length ? representation.nextMonthFirstWeek : void 0
      const edgeWeek = maybeFirstWeek || maybeLastWeek
      return week
        .map((day, index) => { // coerce each day to a string
          if (edgeWeek && edgeWeek[index]) return `[${edgeWeek[index] || ''}]`
          return `${day || ''}`
        }) 
        .map((stringDay) => stringDay.padStart(cellSize, ' '))
        .join(' ')
    })
    .forEach((weekString) => console.log(weekString))
})

