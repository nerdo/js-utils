import { describe, expect, it } from 'vitest'
import { representMonth } from './representMonth'
import { DayOfWeek } from './DayOfWeek'

describe('representMonth', () => {
  it('should be a function', () => {
    expect(representMonth).toBeInstanceOf(Function)
  })

  describe('arguments', () => {
    describe('date', () => {
      it('should be returned in the representation', () => {
        const date = new Date()
        const rep = representMonth({ date })
        expect(rep.date).toBe(date)
      })

      it('should default to the current date with no other arguments', () => {
        const DateAdapter = class extends Date {}
        representMonth.DateAdapter = DateAdapter
        const rep = representMonth()
        expect(rep.date).toBeInstanceOf(DateAdapter)
      })

      it('should default to the current date with other arguments', () => {
        const DateAdapter = class extends Date {}
        representMonth.DateAdapter = DateAdapter
        const rep = representMonth({ foo: 'bar' })
        expect(rep.date).toBeInstanceOf(DateAdapter)
      })
    })
  })

  describe('general case, date: 1/9/2020', () => {
    const date = new Date(2020, 0, 9)

    describe('default starting day of week (Sunday)', () => {
      it('should return the days in the month, starting with Sunday', () => {
        const rep = representMonth({ date })
        expect(rep.numberOfDays).toBe(31)
        expect(rep.weeks).toBeInstanceOf(Array)
        expect(rep.weeks.length).toBe(5)
        expect(rep.weeks[0].length).toBe(7)
        expect(rep.weeks[1].length).toBe(7)
        expect(rep.weeks[2].length).toBe(7)
        expect(rep.weeks[3].length).toBe(7)
        expect(rep.weeks[4].length).toBe(7)
        expect(rep.weeks[0]).toEqual([null, null, null, 1, 2, 3, 4])
        expect(rep.weeks[1]).toEqual([5, 6, 7, 8, 9, 10, 11])
        expect(rep.weeks[2]).toEqual([12, 13, 14, 15, 16, 17, 18])
        expect(rep.weeks[3]).toEqual([19, 20, 21, 22, 23, 24, 25])
        expect(rep.weeks[4]).toEqual([26, 27, 28, 29, 30, 31, null])
        expect(rep.prevMonthNumberOfDays).toBe(31)
        expect(rep.prevMonthLastWeek).toBeInstanceOf(Array)
        expect(rep.prevMonthLastWeek.length).toBe(7)
        expect(rep.prevMonthLastWeek).toEqual([29, 30, 31, null, null, null, null])
        expect(rep.nextMonthNumberOfDays).toBe(29)
        expect(rep.nextMonthFirstWeek).toBeInstanceOf(Array)
        expect(rep.nextMonthFirstWeek.length).toBe(7)
        expect(rep.nextMonthFirstWeek).toEqual([null, null, null, null, null, null, 1])
      })
    })

    describe('custom starting day of week', () => {
      describe('Tuesday', () => {
        it('should return the days in the month, starting with Tuesday', () => {
          const rep = representMonth({
            date,
            startingDayOfWeek: DayOfWeek.Tuesday,
          })
          expect(rep.numberOfDays).toBe(31)
          expect(rep.weeks).toBeInstanceOf(Array)
          expect(rep.weeks.length).toBe(5)
          expect(rep.weeks[0].length).toBe(7)
          expect(rep.weeks[1].length).toBe(7)
          expect(rep.weeks[2].length).toBe(7)
          expect(rep.weeks[3].length).toBe(7)
          expect(rep.weeks[4].length).toBe(7)
          expect(rep.weeks[0]).toEqual([null, 1, 2, 3, 4, 5, 6])
          expect(rep.weeks[1]).toEqual([7, 8, 9, 10, 11, 12, 13])
          expect(rep.weeks[2]).toEqual([14, 15, 16, 17, 18, 19, 20])
          expect(rep.weeks[3]).toEqual([21, 22, 23, 24, 25, 26, 27])
          expect(rep.weeks[4]).toEqual([28, 29, 30, 31, null, null, null])
          expect(rep.prevMonthNumberOfDays).toBe(31)
          expect(rep.prevMonthLastWeek).toBeInstanceOf(Array)
          expect(rep.prevMonthLastWeek.length).toBe(7)
          expect(rep.prevMonthLastWeek).toEqual([31, null, null, null, null, null, null])
          expect(rep.nextMonthNumberOfDays).toBe(29)
          expect(rep.nextMonthFirstWeek).toBeInstanceOf(Array)
          expect(rep.nextMonthFirstWeek.length).toBe(7)
          expect(rep.nextMonthFirstWeek).toEqual([null, null, null, null, 1, 2, 3])
        })
      })

      describe('Thursday', () => {
        it('should return the days in the month, starting with Thursday', () => {
          const rep = representMonth({
            date,
            startingDayOfWeek: DayOfWeek.Thursday,
          })
          expect(rep.numberOfDays).toBe(31)
          expect(rep.weeks).toBeInstanceOf(Array)
          expect(rep.weeks.length).toBe(6)
          expect(rep.weeks[0].length).toBe(7)
          expect(rep.weeks[1].length).toBe(7)
          expect(rep.weeks[2].length).toBe(7)
          expect(rep.weeks[3].length).toBe(7)
          expect(rep.weeks[4].length).toBe(7)
          expect(rep.weeks[5].length).toBe(7)
          expect(rep.weeks[0]).toEqual([null, null, null, null, null, null, 1])
          expect(rep.weeks[1]).toEqual([2, 3, 4, 5, 6, 7, 8])
          expect(rep.weeks[2]).toEqual([9, 10, 11, 12, 13, 14, 15])
          expect(rep.weeks[3]).toEqual([16, 17, 18, 19, 20, 21, 22])
          expect(rep.weeks[4]).toEqual([23, 24, 25, 26, 27, 28, 29])
          expect(rep.weeks[5]).toEqual([30, 31, null, null, null, null, null])
          expect(rep.prevMonthNumberOfDays).toBe(31)
          expect(rep.prevMonthLastWeek).toBeInstanceOf(Array)
          expect(rep.prevMonthLastWeek.length).toBe(7)
          expect(rep.prevMonthLastWeek).toEqual([26, 27, 28, 29, 30, 31, null])
          expect(rep.nextMonthNumberOfDays).toBe(29)
          expect(rep.nextMonthFirstWeek).toBeInstanceOf(Array)
          expect(rep.nextMonthFirstWeek.length).toBe(7)
          expect(rep.nextMonthFirstWeek).toEqual([null, null, 1, 2, 3, 4, 5])
        })
      })

      describe('Saturday', () => {
        it('should return the days in the month, starting with Saturday', () => {
          const rep = representMonth({
            date,
            startingDayOfWeek: DayOfWeek.Saturday,
          })
          expect(rep.numberOfDays).toBe(31)
          expect(rep.weeks).toBeInstanceOf(Array)
          expect(rep.weeks.length).toBe(5)
          expect(rep.weeks[0].length).toBe(7)
          expect(rep.weeks[1].length).toBe(7)
          expect(rep.weeks[2].length).toBe(7)
          expect(rep.weeks[3].length).toBe(7)
          expect(rep.weeks[4].length).toBe(7)
          expect(rep.weeks[0]).toEqual([null, null, null, null, 1, 2, 3])
          expect(rep.weeks[1]).toEqual([4, 5, 6, 7, 8, 9, 10])
          expect(rep.weeks[2]).toEqual([11, 12, 13, 14, 15, 16, 17])
          expect(rep.weeks[3]).toEqual([18, 19, 20, 21, 22, 23, 24])
          expect(rep.weeks[4]).toEqual([25, 26, 27, 28, 29, 30, 31])
          expect(rep.prevMonthNumberOfDays).toBe(31)
          expect(rep.prevMonthLastWeek).toBeInstanceOf(Array)
          expect(rep.prevMonthLastWeek.length).toBe(7)
          expect(rep.prevMonthLastWeek).toEqual([28, 29, 30, 31, null, null, null])
          expect(rep.nextMonthNumberOfDays).toBe(29)
          expect(rep.nextMonthFirstWeek).toBeInstanceOf(Array)
          expect(rep.nextMonthFirstWeek.length).toBe(7)
          expect(rep.nextMonthFirstWeek).toEqual([null, null, null, null, null, null, null])
        })
      })
    })
  })

  describe('edge cases', () => {
    describe('date: 2/3/2020 (February, leap year)', () => {
      const date = new Date(2020, 1, 3)

      it('should return the days in the month, starting with Sunday', () => {
        const rep = representMonth({ date })
        expect(rep.numberOfDays).toBe(29)
        expect(rep.weeks).toBeInstanceOf(Array)
        expect(rep.weeks.length).toBe(5)
        expect(rep.weeks[0].length).toBe(7)
        expect(rep.weeks[1].length).toBe(7)
        expect(rep.weeks[2].length).toBe(7)
        expect(rep.weeks[3].length).toBe(7)
        expect(rep.weeks[4].length).toBe(7)
        expect(rep.weeks[0]).toEqual([null, null, null, null, null, null, 1])
        expect(rep.weeks[1]).toEqual([2, 3, 4, 5, 6, 7, 8])
        expect(rep.weeks[2]).toEqual([9, 10, 11, 12, 13, 14, 15])
        expect(rep.weeks[3]).toEqual([16, 17, 18, 19, 20, 21, 22])
        expect(rep.weeks[4]).toEqual([23, 24, 25, 26, 27, 28, 29])
        expect(rep.prevMonthNumberOfDays).toBe(31)
        expect(rep.prevMonthLastWeek).toBeInstanceOf(Array)
        expect(rep.prevMonthLastWeek.length).toBe(7)
        expect(rep.prevMonthLastWeek).toEqual([26, 27, 28, 29, 30, 31, null])
        expect(rep.nextMonthNumberOfDays).toBe(31)
        expect(rep.nextMonthFirstWeek).toBeInstanceOf(Array)
        expect(rep.nextMonthFirstWeek.length).toBe(7)
        expect(rep.nextMonthFirstWeek).toEqual([null, null, null, null, null, null, null])
      })
    })

    describe('date: 2/17/2019 (February, NON leap year)', () => {
      const date = new Date(2019, 1, 17)

      it('should return the days in the month, starting with Sunday', () => {
        const rep = representMonth({ date })
        expect(rep.numberOfDays).toBe(28)
        expect(rep.weeks).toBeInstanceOf(Array)
        expect(rep.weeks.length).toBe(5)
        expect(rep.weeks[0].length).toBe(7)
        expect(rep.weeks[1].length).toBe(7)
        expect(rep.weeks[2].length).toBe(7)
        expect(rep.weeks[3].length).toBe(7)
        expect(rep.weeks[4].length).toBe(7)
        expect(rep.weeks[0]).toEqual([null, null, null, null, null, 1, 2])
        expect(rep.weeks[1]).toEqual([3, 4, 5, 6, 7, 8, 9])
        expect(rep.weeks[2]).toEqual([10, 11, 12, 13, 14, 15, 16])
        expect(rep.weeks[3]).toEqual([17, 18, 19, 20, 21, 22, 23])
        expect(rep.weeks[4]).toEqual([24, 25, 26, 27, 28, null, null])
        expect(rep.prevMonthNumberOfDays).toBe(31)
        expect(rep.prevMonthLastWeek).toBeInstanceOf(Array)
        expect(rep.prevMonthLastWeek.length).toBe(7)
        expect(rep.prevMonthLastWeek).toEqual([27, 28, 29, 30, 31, null, null])
        expect(rep.nextMonthNumberOfDays).toBe(31)
        expect(rep.nextMonthFirstWeek).toBeInstanceOf(Array)
        expect(rep.nextMonthFirstWeek.length).toBe(7)
        expect(rep.nextMonthFirstWeek).toEqual([null, null, null, null, null, 1, 2])
      })
    })

    describe('date: 3/1/2020 (March 2020)', () => {
      // Checking for all null initial week.
      const date = new Date(2020, 2, 1)

      it('should return the days in the month, starting with Sunday', () => {
        const rep = representMonth({ date })
        expect(rep.numberOfDays).toBe(31)
        expect(rep.weeks).toBeInstanceOf(Array)
        expect(rep.weeks.length).toBe(5)
        expect(rep.weeks[0].length).toBe(7)
        expect(rep.weeks[1].length).toBe(7)
        expect(rep.weeks[2].length).toBe(7)
        expect(rep.weeks[3].length).toBe(7)
        expect(rep.weeks[4].length).toBe(7)
        expect(rep.weeks[0]).toEqual([1, 2, 3, 4, 5, 6, 7])
        expect(rep.weeks[1]).toEqual([8, 9, 10, 11, 12, 13, 14])
        expect(rep.weeks[2]).toEqual([15, 16, 17, 18, 19, 20, 21])
        expect(rep.weeks[3]).toEqual([22, 23, 24, 25, 26, 27, 28])
        expect(rep.weeks[4]).toEqual([29, 30, 31, null, null, null, null])
        expect(rep.prevMonthNumberOfDays).toBe(29)
        expect(rep.prevMonthLastWeek).toBeInstanceOf(Array)
        expect(rep.prevMonthLastWeek.length).toBe(7)
        expect(rep.prevMonthLastWeek).toEqual([null, null, null, null, null, null, null])
        expect(rep.nextMonthNumberOfDays).toBe(30)
        expect(rep.nextMonthFirstWeek).toBeInstanceOf(Array)
        expect(rep.nextMonthFirstWeek.length).toBe(7)
        expect(rep.nextMonthFirstWeek).toEqual([null, null, null, 1, 2, 3, 4])
      })
    })
  })
})
