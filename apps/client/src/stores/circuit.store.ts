import { defineStore } from 'pinia'
import { reactive, ref, toRefs, watch } from 'vue'
import axios from 'axios'
import { Channels, INITIAL_STATE } from '@energia/common'
import { useLoadingBar } from 'naive-ui'

type SelectedChannels = {
  channel1: string
  channel2: string
}

export const circuitStore = defineStore('circuit', () => {
  const loadingBar = useLoadingBar()

  const elements = reactive<typeof INITIAL_STATE>({
    ...INITIAL_STATE,
  })
  const channels = ref<Channels>()
  const selectedChannels = ref<SelectedChannels>({
    channel1: 'tpv1',
    channel2: 'tpv2',
  })

  const sendState = async () => {
    loadingBar.start()
    await axios.post('http://10.8.0.2:3030/state', elements)
    const response = await axios.get(
      `http://10.8.0.2:3030/channels?channel1=${selectedChannels.value.channel1}&channel2=${selectedChannels.value.channel2}`,
    )
    loadingBar.finish()
    channels.value = response.data
  }

  watch(Object.values(toRefs(elements)), sendState)

  watch(
    Object.values(toRefs(selectedChannels.value)),
    async () => {
      console.log('reloading channels')

      loadingBar.start()
      const response = await axios.get(
        `http://10.8.0.2:3030/channels?channel1=${selectedChannels.value.channel1}&channel2=${selectedChannels.value.channel2}`,
      )
      loadingBar.finish()

      channels.value = response.data
    },
    {
      immediate: true,
    },
  )

  return { ...toRefs(elements), channels, selectedChannels, sendState }
})
