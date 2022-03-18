import { measurement, unit } from './measurement'

/* prettier-ignore */
export const resistance = measurement(
  unit('Ом'),
  unit('кОм', 1000),
)
export type Resistance = ReturnType<typeof resistance>

export const capacitance = measurement(
  unit('пФ'),
  unit('нФ', 1000),
  unit('мкФ', 1000),
)
export type Capacitance = ReturnType<typeof capacitance>

export const inductance = measurement(unit('мкГн'))
export type Inductance = ReturnType<typeof inductance>

export const voltage = measurement(unit('В'))
export type Voltage = ReturnType<typeof voltage>

export const electricalForce = measurement(unit('мА'))
export type ElectricalForce = ReturnType<typeof electricalForce>
