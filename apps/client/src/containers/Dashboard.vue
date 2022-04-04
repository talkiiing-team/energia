<template>
  <div
    class="w-full mx-auto container max-w-4xl flex flex-col md:flex-row items-center gap-5 px-6"
  >
    <div class="flex flex-col space-y-5">
      <Speedometer
        :options="tpv"
        :value="channelsMax.channel1"
        :min="0"
        :max="10"
        unit="В"
        v-model="selectedChannels.channel1"
      />
      <Speedometer
        :options="tpv"
        status="warning"
        :value="channelsMax.channel2"
        :min="0"
        :max="10"
        unit="В"
        v-model="selectedChannels.channel2"
      />
    </div>
    <Oscilloscope>
      <LineChart
        v-if="!!channels"
        class="h-full"
        :chart-data="{
          labels: Object.keys(channels.channel1),
          datasets: [
            {
              data: channels.channel1,
              fill: false,
              borderColor: colors.blue[500],
            },
            {
              data: channels.channel2,
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
  import { toRefs } from 'vue'

  const { channels, selectedChannels } = toRefs(circuitStore())

  const tpv = [
    'tpv1',
    'tpv2',
    'tpv3',
    'tpv4',
    'tpv5',
    'tpv6',
    'tpv7',
    'tpv8',
    'tpv9',
  ]

  const channelsMax = $computed(() => ({
    channel1:
      channels.value?.channel1
        .reduce((acc, val) => Math.max(acc, Math.abs(val), 0))
        .toFixed(2) ?? '0',
    channel2:
      channels.value?.channel2
        .reduce((acc, val) => Math.max(acc, Math.abs(val), 0))
        .toFixed(2) ?? '0',
  }))
</script>
