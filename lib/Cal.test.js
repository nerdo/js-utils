import Cal from './Cal'

describe('Cal', () => {
  it('should be a function', () => {
    expect(Cal).toBeInstanceOf(Function)
  })

  describe('constructor', () => {
    it('should store DateAdapter', () => {
      const MyDateAdapter = {}
      const cal = new Cal({DateAdapter: MyDateAdapter})
      expect(cal.DateAdapter).toBe(MyDateAdapter)
    })

    it('should use Date as the default DateAdapter', () => {
      const cal = new Cal()
      expect(cal.DateAdapter).toBe(Date)
    })
  })
})
