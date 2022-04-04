import {
  ampermeter,
  breaker,
  capacitor,
  inductor,
  jumper,
  resistor,
  voltmeter,
  Element,
  Ac,
  Dc,
  dc,
} from './element'
import { capacitance, inductance, resistance } from '../core/metrics'

export const sw1 = [
  breaker(),
  jumper(),
  capacitor({ capacitance: capacitance(0.01, 'мкФ') }),
  capacitor({ capacitance: capacitance(0.02, 'мкФ') }),
  capacitor({ capacitance: capacitance(0.062, 'мкФ') }),
  capacitor({ capacitance: capacitance(0.072, 'мкФ') }),
  capacitor({ capacitance: capacitance(0.082, 'мкФ') }),
] as const

export type Sw1 = typeof sw1[number]

export const sw2 = [
  breaker(),
  jumper(),
  capacitor({ capacitance: capacitance(0.022, 'мкФ') }),
  capacitor({ capacitance: capacitance(0.01, 'мкФ') }),
  capacitor({ capacitance: capacitance(0.032, 'мкФ') }),
  capacitor({ capacitance: capacitance(0.02, 'мкФ') }),
  capacitor({ capacitance: capacitance(0.042, 'мкФ') }),
] as const

export type Sw2 = typeof sw2[number]

export const sw3 = [
  breaker(),
  jumper(),
  capacitor({ capacitance: capacitance(0.015, 'мкФ') }),
  capacitor({ capacitance: capacitance(3300, 'пФ') }),
  capacitor({ capacitance: capacitance(0.0183, 'мкФ') }),
  capacitor({ capacitance: capacitance(6600, 'пФ') }),
  capacitor({ capacitance: capacitance(0.0216, 'мкФ') }),
] as const

export type Sw3 = typeof sw3[number]

export const sw5 = [
  breaker(),
  jumper(),
  resistor({ resistance: resistance(66, 'Ом') }),
  resistor({ resistance: resistance(75, 'Ом') }),
  resistor({ resistance: resistance(100, 'Ом') }),
  resistor({ resistance: resistance(120, 'Ом') }),
  resistor({ resistance: resistance(200, 'Ом') }),
  resistor({ resistance: resistance(300, 'Ом') }),
] as const

export type Sw5 = typeof sw5[number]

export const sw6 = [
  breaker(),
  jumper(),
  capacitor({ capacitance: capacitance(0.015, 'мкФ') }),
  capacitor({ capacitance: capacitance(3300, 'пФ') }),
  capacitor({ capacitance: capacitance(0.0183, 'мкФ') }),
  capacitor({ capacitance: capacitance(6600, 'пФ') }),
  capacitor({ capacitance: capacitance(0.0216, 'мкФ') }),
] as const

export type Sw6 = typeof sw6[number]

export const sw6Suppl = [inductor({ inductance: inductance(390, 'мкГн') })]

export type Sw6Suppl = typeof sw6Suppl[number]

export const sw7A = [
  breaker(),
  jumper(),
  inductor({ inductance: inductance(820, 'мкГн') }),
] as const

export type Sw7A = typeof sw7A[number]

export const sw8 = [
  breaker(),
  resistor({ resistance: resistance(20, 'Ом') }),
  resistor({ resistance: resistance(30, 'Ом') }),
  resistor({ resistance: resistance(39, 'Ом') }),
  resistor({ resistance: resistance(100, 'Ом') }),
] as const

export type Sw8 = typeof sw8[number]

export const sw9 = [
  breaker(),
  jumper(),
  capacitor({ capacitance: capacitance(0.01, 'мкФ') }),
  capacitor({ capacitance: capacitance(0.022, 'мкФ') }),
  capacitor({ capacitance: capacitance(0.032, 'мкФ') }),
  capacitor({ capacitance: capacitance(0.042, 'мкФ') }),
] as const

export type Sw9 = typeof sw9[number]

export const sw7B = [
  breaker(),
  jumper(),
  inductor({ inductance: inductance(390, 'мкГн') }),
] as const

export type Sw7B = typeof sw7B[number]

export const sw9Suppl = [inductor({ inductance: inductance(820, 'мкГн') })]

export type Sw9Suppl = typeof sw9Suppl[number]

export const sw4A = [breaker(), jumper()] as const

export type Sw4A = typeof sw4A[number]

export const sw4B = [
  breaker(),
  inductor({ inductance: inductance(1.5, 'мкГн') }),
] as const

export type Sw4B = typeof sw4B[number]

export const mux1 = [
  breaker(),
  jumper(),
  resistor({ resistance: resistance(16, 'Ом') }),
  resistor({ resistance: resistance(91, 'Ом') }),
  resistor({ resistance: resistance(110, 'Ом') }),
  resistor({ resistance: resistance(120, 'Ом') }),
  resistor({ resistance: resistance(150, 'Ом') }),
  resistor({ resistance: resistance(1, 'кОм') }),
  resistor({ resistance: resistance(2, 'кОм') }),
] as const

export type Mux1 = typeof mux1[number]

export const mux2 = [
  breaker(),
  jumper(),
  resistor({ resistance: resistance(100, 'Ом') }),
  resistor({ resistance: resistance(110, 'Ом') }),
  resistor({ resistance: resistance(120, 'Ом') }),
  resistor({ resistance: resistance(150, 'Ом') }),
  resistor({ resistance: resistance(180, 'Ом') }),
  resistor({ resistance: resistance(100, 'Ом') }),
  resistor({ resistance: resistance(250, 'Ом') }),
] as const

export type Mux2 = typeof mux2[number]

export const mux3 = [
  breaker(),
  jumper(),
  resistor({ resistance: resistance(100, 'Ом') }),
  resistor({ resistance: resistance(110, 'Ом') }),
  resistor({ resistance: resistance(120, 'Ом') }),
  resistor({ resistance: resistance(150, 'Ом') }),
  resistor({ resistance: resistance(180, 'Ом') }),
  resistor({ resistance: resistance(100, 'Ом') }),
  resistor({ resistance: resistance(250, 'Ом') }),
] as const

export type Mux3 = typeof mux2[number]

export const mux4 = [
  breaker(),
  jumper(),
  resistor({ resistance: resistance(100, 'Ом') }),
  resistor({ resistance: resistance(200, 'Ом') }),
  resistor({ resistance: resistance(300, 'Ом') }),
  resistor({ resistance: resistance(150, 'Ом') }),
  resistor({ resistance: resistance(390, 'Ом') }),
  resistor({ resistance: resistance(510, 'Ом') }),
  resistor({ resistance: resistance(1, 'кОм') }),
] as const

export type Mux4 = typeof mux4[number]

export const mux5 = [
  breaker(),
  jumper(),
  resistor({ resistance: resistance(16, 'Ом') }),
  resistor({ resistance: resistance(27, 'Ом') }),
  resistor({ resistance: resistance(47, 'Ом') }),
  resistor({ resistance: resistance(68, 'Ом') }),
  resistor({ resistance: resistance(82, 'Ом') }),
  resistor({ resistance: resistance(100, 'Ом') }),
  resistor({ resistance: resistance(1, 'кОм') }),
] as const

export type Mux5 = typeof mux5[number]

export const tpv1 = [voltmeter()]
export type Tpv1 = typeof tpv1[number]

export const tpv2 = [voltmeter()]
export type Tpv2 = typeof tpv2[number]

export const tpv3 = [voltmeter()]
export type Tpv3 = typeof tpv3[number]

export const tpv4 = [voltmeter()]
export type Tpv4 = typeof tpv4[number]

export const tpv5 = [voltmeter()]
export type Tpv5 = typeof tpv5[number]

export const tpv6 = [voltmeter()]
export type Tpv6 = typeof tpv6[number]

export const tpv7 = [voltmeter()]
export type Tpv7 = typeof tpv7[number]

export const tpv8 = [voltmeter()]
export type Tpv8 = typeof tpv8[number]

export const tpv9 = [voltmeter()]
export type Tpv9 = typeof tpv9[number]

export const a1 = [ampermeter()]
export type A1 = typeof a1[number]

export const a2 = [ampermeter()]
export type A2 = typeof a2[number]

export const a3 = [ampermeter()]
export type A3 = typeof a3[number]

export const a4 = [ampermeter()]
export type A4 = typeof a4[number]

export type Generator = Ac | Dc

export type Circuit = {
  sw1: Sw1
  sw2: Sw2
  sw3: Sw3
  sw4A: Sw4A
  sw4B: Sw4B
  sw5: Sw5
  sw6: Sw6
  sw6Suppl: Sw6Suppl
  sw7A: Sw7A
  sw7B: Sw7B
  sw8: Sw8
  sw9: Sw9
  sw9Suppl: Sw9Suppl
  mux1: Mux1
  mux2: Mux2
  mux3: Mux3
  mux4: Mux4
  mux5: Mux5
  tpv1: Tpv1
  tpv2: Tpv2
  tpv3: Tpv3
  tpv4: Tpv4
  tpv5: Tpv5
  tpv6: Tpv6
  tpv7: Tpv7
  tpv8: Tpv8
  tpv9: Tpv9
  a1: A1
  a2: A2
  a3: A3
  a4: A4
  acDc: Generator
}

export const statesMap = {
  sw1,
  sw2,
  sw3,
  sw4A,
  sw4B,
  sw5,
  sw6,
  sw6Suppl,
  sw7A,
  sw7B,
  sw8,
  sw9,
  sw9Suppl,
  mux1,
  mux2,
  mux3,
  mux4,
  mux5,
  tpv1,
  tpv2,
  tpv3,
  tpv4,
  tpv5,
  tpv6,
  tpv7,
  tpv8,
  tpv9,
  a1,
  a2,
  a3,
  a4,
} as Record<Exclude<keyof Circuit, 'acDc'>, ReadonlyArray<Element>>

export const INITIAL_STATE = {
  sw1: 0,
  sw2: 0,
  sw3: 0,
  sw4A: 0,
  sw4B: 0,
  sw5: 0,
  sw6: 0,
  sw6Suppl: 0,
  sw7A: 0,
  sw7B: 0,
  sw8: 0,
  sw9: 0,
  sw9Suppl: 0,
  mux1: 0,
  mux2: 0,
  mux3: 0,
  mux4: 0,
  mux5: 0,
  tpv1: 0,
  tpv2: 0,
  tpv3: 0,
  tpv4: 0,
  tpv5: 0,
  tpv6: 0,
  tpv7: 0,
  tpv8: 0,
  tpv9: 0,
  a1: 0,
  a2: 0,
  a3: 0,
  a4: 0,
  acDc: dc({
    voltage: 1,
  }) as Generator,
}
