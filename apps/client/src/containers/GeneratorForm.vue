<template>
  <div class="w-36 flex flex-col p-2 bg-zinc-200 shadow-lg rounded-lg">
    <n-switch
      :value="isDc"
      :rail-style="railStyle"
      @update:value="changeType"
      class="mb-3"
    >
      <template #checked>Постоянный</template>
      <template #unchecked>Переменный</template>
    </n-switch>
    <label class="text-xs text-zinc-500">Напряжение</label>
    <n-input-number
      class="mb-2"
      v-model:value="acDc.value.voltage"
      :min="voltageRange.min"
      :max="voltageRange.max"
      :step="1"
    />
    <label class="text-xs text-zinc-500" v-if="!isDc">Частота</label>
    <n-input-number
      class="mb-3"
      v-if="!isDc"
      v-model:value="acDc.value.frequency"
      :min="1"
      :max="99999"
    />
    <n-button type="info" secondary @click="sendState">Обновить</n-button>
  </div>
</template>

<script setup lang="ts">
  import { CSSProperties, toRefs } from 'vue'
  import { NSwitch, NInputNumber, NButton } from 'naive-ui'
  import { circuitStore } from '../stores/circuit.store'
  import { ac, dc } from '@energia/common'
  import colors from 'tailwindcss/colors'

  const store = circuitStore()

  const { sendState } = store

  const { acDc } = toRefs(store)

  const railStyle = ({
    focused,
    checked,
  }: {
    focused: boolean
    checked: boolean
  }) => {
    const style: CSSProperties = {}
    if (checked) {
      style.background = colors.green[400]
      if (focused) {
        style.boxShadow = `0 0 0 2px ${colors.green[400]}`
      }
    } else {
      style.background = colors.blue[400]
      if (focused) {
        style.boxShadow = `0 0 0 2px ${colors.blue[400]}`
      }
    }
    return style
  }

  const changeType = (isDc: boolean) => {
    if (isDc) {
      acDc.value = dc({
        voltage: 1,
      })
    } else {
      acDc.value = ac({
        voltage: 1,
        frequency: 1000,
      })
    }
  }

  const voltageRange = $computed(() => {
    if (acDc.value._tag === 'ac') {
      return {
        min: 0,
        max: 10,
      }
    } else {
      return {
        min: -5,
        max: 5,
      }
    }
  })

  const isDc = $computed(() => {
    return acDc.value._tag === 'dc'
  })
</script>
