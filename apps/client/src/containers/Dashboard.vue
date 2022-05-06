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
      v-model:xRange="xRange"
      v-model:channel1Range="channel1Range"
      v-model:channel2Range="channel2Range"
      :channel1="channel1"
      :channel2="channel2"
      :x="{ min: 0, max: 1024 }"
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
              yAxisID: 'channel1',
            },
            {
              data: channels.channel2.values,
              fill: false,
              borderColor: colors.amber[500],
              yAxisID: 'channel2',
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
            channel1: {
              min: channel1Range[0],
              max: channel1Range[1],
              position: 'left',
              grid: {
                color: colors.transparent,
              },
            },
            channel2: {
              min: channel2Range[0],
              max: channel2Range[1],
              position: 'right',
              grid: {
                color: colors.transparent,
              },
            },
            channelGhost: {
              min: -10,
              max: 10,
              ticks: {
                display: false,
                major: {
                  enabled: false,
                },
                stepSize: 1,
                color: colors.transparent,
              },
              drawBorder: false,
              grid: {
                color: colors.zinc[400],
                borderColor: colors.transparent,
                drawTicks: false,
              },
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

  const { channels, selectedChannels, acDc, sendState } = toRefs(circuitStore())

  sendState.value()

  const options = [...tpv, ...amp]

  const channel1Range = $ref<[number, number]>([-5, 5])
  const channel2Range = $ref<[number, number]>([-5, 5])
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

  const channel1 = $computed(() => {
    // const max = channels.value?.channel1.max ?? 10
    const max = tpv.includes(selectedChannels.value.channel1)
      ? 10
      : acDc.value._tag === 'ac'
      ? 35
      : 45
    return {
      min: -max,
      max,
    }
  })

  const channel2 = $computed(() => {
    const max = tpv.includes(selectedChannels.value.channel2)
      ? 10
      : acDc.value._tag === 'ac'
      ? 35
      : 45
    return {
      min: -max,
      max,
    }
  })
</script>
