import {
  Sw1,
  Sw2,
  Sw3,
  Sw4A,
  Sw4B,
  Sw5,
  Sw6,
  Sw7A,
  Sw7B,
  Sw8,
  Sw9,
  sw1,
  sw2,
  sw3,
  sw4A,
  sw4B,
  sw5,
  sw6,
  sw7A,
  sw7B,
  sw8,
  sw9,
  structEq,
  Circuit,
} from '@energia/common'
import { match } from 'ts-pattern'

export type Sw =
  | Sw1
  | Sw2
  | Sw3
  | Sw4A
  | Sw4B
  | Sw5
  | Sw6
  | Sw7A
  | Sw7B
  | Sw8
  | Sw9

export const atPlusSw = (sw: number) => (state: number) =>
  `at+sw=${sw},${state}`

export const atPlusMux = (mux: number) => (state: number) =>
  `at+mux=${mux},${state}`

const sw1Map = [0, 1, 4, 12, 2, 6, 14] as const

const sw2Map = [0, 8, 2, 1, 3, 5, 7] as const

const sw3Map = [0, 8, 2, 1, 3, 5, 7] as const

const getSw4State = (sw4AState: number, sw4BState: number) =>
  match(sw4AState)
    .with(0, () =>
      match(sw4BState)
        .with(0, () => 0)
        .otherwise(() => 2),
    )
    .otherwise(() =>
      match(sw4BState)
        .with(0, () => 1)
        .otherwise(() => 3),
    )

const sw5Map = [0, 1, 6, 10, 2, 12, 4, 8] as const

const sw6Map = [0, 1, 2, 4, 6, 12, 14] as const

const getSw7State = (sw7AState: number, sw7BState: number) =>
  match(sw7AState)
    .with(0, () =>
      match(sw7BState)
        .with(0, () => 0)
        .with(1, () => 2)
        .otherwise(() => 4),
    )
    .with(1, () =>
      match(sw7BState)
        .with(0, () => 1)
        .with(1, () => 3)
        .otherwise(() => 5),
    )
    .otherwise(() =>
      match(sw7BState)
        .with(0, () => 8)
        .with(1, () => 10)
        .otherwise(() => 12),
    )

const sw8Map = [0, 1, 2, 4, 8] as const

const sw9Map = [0, 1, 4, 2, 6, 14] as const

const mux1Map = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const

const mux2Map = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const

const mux3Map = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const

const mux4Map = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const

const mux5Map = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const

export const getAtCommand = (state: Record<keyof Circuit, number>) => {
  const swState: number[] = []

  swState[3] = getSw4State(state.sw4A, state.sw4B)

  swState[6] = getSw7State(state.sw7A, state.sw7B)

  const sw = {
    1: ['sw1', sw1Map] as const,
    2: ['sw2', sw2Map] as const,
    3: ['sw3', sw3Map] as const,
    5: ['sw5', sw5Map] as const,
    6: ['sw6', sw6Map] as const,
    8: ['sw8', sw8Map] as const,
    9: ['sw9', sw9Map] as const,
  }

  for (const key in sw) {
    const [name, map] = sw[key]

    swState[parseInt(key) - 1] = map[state[name]]
  }

  const muxState: number[] = []

  const mux = {
    1: ['mux1', mux1Map],
    2: ['mux2', mux2Map],
    3: ['mux3', mux3Map],
    4: ['mux4', mux4Map],
    5: ['mux5', mux5Map],
  }

  for (const key in mux) {
    const [name, map] = mux[key]

    muxState[parseInt(key) - 1] = map[state[name]]
  }

  const swCommands = swState.map(
    (val, i) => `at+sw=${i + 1}, ${val.toString(16)}`,
  )
  const muxCommands = muxState.map(
    (val, i) => `at+mux=${i + 1}, ${val.toString(16)}`,
  )

  // return [...swCommands, `at+muxa=${muxState.join(' ')}`]
  return [...swCommands, ...muxCommands]
}
