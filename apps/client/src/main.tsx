import { createApp } from 'vue'
import './ui/styles/index.css'

import App from './App.vue'
import { createPinia } from 'pinia'

import { Chart, registerables } from 'chart.js'

import colors from 'tailwindcss/colors'

Chart.register(...registerables)

Chart.overrides.line.plugins = {
  legend: {
    display: false,
  },
}

Chart.overrides.line.scales.x = {
  grid: { color: colors.zinc[600] },
}

Chart.overrides.line.scales.y = {
  grid: { color: colors.zinc[600] },
}

// {
//   plugins: {

//   },
//   scales: {
//     x: {
//       grid: {
//         color: colors.rose[500],
//       },
//     },
//   },
// }

createApp(App).use(createPinia()).mount('#root')
