import {
  asFunction,
  asValue,
  createContainer,
  InjectionMode,
  Lifetime,
} from 'awilix'
import { INITIAL_STATE } from '@energia/common'
import { SerialPort } from 'serialport'
import { getChannels, setState } from './application'
import { getAdcData, sendAtCommand } from './infrastructure'

export const container = createContainer<{
  port: SerialPort
  state: any

  setState: ReturnType<typeof setState>
  getChannels: ReturnType<typeof getChannels>

  sendAtCommand: ReturnType<typeof sendAtCommand>
  getAdcData: ReturnType<typeof getAdcData>
}>({
  injectionMode: InjectionMode.PROXY,
}).register({
  port: asValue(
    new SerialPort({
      path: '/dev/ttyUSB0',
      baudRate: 921600,
      autoOpen: false,
    }),
  ),
  state: asValue({
    circuit: {
      ...INITIAL_STATE,
    },
  }),
  sendAtCommand: asFunction(sendAtCommand),
  setState: asFunction(setState),
  getChannels: asFunction(getChannels),
  getAdcData: asFunction(getAdcData),
})
