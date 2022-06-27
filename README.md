# @nerdo/utils
> nerdo's JavaScript utilities.

Install it:

```bash
npm install @nerdo/utils --save
```

### map(object, mapper)
`import { map } from '@nerdo/utils'`
> A recursive mapping function for objects.

* `object` _{object}_: the object to map.
* `mapper` _{function}_: a function that handles the mapping.

`map(...)` returns the object

`map` traverses key-value pairs in an object recursively, calling the mapper on it and replacing each value with what the mapper returns.

`mapper` has the signature `mapper(value, {object, path})`.

* `value` _{mixed}_: the current value being mapped.
* `object` _{object}_: the root object the mapping is being performed on.
* `path`: _{array}_: the list of keys identifying to the current value being mapped.

Here is simple example, filtering out all values that are numeric from the object:

```js
const obj = {
    name: 'John Doe',
    age: 42,
    dateOfBirth: new Date(1973, 1, 7),
    misc: {
        height: 136,
        weight: 159
    }
}
const mapper = v => typeof v === 'number' ? undefined : v
map(obj, mapper)
console.log(obj) // {name: 'John Doe', dateOfBirth: 'Wed Feb 07 1973...', misc: {}}
```

Note, that the mapper will _not_ traverse a value that is an object that has been removed by the mapper. Here is an example:

```js
const obj = {
    foo: {
        removeMe: false,
        bar: {
            removeMe: true,
            ignored: {
                removeMe: true
            }
        }
    }
}
const mapper = function (v, {path}) {
    console.log(path.join('.'))
    return v.removeMe ? undefined : v
}
mapper(obj, mapper) // foo, foo.bar
console.log(obj) // {foo: {removeMe: false }}
```

Although both `foo.bar` and `foo.bar.ignored` have been removed by the mapper, the console logs confirm that the mapper never actually iterated on `foo.bar.ignored`. It was removed because it was a property of `foo.bar`, which was removed.

### clone(object)
`import { clone } from '@nerdo/utils'`
> Returns a deep clone of the specified object

* `object` _{object}_: the object to clone.

`clone(...)` returns the deep cloned object

```js
const obj = {
  a: [
    9,
    {
      foo: 'bar'
    },
    7
  ]
}
const cloned = clone(obj)
console.log(cloned) // a deep clone of obj
```

### get(object, path, [defaultValue = _undefined_])
`import { get } from '@nerdo/utils'`
> Returns the value in an object at the location specified by path.

* `object` _{object}_: the object to query.
* `path` _{string|array}_: the dotted-key string path or array path of the property to get.
* `defaultValue` _{mixed}_ **[undefined]**: the default value to return if the property path cannot be fully resolved.

`get(...)` returns the value, or `defaultValue` if the property path could not be fully resolved.

The path may be specified using either dotted-key or array path syntax. If the path cannot be fully resolved, the `defaultValue` is returned. For example:

```js
const object = {a: [{b: {c: 3}}]}
get(object, 'a[0].b.c') // 3
get(object, ['a', 0, 'b', 'c']) // 3
get(object, 'a.b.c', 555) // 5
```

### representMonth({ date, startingDayOfWeek })
`import { representMonth } from '@nerdo/utils'`
> Generates an object representation of a calendar date.

* `date` _{representMonth.DateAdapter}_ **[new representMonth.DateAdapter()]**: the date to be represented.
* `startingDayOfWeek` _{representMonth.DayOfWeek}_ **[representMonth.DayOfWeek.Sunday]**: the starting day of the week.

Properties:

* `DateAdapter` _{Date}_: a constructor that is compatible with the JavaScript `Date` object.

`representMonth(...)` returns an object with the following structure:

* `date` _{representMonth.DateAdapter}_: the `representMonth.DateAdapter` instance of the date being represented.
* `numberOfDays` _{number}_: the number of days in the month
* `weeks` _{(number | null)[][]}_: the list of days in each week (i.e. 1 through 31 depending on the month). Each week array will always represent each of the 7 days and the first index of the week corresponds to the `startingDayOfWeek` argument. If a value is `null`, that particular day does not exist in the month. This is visually equivalent to when there are blank spaces in a calendar in the first and last weeks of a month that overlap with the previous month.
* `prevMonthNumberOfDays` _{number}_: the number of days in the previous month
* `prevMonthLastWeek` _{(number | null)[]}_: the last week of the previous month that overlaps with the first week of the current month.
* `nextMonthNumberOfDays` _{number}_: the number of days in the next month
* `nextMonthFirstWeek` _{(number | null)[]}_: the first week of the next month that overlaps with the last week of the current month.

A typical usage of this is to render calendars. For example:

```ts
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
monthNames.forEach((monthName, index) => {
  const label = `${monthName} ${year}`
  console.log(`${' '.repeat((calWidth - label.length) / 2)}${label}`) // centers the label over the calendar
  const representation = representMonth({date: new Date(year, index)}) //?
  const renderData: (string | number | null)[][] = [['S', 'M', 'T', 'W', 'T', 'F', 'S']]
  renderData
    .concat(representation.weeks)
    .map((week) => week
      .map((day) => `${day || ''}`) // coerce each day to a string
      .map((stringDay) => stringDay.padStart(cellSize, ' '))
      .join(' ')
    )
    .forEach((weekString) => console.log(weekString))
})
```

The preceeding code results in console logging of each month of the 2020 calendar year.

Here's a slightly more advanced example which uses the data to console log calendar months with previous and next months days showing up in square brackets (e.g. [30])

```ts
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
```

### isLeapYear(year: number): boolean
`import { isLeapYear } from '@nerdo/utils'`
> Whether or not the year is a leap year.

* `year` _{number}_ the year

### numDaysInMonth(month: number, year: number): number
`import { numDaysInMonth } from '@nerdo/utils'`
> Gets the number of days in a calendar month.

* `month` _{number}_ the month; 0 = January, 11 = December
* `year` _{number}_ the year

### DayOfWeek
`import { DayOfWeek } from '@nerdo/utils'`
> An object representing the days of the week for use in representMonth().

Properties:
* `Sunday`
* `Monday`
* `Tuesday`
* `Wednesday`
* `Thursday`
* `Saturday`
