// https://stackoverflow.com/a/44198641/2057996

export const isDate = (v: unknown) => v && Object.prototype.toString.call(v) === '[object Date]' && !isNaN(v as number)

export default isDate
