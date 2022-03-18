<template>
  <div
    class="bg-zinc-700 w-full rounded-2xl shadow-2xl p-4 aspect-[4/3] grid grid-rows-[1fr,10px] grid-cols-[10px,1fr,10px] gap-x-6 gap-y-3"
  >
    <NSlider
      vertical
      class="blue-rail"
      placement="left"
      :min="channel1.min"
      :max="channel1.max"
      :value="channel1Range"
      :step="1"
      @update:value="val => updateValue('channel1', val)"
      range
    ></NSlider>

    <NSlider
      vertical
      class="amber-rail col-start-3 -translate-x-1/2"
      placement="right"
      :min="channel2.min"
      :max="channel2.max"
      :value="channel2Range"
      :step="1"
      @update:value="val => updateValue('channel2', val)"
      range
      :disabled="!channel2Enabled"
    ></NSlider>

    <div
      class="bg-zinc-200 w-full h-full rounded-lg shadow-[inset_2px_2px_10px_2px_rgba(0,0,0,0.3)] col-start-2 row-start-1"
    >
      <slot></slot>
    </div>

    <NSlider
      class="row-span-1 col-span-1 row-start-2 col-start-2"
      :min="x.min"
      :max="x.max"
      :value="xRange"
      :step="1"
      @update:value="val => updateValue('x', val)"
      range
    ></NSlider>

    <NCheckbox
      class="row-start-2 col-start-3 -translate-x-1/2 -translate-y-1/2"
      v-model:checked="channel2Enabled"
    />
  </div>
</template>

<script setup lang="ts">
  import { NSlider, NCheckbox } from 'naive-ui'
  import { watch } from 'vue'

  let channel2Enabled = $ref(true)

  const { channel1Range } = defineProps<{
    xRange: [number, number]
    channel1Range: [number, number]
    channel2Range: [number, number]
    x: {
      min: number
      max: number
    }
    channel1: {
      min: number
      max: number
    }
    channel2: {
      min: number
      max: number
    }
  }>()

  const emit = defineEmits<{
    (event: 'update:xValue', value: [number, number]): void
    (event: 'update:channel1Range', value: [number, number]): void
    (event: 'update:channel2Range', value: [number, number]): void
  }>()

  const updateValue = (
    label: 'x' | 'channel1' | 'channel2',
    value: [number, number],
  ) => {
    if (!channel2Enabled && label === 'channel1') {
      emit(`update:channel1Range`, [Math.min(...value), Math.max(...value)])
      emit(`update:channel2Range`, [Math.min(...value), Math.max(...value)])
      return
    }

    emit(`update:${label}Range`, [Math.min(...value), Math.max(...value)])
  }

  watch($$(channel2Enabled), enabled => {
    if (!enabled) {
      emit('update:channel2Range', channel1Range)
    }
  })
</script>

<style scoped>
  :global(.n-slider-rail) {
    width: 100% !important;
  }

  :global(.n-slider--vertical > .n-slider-rail) {
    width: 4px !important;
  }

  .blue-rail[style] {
    --n-fill-color: theme('colors.blue.500') !important;
    --n-fill-color-hover: theme('colors.blue.300') !important;
  }

  .amber-rail[style] {
    --n-fill-color: theme('colors.amber.500') !important;
    --n-fill-color-hover: theme('colors.amber.300') !important;
  }
</style>
