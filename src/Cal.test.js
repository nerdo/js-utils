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
  })
})
