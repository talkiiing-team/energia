import { asValue, createContainer, InjectionMode } from 'awilix'
import { SerialPort } from 'serialport'

export const container = createContainer<{
  port: SerialPort
}>({
  injectionMode: InjectionMode.PROXY,
}).register({
  port: asValue(
    new SerialPort({
      path: '/dev/ttyUSB0',
      baudRate: 921600,
    }),
  ),
})
