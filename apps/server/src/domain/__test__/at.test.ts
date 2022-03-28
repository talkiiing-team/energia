import { Circuit } from '@energia/common'
import { describe, expect, it } from 'vitest'

import { getAtCommand } from '../at'

describe('at command test', () => {
  it('should return proper command', () => {
    const result = getAtCommand(
      {
        sw1: 0,
        sw2: 0,
        sw3: 0,
        sw4A: 0,
        sw4B: 0,
        sw5: 0,
        sw6: 0,
        sw7A: 0,
        sw7B: 0,
        sw8: 0,
        sw9: 0,
        mux1: 0,
        mux2: 0,
        mux3: 0,
        mux4: 0,
        mux5: 0,
      } as any,
      {
        sw1: 0,
        sw2: 0,
        sw3: 0,
        sw4A: 0,
        sw4B: 0,
        sw5: 0,
        sw6: 0,
        sw7A: 0,
        sw7B: 0,
        sw8: 3,
        sw9: 0,
        mux1: 0,
        mux2: 0,
        mux3: 0,
        mux4: 0,
        mux5: 0,
      } as any,
    )

    expect(result).toEqual(['at+swa= 0 0 0 4 0 0 0 4 0', `at+muxa= 0 0 0 0 0`])
  })
})
