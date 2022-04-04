import { Element, statesMap } from '@energia/common'
import { Ref, computed } from 'vue'

export const getLabel = (el: Element) => {
  switch (el._tag) {
    case 'resistor':
      return el.value.resistance.toString()
    case 'capacitor':
      return el.value.capacitance.toString()
    case 'inductor':
      return el.value.inductance.toString()
    default:
      return undefined
  }
}

export const useNode = (
  name: keyof typeof statesMap,
  ref: Ref<number>,
  options: ReadonlyArray<Element> = [],
) => {
  return computed(() => ({
    bind: {
      selectable: options.length > 1,
      onSelect: (i: number) => {
        ref.value = i
      },
      type: statesMap[name][ref.value]._tag,
      options,
      index: ref.value,
      label: getLabel(statesMap[name][ref.value]),
      name,
    },
  }))
}

export const useSupplNode = (
  name: keyof typeof statesMap,
  ref: Ref<number>,
) => {
  return computed(() => ({
    bind: {
      selectable: false,
      type: statesMap[name][ref.value]._tag,
      label: getLabel(statesMap[name][ref.value]),
    },
    displaySupplNode: true,
  }))
}
