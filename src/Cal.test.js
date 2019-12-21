import { Cal } from './Cal'

describe('Cal', () => {
  it('should be a function', () => {
    expect(Cal).toBeInstanceOf(Function)
  })

  describe('represent', () => {
    it('should be a function', () => {
      const cal = new Cal()
      expect(cal.represent).toBeInstanceOf(Function)
    })

    describe('arguments', () => {
      describe('unit', () => {
        it('should be returned in the representation', () => {
          const cal = new Cal()
          const rep = cal.represent({unit: 'month'})
          expect(rep.unit).toBe('month')
        })

        it('should default to "month" with no other arguments', () => {
          const cal = new Cal()
          const rep = cal.represent()
          expect(rep.unit).toBe('month')
        })

        it('should default to "month" with other arguments', () => {
          const cal = new Cal()
          const rep = cal.represent({foo: 'bar'})
          expect(rep.unit).toBe('month')
        })
      })

      describe('date', () => {
        it('should be returned in the representation', () => {
          const cal = new Cal()
          const date = new Date()
          const rep = cal.represent({ date })
          expect(rep.date).toBe(date)
        })

        it('should default to the current date with no other arguments', () => {
          const DateAdapter = class {}
          Cal.DateAdapter = DateAdapter
          const cal = new Cal()
          const rep = cal.represent()
          expect(rep.date).toBeInstanceOf(DateAdapter)
        })

        it('should default to the current date with other arguments', () => {
          const DateAdapter = class {}
          Cal.DateAdapter = DateAdapter
          const cal = new Cal()
          const rep = cal.represent({foo: 'bar'})
          expect(rep.date).toBeInstanceOf(DateAdapter)
        })
      })
    })
  })
})
