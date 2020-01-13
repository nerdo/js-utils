import * as index from './index'

describe('index', () => {
  it('should export map', () => {
    expect(index.map).toBeDefined()
  })
  it('should export get', () => {
    expect(index.get).toBeDefined()
  })
  it('should export representMonth', () => {
    expect(index.representMonth).toBeDefined()
  })
  it('should export DayOfWeek', () => {
    expect(index.DayOfWeek).toBeDefined()
  })
})
