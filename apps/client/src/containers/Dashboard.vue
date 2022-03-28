<template>
  <div class="w-full mx-auto container max-w-4xl flex flex-row space-x-5 px-6">
    <div class="flex flex-col space-y-5">
      <Speedometer :value="3" :min="0" :max="10" unit="В" />
      <Speedometer status="warning" :value="3" :min="0" :max="10" unit="В" />
    </div>
    <Oscilloscope>
      <LineChart
        :chart-data="{
          labels: [1, 2, 3],
          datasets: [
            {
              data: [2, 7, 5],
              fill: false,
              borderColor: colors.blue[500],
            },
            {
              data: [1, 6, 4],
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
</script>
