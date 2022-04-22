import { createTagged, Tagged } from '../core'
import {
  Capacitance,
  ElectricalForce,
  Inductance,
  Resistance,
} from '../core/metrics'

export type BreakerOptions = undefined
export type Breaker = Tagged<'breaker', BreakerOptions>
export const breaker = (options: BreakerOptions = undefined) =>
  createTagged('breaker', options) as Breaker

export type JumperOptions = undefined
export type Jumper = Tagged<'jumper', JumperOptions>
export const jumper = (options: JumperOptions = undefined) =>
  createTagged('jumper', options) as Jumper

export type VoltmeterOptions = undefined
export type Voltmeter = Tagged<'voltmeter', VoltmeterOptions>
export const voltmeter = (options: VoltmeterOptions = undefined) =>
  createTagged('voltmeter', options) as Voltmeter

export type AmpermeterOptions = {
  derivation: Resistance
  maxCurrent: ElectricalForce
}
export type Ampermeter = Tagged<'ampermeter', AmpermeterOptions>
export const ampermeter = (options: AmpermeterOptions) =>
  createTagged('ampermeter', options) as Ampermeter

export type ResistorOptions = {
  resistance: Resistance
}
export type Resistor = Tagged<'resistor', ResistorOptions>
export const resistor = (options: ResistorOptions) =>
  createTagged('resistor', options) as Resistor

export type AcOptions = {
  voltage: number
  frequency: number
}
export type Ac = Tagged<'ac', AcOptions>
export const ac = (options: AcOptions) => createTagged('ac', options) as Ac

export type DcOptions = {
  voltage: number
}
export type Dc = Tagged<'dc', DcOptions>
export const dc = (options: DcOptions) => createTagged('dc', options) as Dc

export type CapacitorOptions = {
  capacitance: Capacitance
}
export type Capacitor = Tagged<'capacitor', CapacitorOptions>
export const capacitor = (options: CapacitorOptions) =>
  createTagged('capacitor', options) as Capacitor

export type InductorOptions = {
  inductance: Inductance
}
export type Inductor = Tagged<'inductor', InductorOptions>
export const inductor = (options: InductorOptions) =>
  createTagged('inductor', options) as Inductor

export type Element =
  | Breaker
  | Jumper
  | Voltmeter
  | Ampermeter
  | Resistor
  | Ac
  | Dc
  | Capacitor
  | Inductor
export type ElementType = Element['_tag']
