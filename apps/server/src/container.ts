import {
  asClass,
  asFunction,
  asValue,
  createContainer,
  InjectionMode,
  Lifetime,
} from 'awilix'
import { INITIAL_STATE } from '@energia/common'
import { SerialPort } from 'serialport'
import { getChannels, setState } from './application'
import { AtService } from './infrastructure'

const {SERIAL_PORT = '/dev/ttyUSB0'} = process.env

export const container = createContainer<{
  port: SerialPort
  state: any

  setState: ReturnType<typeof setState>
  getChannels: ReturnType<typeof getChannels>

  atService: AtService
}>({
  injectionMode: InjectionMode.PROXY,
}).register({
  port: asValue(
    new SerialPort({
      path: SERIAL_PORT,
      baudRate: 921600,
      autoOpen: false,
    }),
  ),
  state: asValue({
    circuit: {
      ...INITIAL_STATE,
    },
  }),

  setState: asFunction(setState),
  getChannels: asFunction(getChannels),

  atService: asClass(AtService),
})
