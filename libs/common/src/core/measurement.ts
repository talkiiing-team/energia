type MeasurementUnit<Initials extends string> = {
  initials: Initials
}

type MeasurementUnitWithMultiplier<Initials extends string> =
  MeasurementUnit<Initials> & {
    multiplier: number
  }

export type Quantity<Initials extends string> = {
  initial: number
  initialUnit: Initials

  in(unit: Initials): number
  toString(unit?: Initials): string
}

export function unit<Initials extends string>(
  initials: Initials,
): MeasurementUnit<Initials>
export function unit<Initials extends string>(
  initials: Initials,
  multiplier: number,
): MeasurementUnitWithMultiplier<Initials>

export function unit<Initials extends string>(
  initials: Initials,
  multiplier?: number,
) {
  return {
    initials,
    multiplier,
  }
}

export const measurement =
  <Initials extends string>(
    ...units: [
      MeasurementUnit<Initials>,
      ...MeasurementUnitWithMultiplier<Initials>[],
    ]
  ) =>
  (initial: number, initialUnit: Initials): Quantity<Initials> => ({
    initial,
    initialUnit,
    in(unit) {
      const currentUnitIndex = units.findIndex(
        x => x.initials === this.initialUnit,
      )
      const nextUnitIndex = units.findIndex(x => x.initials === unit)

      if (currentUnitIndex === nextUnitIndex) {
        return this.initial
      }

      if (nextUnitIndex > currentUnitIndex) {
        return (
          units.slice(
            currentUnitIndex + 1,
            nextUnitIndex + 1,
          ) as MeasurementUnitWithMultiplier<Initials>[]
        ).reduce(
          (acc: number, { multiplier }) => acc / multiplier,
          this.initial,
        )
      }

      return (
        units.slice(
          nextUnitIndex + 1,
          currentUnitIndex + 1,
        ) as MeasurementUnitWithMultiplier<Initials>[]
      ).reduce((acc: number, { multiplier }) => acc * multiplier, this.initial)
    },
    toString(unit = initialUnit) {
      return `${this.in(unit)} ${unit}`
    },
  })
