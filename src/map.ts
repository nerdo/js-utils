export type Mapper = (value: unknown, context: object, path?: string[]) => unknown

interface Meta {
  root: unknown
  parentPath: string[]
}

const recursiveMap = <Subject, RecursivelyMappedSubject>(subject: Subject, mapper: Mapper, meta: Meta): RecursivelyMappedSubject | Subject => {
  if (typeof subject !== 'object') {
    return subject
  }

  for (const key in subject) {
    subject[key] = mapper(subject[key], {
      object: meta.root,
      path: [...meta.parentPath, key],
    }) as typeof subject[typeof key]
    const current = subject[key]
    if (typeof current === 'object' && !Array.isArray(current)) {
      recursiveMap(current, mapper, {
        ...meta,
        parentPath: [...meta.parentPath, key],
      })
    }
  }

  return subject
}

export const map = <Input, MappedInput>(input: Input, mapper: Mapper): MappedInput => {
  const subject = typeof mapper === 'function' ? mapper(input, { object: input, path: [] }) : input
  return recursiveMap(subject, mapper, { root: input, parentPath: [] }) as MappedInput
}

export default map
