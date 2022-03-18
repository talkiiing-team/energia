import { defineStore } from 'pinia'
import { reactive, ref, toRefs, watch } from 'vue'
import axios from 'axios'
import { Channels, INITIAL_STATE } from '@energia/common'
import { useLoadingBar, useMessage } from 'naive-ui'

type SelectedChannels = {
  channel1: string
  channel2: string
}

const BASE_URL = import.meta.env.PROD
  ? ''
  : `${window.location.protocol}//${window.location.hostname}:3030`

export const circuitStore = defineStore('circuit', () => {
  const loadingBar = useLoadingBar()
  const message = useMessage()

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
    try {
      await axios.post(`${BASE_URL}/state`, elements)
      const response = await axios.get(
        `${BASE_URL}/channels?channel1=${selectedChannels.value.channel1}&channel2=${selectedChannels.value.channel2}`,
      )

      channels.value = response.data
      message.destroyAll()
    } catch (e) {
      message.error(
        e?.response?.data?.message ||
          'Что-то пошло не так при попытке отправить данные. Повторите попытку',
      )
    } finally {
      loadingBar.finish()
    }
  }

  watch(Object.values(toRefs(elements)), sendState)

  watch(
    Object.values(toRefs(selectedChannels.value)),
    async () => {
      console.log('reloading channels')

      loadingBar.start()

      try {
        const response = await axios.get(
          `${BASE_URL}/channels?channel1=${selectedChannels.value.channel1}&channel2=${selectedChannels.value.channel2}`,
        )

        channels.value = response.data
      } catch (e) {
        message.error(
          e?.response?.data?.message ||
            'Что-то пошло не так при попытке отправить данные. Повторите попытку',
        )
      } finally {
        loadingBar.finish()
      }
    },
    {
      immediate: true,
    },
  )

  return { ...toRefs(elements), channels, selectedChannels, sendState }
})
