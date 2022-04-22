<template>
  <div
    class="flex flex-col w-32 items-center space-y-3 cursor-pointer"
    @click="isOpened = !isOpened"
  >
    <div class="relative w-fit">
      <n-progress type="dashboard" :status="status" :percentage="percentage">
        <span
          class="text-xl text-center"
          :class="Math.abs(parseFloat(value)) > max && 'text-rose-500'"
          >{{ value }} <span class="text-zinc-600">{{ unit }}</span></span
        >
      </n-progress>

      <span class="absolute bottom-3 left-8 text-zinc-500">{{ min }}</span>
      <span class="absolute bottom-3 right-8 text-right text-zinc-500">{{
        max
      }}</span>
    </div>

    <NSelect
      :options="selectOptions"
      @update:value="onSelect"
      :value="modelValue"
      :show="isOpened"
    />
  </div>
</template>

<script setup lang="ts">
  import { NProgress, NSelect } from 'naive-ui'

  let isOpened = $ref(false)

  const { value, unit, min, max, status, options, modelValue } = defineProps<{
    value: string
    unit: string
    min: number
    max: number
    options: string[]
    modelValue: string
    status?: 'success' | 'error' | 'warning' | 'info' | 'default'
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void
  }>()

  const onSelect = (value: string) => {
    emit('update:modelValue', value)
    isOpened = false
  }

  const selectOptions = $computed(() =>
    options.map(option => ({
      value: option,
      label: option,
    })),
  )

  const percentage = $computed(() =>
    Math.max(Math.min(((value - min) / (max - min)) * 100, 100), 0),
  )
</script>
