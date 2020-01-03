import { cal } from './cal'

describe('cal', () => {
  it('should be an object', () => {
    expect(cal).toBeInstanceOf(Object)
    expect(cal).not.toBeInstanceOf(Function)
  })

  describe('represent', () => {
    it('should be a function', () => {
      expect(cal.represent).toBeInstanceOf(Function)
    })

    describe('arguments', () => {
      describe('unit', () => {
        it('should be returned in the representation', () => {
          const rep = cal.represent({unit: 'month'})
          expect(rep.unit).toBe('month')
        })

        it('should default to "month" with no other arguments', () => {
          const rep = cal.represent()
          expect(rep.unit).toBe('month')
        })

        it('should default to "month" with other arguments', () => {
          const rep = cal.represent({foo: 'bar'})
          expect(rep.unit).toBe('month')
        })
      })

      describe('date', () => {
        it('should be returned in the representation', () => {
          const date = new Date()
          const rep = cal.represent({ date })
          expect(rep.date).toBe(date)
        })

        it('should default to the current date with no other arguments', () => {
          const DateAdapter = class extends Date {}
          cal.DateAdapter = DateAdapter
          const rep = cal.represent()
          expect(rep.date).toBeInstanceOf(DateAdapter)
        })

        it('should default to the current date with other arguments', () => {
          const DateAdapter = class extends Date {}
          cal.DateAdapter = DateAdapter
          const rep = cal.represent({foo: 'bar'})
          expect(rep.date).toBeInstanceOf(DateAdapter)
        })
      })
    })

    describe('unit: month, date: 1/9/2020', () => {
      describe('default starting day of week (Sunday)', () => {
        it('should return the days in the month, starting with Sunday', () => {
          const date = new Date(Date.UTC(2020, 0, 9))
          const rep = cal.represent({unit: 'month', date })
          expect(rep.month).toBeInstanceOf(Object)
          expect(rep.month.numberOfDays).toBe(31)
          expect(rep.month.weeks).toBeInstanceOf(Array)
          expect(rep.month.weeks.length).toBe(5)
          expect(rep.month.weeks[0].length).toBe(7)
          expect(rep.month.weeks[1].length).toBe(7)
          expect(rep.month.weeks[2].length).toBe(7)
          expect(rep.month.weeks[3].length).toBe(7)
          expect(rep.month.weeks[4].length).toBe(7)
          expect(rep.month.weeks[0]).toEqual([null, null, null, 1, 2, 3, 4])
          expect(rep.month.weeks[1]).toEqual([5, 6, 7, 8, 9, 10, 11])
          expect(rep.month.weeks[2]).toEqual([12, 13, 14, 15, 16, 17, 18])
          expect(rep.month.weeks[3]).toEqual([19, 20, 21, 22, 23, 24, 25])
          expect(rep.month.weeks[4]).toEqual([26, 27, 28, 29, 30, 31, null])
        })
      })
      describe('custom starting day of week', () => {
        describe('Tuesday', () => {
          it('should return the days in the month, starting with Tuesday', () => {
            const date = new Date(Date.UTC(2020, 0, 9))
            const rep = cal.represent({unit: 'month', date, startingDayOfWeek: cal.DayOfWeek.Tuesday })
            expect(rep.month).toBeInstanceOf(Object)
            expect(rep.month.numberOfDays).toBe(31)
            expect(rep.month.weeks).toBeInstanceOf(Array)
            expect(rep.month.weeks.length).toBe(5)
            expect(rep.month.weeks[0].length).toBe(7)
            expect(rep.month.weeks[1].length).toBe(7)
            expect(rep.month.weeks[2].length).toBe(7)
            expect(rep.month.weeks[3].length).toBe(7)
            expect(rep.month.weeks[4].length).toBe(7)
            expect(rep.month.weeks[0]).toEqual([null, 1, 2, 3, 4, 5, 6])
            expect(rep.month.weeks[1]).toEqual([7, 8, 9, 10, 11, 12, 13])
            expect(rep.month.weeks[2]).toEqual([14, 15, 16, 17, 18, 19, 20])
            expect(rep.month.weeks[3]).toEqual([21, 22, 23, 24, 25, 26, 27])
            expect(rep.month.weeks[4]).toEqual([28, 29, 30, 31, null, null, null])
          })
        })
        describe('Thursday', () => {
          it('should return the days in the month, starting with Thursday', () => {
            const date = new Date(Date.UTC(2020, 0, 9))
            const rep = cal.represent({unit: 'month', date, startingDayOfWeek: cal.DayOfWeek.Thursday })
            expect(rep.month).toBeInstanceOf(Object)
            expect(rep.month.numberOfDays).toBe(31)
            expect(rep.month.weeks).toBeInstanceOf(Array)
            expect(rep.month.weeks.length).toBe(6)
            expect(rep.month.weeks[0].length).toBe(7)
            expect(rep.month.weeks[1].length).toBe(7)
            expect(rep.month.weeks[2].length).toBe(7)
            expect(rep.month.weeks[3].length).toBe(7)
            expect(rep.month.weeks[4].length).toBe(7)
            expect(rep.month.weeks[5].length).toBe(7)
            expect(rep.month.weeks[0]).toEqual([null, null, null, null, null, null, 1])
            expect(rep.month.weeks[1]).toEqual([2, 3, 4, 5, 6, 7, 8])
            expect(rep.month.weeks[2]).toEqual([9, 10, 11, 12, 13, 14, 15])
            expect(rep.month.weeks[3]).toEqual([16, 17, 18, 19, 20, 21, 22])
            expect(rep.month.weeks[4]).toEqual([23, 24, 25, 26, 27, 28, 29])
            expect(rep.month.weeks[5]).toEqual([30, 31, null, null, null, null, null])
          })
        })
        describe('Saturday', () => {
          it('should return the days in the month, starting with Saturday', () => {
            const date = new Date(Date.UTC(2020, 0, 9))
            const rep = cal.represent({unit: 'month', date, startingDayOfWeek: cal.DayOfWeek.Saturday })
            expect(rep.month).toBeInstanceOf(Object)
            expect(rep.month.numberOfDays).toBe(31)
            expect(rep.month.weeks).toBeInstanceOf(Array)
            expect(rep.month.weeks.length).toBe(5)
            expect(rep.month.weeks[0].length).toBe(7)
            expect(rep.month.weeks[1].length).toBe(7)
            expect(rep.month.weeks[2].length).toBe(7)
            expect(rep.month.weeks[3].length).toBe(7)
            expect(rep.month.weeks[4].length).toBe(7)
            expect(rep.month.weeks[0]).toEqual([null, null, null, null, 1, 2, 3])
            expect(rep.month.weeks[1]).toEqual([4, 5, 6, 7, 8, 9, 10])
            expect(rep.month.weeks[2]).toEqual([11, 12, 13, 14, 15, 16, 17])
            expect(rep.month.weeks[3]).toEqual([18, 19, 20, 21, 22, 23, 24])
            expect(rep.month.weeks[4]).toEqual([25, 26, 27, 28, 29, 30, 31])
          })
        })
      })
    })
  })
})
