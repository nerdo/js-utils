import { describe, expect, it } from 'vitest'
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
          foo: 'bar',
        },
        c: {
          xyz: 123,
        },
      },
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
      a: [9, 8, 7],
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
          foo: 'bar',
        },
        7,
      ],
    }
    const cloned = clone(obj)
    expect(cloned).not.toBe(obj)
    expect(cloned).toEqual(obj)
    expect(obj.a).not.toBe(cloned.a)
    expect(obj.a[1]).not.toBe(cloned.a[1])
  })

  it('should clone objects with undefined values', () => {
    const obj = {
      name: 'Randall Bosco',
      email: void 0,
      avatarUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/733.jpg',
      address: {
        street: '4540 Valentina Vista',
        city: 'Fort Lydia',
        state: 'WI',
        zip: '25069',
      },
    }

    const cloned = clone(obj)

    expect(cloned).not.toBe(obj)
    expect(cloned).toEqual(obj)
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

  it('should clone dates', () => {
    const date = new Date(1666229644651)

    const cloned = clone(date)

    expect(cloned).not.toBe(date)
    expect(cloned.valueOf()).toEqual(date.valueOf())
  })
})
