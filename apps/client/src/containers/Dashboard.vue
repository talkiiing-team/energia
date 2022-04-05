<template>
  <div
    class="w-full mx-auto container max-w-4xl flex flex-col md:flex-row items-center gap-5 px-6"
  >
    <div class="flex flex-col space-y-5">
      <Speedometer
        :options="options"
        :value="(channels?.channel1.average ?? 0).toFixed(2)"
        :min="channels?.channel1.min ?? 0"
        :max="channels?.channel1.max ?? 10"
        :unit="channels?.channel1.unit ?? ''"
        v-model="selectedChannels.channel1"
      />
      <Speedometer
        :options="options"
        status="warning"
        :value="(channels?.channel2.average ?? 0).toFixed(2)"
        :min="channels?.channel2.min ?? 0"
        :max="channels?.channel2.max ?? 10"
        :unit="channels?.channel2.unit ?? ''"
        v-model="selectedChannels.channel2"
      />
    </div>
    <Oscilloscope
      v-model:xValue="xRange"
      v-model:yValue="yRange"
      :y="{ min: -11, max: 11 }"
      :x="{ min: 0, max: 256 }"
    >
      <LineChart
        v-if="!!channels"
        class="h-full"
        :chart-data="{
          labels: Object.keys(channels.channel1.values),
          datasets: [
            {
              data: channels.channel1.values,
              fill: false,
              borderColor: colors.blue[500],
            },
            {
              data: channels.channel2.values,
              fill: false,
              borderColor: colors.amber[500],
            },
          ],
        }"
        :options="{
          elements: {
            point: {
              radius: 0,
            },
          },
          legend: {
            display: false,
          },
          tooltips: {
            enabled: false,
          },
          scales: {
            x: {
              min: xRange[0],
              max: xRange[1],
            },
            y: {
              min: yRange[0],
              max: yRange[1],
            },
          },
          animation: {
            duration: 350,
          },
        }"
      />
    </Oscilloscope>
  </div>
</template>

<script setup lang="ts">
  import colors from 'tailwindcss/colors'
  import Speedometer from '../ui/common/Speedometer.vue'
  import Oscilloscope from '../ui/common/Oscilloscope.vue'
  import { LineChart } from 'vue-chart-3'
  import { circuitStore } from '../stores/circuit.store'
  import { toRefs, watch } from 'vue'
  import { tpv, amp } from '@energia/common'

  const { channels, selectedChannels, acDc } = toRefs(circuitStore())

  const options = [...tpv, ...amp]

  const yRange = $ref<[number, number]>([-5, 5])
  let xRange = $ref<[number, number]>([0, 256])

  watch(
    acDc,
    () => {
      if (acDc.value._tag === 'dc') xRange = [2, 3]
      else xRange = [0, 256]
    },
    {
      immediate: true,
    },
  )
</script>
