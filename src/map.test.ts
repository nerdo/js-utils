import { map } from './map'

describe('map', () => {
  it('should be a function', () => {
    expect(map).toBeInstanceOf(Function)
  })

  it('should return the object', () => {
    const obj = {}
    // @ts-ignore
    const mapped = map(obj)
    expect(mapped).toBe(obj)
  })

  describe('identity mapper', () => {
    const identity = v => v

    it('should call the mapper on undefined', () => {
      const mapper = jest.fn(identity)
      map(void 0, mapper)
      expect(mapper.mock.calls.length).toBe(1)
    })

    it('should call the mapper on an object with no properties', () => {
      const mapper = jest.fn(identity)
      map({}, mapper)
      expect(mapper.mock.calls.length).toBe(1)
    })

    it('should not traverse a number property', () => {
      const mapper = jest.fn(identity)
      const obj = { a: 1 }
      map(obj, mapper)
      expect(mapper.mock.calls.length).toBe(2)
    })

    it('should not traverse a string property', () => {
      const mapper = jest.fn(identity)
      const obj = { a: '' }
      map(obj, mapper)
      expect(mapper.mock.calls.length).toBe(2)
    })

    it('should not traverse a boolean property', () => {
      const mapper = jest.fn(identity)
      const obj = { a: false }
      map(obj, mapper)
      expect(mapper.mock.calls.length).toBe(2)
    })

    it('should not traverse a null property', () => {
      const mapper = jest.fn(identity)
      const obj = { a: null }
      map(obj, mapper)
      expect(mapper.mock.calls.length).toBe(2)
    })

    it('should not traverse an undefined property', () => {
      const mapper = jest.fn(identity)
      const obj = { a: void 0 }
      map(obj, mapper)
      expect(mapper.mock.calls.length).toBe(2)
    })

    it('should not traverse an array', () => {
      const mapper = jest.fn(identity)
      const obj = {
        a: [
          9,
          8,
          7
        ]
      }
      map(obj, mapper)
      expect(mapper.mock.calls.length).toBe(2)
    })

    it('should not traverse a function', () => {
      const mapper = jest.fn(identity)
      const obj = { a: function () {} }
      map(obj, mapper)
      expect(mapper.mock.calls.length).toBe(2)
    })

    it('should not traverse symbol nodes', () => {
      const mapper = jest.fn(identity)
      const obj = { [Symbol.for('testing')]: 1 }
      map(obj, mapper)
      expect(mapper.mock.calls.length).toBe(1)
    })

    it('should traverse a simple, flat object', () => {
      const mapper = jest.fn(identity)
      const obj = {
        a: 1,
        b: 2,
        c: 3
      }
      map(obj, mapper)
      expect(mapper.mock.calls.length).toBe(4)
    })

    it('should traverse a simple, nested object', () => {
      const mapper = jest.fn(identity)
      const obj = {
        a: 1,
        b: {
          foo: true,
          bar: {
            x: false
          }
        },
        c: 3
      }
      map(obj, mapper)
      expect(mapper.mock.calls.length).toBe(7)
    })

    it('should call the mapper once for each nested object property', () => {
      const mapper = jest.fn(identity)
      const NotPlainObject = class {
        someProperty?: unknown
        constructor() {
          this.someProperty = 42
        }
      }
      const obj = {
        a: 1,
        b: false,
        c: null,
        d: void 0,
        e: '',
        f: function () {},
        foo: {
          [Symbol.for('something')]: () => true
        },
        bar: {
          justice: {
            symbol: Symbol.for('something else')
          },
          hello: {
            1: [0, 1, 2],
            kitty: {}
          }
        },
        notPlainObject: new NotPlainObject()
      }

      map(obj, mapper)
      expect(mapper.mock.calls.length).toBe(16)
    })
  })

  describe('mutating mapper', () => {
    it('should not traverse nested properties replaced by mapper', () => {
      const pathsCalled = []
      const mapper = jest.fn((v, {path}) => {
        pathsCalled.push(path.join('.'))
        return (typeof v === 'object' && v.remove) ? void 0 : v
      })
      const obj = {
        a: {
          b: {
            c: {
              remove: true,
              what: 1,
              ever: 2
            }
          }
        }
      }

      map(obj, mapper)

      expect(mapper.mock.calls.length).toBe(4)
      expect(pathsCalled.includes('')).toBe(true)
      expect(pathsCalled.includes('a')).toBe(true)
      expect(pathsCalled.includes('a.b')).toBe(true)
      expect(pathsCalled.includes('a.b.c')).toBe(true)
      expect(pathsCalled.includes('a.b.c.remove')).not.toBe(true)
      expect(pathsCalled.includes('a.b.c.what')).not.toBe(true)
      expect(pathsCalled.includes('a.b.c.ever')).not.toBe(true)
    })
  })
})
