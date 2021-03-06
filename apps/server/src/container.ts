import { config } from 'dotenv'
import path from 'path'

config({
  path: path.resolve(
    __dirname,
    import.meta.env.PROD ? '../.env' : '../../../.env',
  ),
})

import {
  asClass,
  asFunction,
  asValue,
  createContainer,
  InjectionMode,
} from 'awilix'
import { INITIAL_STATE } from '@energia/common'
import { SerialPort } from 'serialport'
import { getChannels, setState } from './application'
import { AtService } from './infrastructure'

const { SERIAL_PORT = '/dev/ttyUSB0', PORT = '3030' } = process.env

export const container = createContainer<{
  port: SerialPort
  state: any

  setState: ReturnType<typeof setState>
  getChannels: ReturnType<typeof getChannels>

  atService: AtService

  serverPort: number
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

  serverPort: asValue(parseInt(PORT)),
})
