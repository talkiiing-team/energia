import { Element } from '@energia/common'
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
  name: string,
  ref: Ref<Element>,
  options: ReadonlyArray<Element> = [],
) => {
  return computed(() => ({
    bind: {
      selectable: options.length > 1,
      onSelect: (i: number) => {
        ref.value = options[i]
      },
      type: ref.value._tag,
      options,
      index: options.findIndex(
        val => JSON.stringify(val) === JSON.stringify(ref.value),
      ),
      label: getLabel(ref.value),
      name,
    },
  }))
}

export const useSupplNode = (ref: Ref<Element | null>) => {
  return computed(() => ({
    bind: {
      selectable: false,
      type: ref.value?._tag ?? undefined,
      label: !!ref.value ? getLabel(ref.value) : '',
    },
    displaySupplNode: !!ref.value,
  }))
}
