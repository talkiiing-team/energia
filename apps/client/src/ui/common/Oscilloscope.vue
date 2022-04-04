<template>
  <div
    class="bg-zinc-700 w-full rounded-2xl shadow-2xl p-4 aspect-[4/3] grid grid-rows-[1fr,10px] grid-cols-[10px,1fr] gap-x-6 gap-y-3"
  >
    <NSlider
      vertical
      placement="left"
      :min="y.min"
      :max="y.max"
      :value="yValue"
      :step="0.5"
      @update:value="val => updateValue('y', val)"
      range
    ></NSlider>

    <div
      class="bg-zinc-900 w-full h-full rounded-lg shadow-[inset_2px_2px_10px_2px_rgba(0,0,0,0.3)]"
    >
      <slot></slot>
    </div>

    <NSlider
      class="row-span-1 col-span-1 row-start-2 col-start-2"
      :min="x.min"
      :max="x.max"
      :value="xValue"
      :step="1"
      @update:value="val => updateValue('x', val)"
      range
    ></NSlider>
  </div>
</template>

<script setup lang="ts">
  import { NSlider } from 'naive-ui'

  defineProps<{
    xValue: [number, number]
    yValue: [number, number]
    x: {
      min: number
      max: number
    }
    y: {
      min: number
      max: number
    }
  }>()

  const emit = defineEmits<{
    (event: 'update:xValue', value: [number, number]): void
    (event: 'update:yValue', value: [number, number]): void
  }>()

  const updateValue = (label: 'x' | 'y', value: [number, number]) =>
    emit(label === 'x' ? 'update:xValue' : 'update:yValue', [
      Math.min(...value),
      Math.max(...value),
    ])
</script>

<style>
  .n-slider-rail {
    width: 100% !important;
  }

  .n-slider--vertical > .n-slider-rail {
    width: 4px !important;
  }
</style>
