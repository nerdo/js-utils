import { get } from './get'

describe('get', () => {
  it('should be a function', () => {
    expect(get).toBeInstanceOf(Function)
  })

  it('should return undefined when given no arguments', () => {
    expect(get()).toBeUndefined()
  })

  it('should return the object when given no path', () => {
    const obj = {}
    expect(get(obj)).toBe(obj)
  })

  describe('string path', () => {
    it('should return the default value for paths that do not exist', () => {
      const obj = {
        a: {}
      }
      const result = get(obj, 'a.b.c', 'the default value')
      expect(result).toBe('the default value')
    })

    it('should return the value for a top level path', () => {
      const obj = {a: 1}
      const result = get(obj, 'a')
      expect(result).toBe(obj.a)
    })

    it('should return the value for a nested path', () => {
      const obj = {
        a: {
          b: {
            c: 1
          }
        }
      }
      const result = get(obj, 'a.b.c')
      expect(result).toBe(obj.a.b.c)
    })
  })

  describe('array path', () => {
    it('should return the default value for paths that do not exist', () => {
      const obj = {
        a: {}
      }
      const result = get(obj, ['a', 'b', 'c'], 'the default value')
      expect(result).toBe('the default value')
    })

    it('should return the value for a top level path', () => {
      const obj = {a: 1}
      const result = get(obj, ['a'])
      expect(result).toBe(obj.a)
    })

    it('should return the value for a nested path', () => {
      const obj = {
        a: {
          'b.b': {
            c: 1
          }
        }
      }
      const result = get(obj, ['a', 'b.b', 'c'])
      expect(result).toBe(obj.a['b.b'].c)
    })
  })
})
