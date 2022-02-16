import { clone } from './clone'

describe('clone', () => {
  it('should be a function', () => {
    expect(clone).toBeInstanceOf(Function)
  })

  it('should return a copy of the object', () => {
    const obj = {}
    const cloned = clone(obj)
    expect(cloned).not.toBe(obj)
    expect(cloned).toEqual(obj)
  })
  
  it('should return a copy of the object with nesting', () => {
    const obj = {
      a: {
        b: {
          foo: 'bar'
        },
        c: {
          xyz: 123
        }
      }
    }
    const cloned = clone(obj)
    expect(cloned).not.toBe(obj)
    expect(cloned).toEqual(obj)
    expect(obj.a).not.toBe(cloned.a)
    expect(obj.a.b).not.toBe(cloned.a.b)
    expect(obj.a.c).not.toBe(cloned.a.c)
  })
  it('should clone simple arrays', () => {
    const obj = {
      a: [
        9,
        8,
        7
      ]
    }
    const cloned = clone(obj)
    expect(cloned).not.toBe(obj)
    expect(cloned).toEqual(obj)
  })

  it('should clone complex arrays', () => {
    const obj = {
      a: [
        9,
        {
          foo: 'bar'
        },
        7
      ]
    }
    const cloned = clone(obj)
    expect(cloned).not.toBe(obj)
    expect(cloned).toEqual(obj)
    expect(obj.a).not.toBe(cloned.a)
    expect(obj.a[1]).not.toBe(cloned.a[1])
  })
  
  it('should not properly clone objects with circular references', () => {
    // this is a limitation of map that might be solved using Map to keep track of visited objects
    function Foo() {
      this.abc = 'Hello'
      this.circular = this
    }
    const obj = new Foo()
    expect(() => clone(obj)).toThrow()
  })
})