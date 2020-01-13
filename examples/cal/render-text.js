import { cal } from '../../src/cal'

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
const cellSize = 4
const calWidth = 7 * cellSize + 8
monthNames.forEach(function (monthName, index) {
  const label = `${monthName} ${year}`
  console.log(`${' '.repeat((calWidth - label.length) / 2)}${label}`) // centers the label over the calendar
  const representation = cal.represent({date: new Date(year, index)})
  const renderData = [['S', 'M', 'T', 'W', 'T', 'F', 'S']]
  renderData
    .concat(representation.month.weeks)
    .map(week => week
      .map(day => '' + (day || '')) // coerce each day to a string
      .map(stringDay => stringDay.padStart(cellSize, ' '))
      .join(' ')
    )
    .forEach(weekString => console.log(weekString))
})
