import { right, left } from 'fp-ts/Either'

export const validateFromList =
  <T>(list: T[]) =>
  (el: T) =>
    list.includes(el)
      ? right(el)
      : left(new Error(`${String(el)} не входит в ${list.toString()}`))
