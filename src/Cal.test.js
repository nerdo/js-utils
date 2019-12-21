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

        it('should default to "month"', () => {
          const cal = new Cal()
          const rep = cal.represent()
          expect(rep.unit).toBe('month')
        })

        it('should default to "month" with other arguments present', () => {
          const cal = new Cal()
          const rep = cal.represent({foo: 'bar'})
          expect(rep.unit).toBe('month')
        })
      })
    })
  })
})
