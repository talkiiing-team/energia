import { SerialPort } from 'serialport'

const sendAtCommand =
  ({ port }: { port: SerialPort }) =>
  (at: string) =>
    new Promise((res, rej) => {
      const dataListener = data => {
        res(data)
        port.removeListener('data', dataListener)
      }

      const errorListener = err => {
        rej(err)
      }

      port.on('data', errorListener)
      port.write(at, rej)
    })
