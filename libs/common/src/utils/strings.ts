export const capitalizeFirst = ([first, ...rest]: string) =>
  first.toUpperCase() + rest.join('')
