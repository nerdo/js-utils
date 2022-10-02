export const get = <O extends object>(obj: O, path: string | string[], defaultValue?: unknown): unknown => {
  const pathParts = Array.isArray(path) ? path : typeof path === 'string' ? path.split('.') : []
  return pathParts.reduce<Record<string, unknown> | undefined | unknown>(
    (o, key) => (typeof o === 'undefined' ? defaultValue : (o as Record<string, unknown>)[key]),
    obj
  )
}

export default get
