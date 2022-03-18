import { describe, expect, it } from 'vitest'
import { measurement, unit } from '../measurement'

describe('quantity', () => {
  const information = measurement(
    unit('bit'),
    unit('byte', 8),
    unit('kilobyte', 1024),
    unit('gigabyte', 1024 * 1024),
  )

  const fiveHundredBytes = information(500, 'byte')

  it('should return initial value for initial unit', () => {
    expect(fiveHundredBytes.in('byte')).toStrictEqual(500)
  })

  it('should return proper value for greater unit', () => {
    expect(fiveHundredBytes.in('kilobyte')).toStrictEqual(500 / 1024)
    expect(fiveHundredBytes.in('gigabyte')).toStrictEqual(
      500 / 1024 / 1024 / 1024,
    )
  })

  it('should return proper value for lower unit', () => {
    expect(fiveHundredBytes.in('bit')).toStrictEqual(500 * 8)
  })
})
