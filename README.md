# @nerdo/utils
> nerdo's JavaScript utilities.

Install it:

```bash
npm install @nerdo/utils --save
```

### map(object, mapper)
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

### get(object, path, [defaultValue = _undefined_])
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

## cal
> A calendar representation module.

Usage:

```js
import { cal } from '@nerdo/utils'
```

Properties:

* `DateAdapter` _{Date}_: a constructor that is compatible with the JavaScript `Date` object.
* `DayOfWeek` _{object}_: an object with constants for Sunday through Saturday.

### cal.represent({ unit, date, startingDayOfWeek })
> Generates an object representation of a calendar date.

* `unit` _{string}_ **['month']**: the unit of time you want to represent. Currently, only 'month' is supported.
* `date` _{cal.DateAdapter}_ **[new cal.DateAdapter()]**: the **UTC** date to be represented.
* `startingDayOfWeek` _{cal.DayOfWeek}_ **[cal.DayOfWeek.Sunday]**: the starting day of the week.

`date` should be provided in **UTC**. All date mainpulation is internally done in UTC.

`cal(...)` returns an object with the following structure:

* `unit` _{string}_: the unit being represented.
* `date` _{cal.DateAdapter}_: the `cal.DateAdapter` instance of the date being represented.
* `month` _{object}_: when `unit` is 'month', an object containing...
  * `numberOfDays` _{number}_: the number of days in the month
  * `weeks` _{array}_: the list of days in each week (i.e. 1 through 31 depending on the month). Each week array will always represent each of the 7 days and the first index of the week corresponds to the `startingDayOfWeek` argument. If the value is `null`, that particular day does not exist in the month. This is visually equivalent to when there are blank spaces in a calendar in the first and last weeks of a month that overlap with the previous month.

A typical usage of this is to render calendars. For example:

```js
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
  console.log(`${' '.repeat((calWidth - label.length) / 2)}${label}`)
  const representation = cal.represent({date: new Date(Date.UTC(year, index))})
  const renderData = [['S', 'M', 'T', 'W', 'T', 'F', 'S']]
  renderData
    .concat(representation.month.weeks)
    .map(week => week.map(day => ('' + (day || '')).padStart(cellSize, ' ')).join(' '))
    .forEach(string => console.log(string))
})
```

The preceeding code results in console logging of each month of the 2020 calendar year.
