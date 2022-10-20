import { describe, expect, it } from 'vitest'
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
  it('should export numDaysInMonth', () => {
    expect(index.numDaysInMonth).toBeDefined()
  })
  it('should export isLeapYear', () => {
    expect(index.isLeapYear).toBeDefined()
  })
  it('should export DayOfWeek', () => {
    expect(index.DayOfWeek).toBeDefined()
  })
  it('should export isDateObject', () => {
    expect(index.isDateObject).toBeDefined()
  })
})
