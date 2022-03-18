<template>
  <component
    :is="icon"
    class="w-12 h-12"
    :class="orientation === 'horizontal' && 'rotate-90'"
  />
</template>

<script setup lang="ts">
  import { match } from 'ts-pattern'
  import BreakerIcon from '@/assets/circuit/breaker.svg?component'
  import ResistorIcon from '@/assets/circuit/resistor.svg?component'
  import AcIcon from '@/assets/circuit/ac.svg?component'
  import DcIcon from '@/assets/circuit/dc.svg?component'
  import CapacitorIcon from '@/assets/circuit/capacitor.svg?component'
  import InductorIcon from '@/assets/circuit/inductor.svg?component'
  import VoltmeterIcon from '@/assets/circuit/voltmeter.svg?component'
  import AmpermeterIcon from '@/assets/circuit/ampermeter.svg?component'
  import { ElementType } from '@energia/common'

  export type ElementOrientation = 'vertical' | 'horizontal'

  const { type, orientation = 'vertical' } = defineProps<{
    type: ElementType
    orientation?: ElementOrientation
  }>()

  const icon = $computed(() =>
    match(type)
      .with('breaker', () => BreakerIcon)
      .with('resistor', () => ResistorIcon)
      .with('ampermeter', () => AmpermeterIcon)
      .with('ac', () => AcIcon)
      .with('dc', () => DcIcon)
      .with('capacitor', () => CapacitorIcon)
      .with('inductor', () => InductorIcon)
      .with('voltmeter', () => VoltmeterIcon)
      .with('jumper', () => 'div')
      .exhaustive(),
  )
</script>
