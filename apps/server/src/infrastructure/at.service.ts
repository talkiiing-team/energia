import { SerialPort } from 'serialport'
import { ChannelsData, IAtService } from '../application/deps'

export type AtServiceDeps = { port: SerialPort }

export class AtService implements IAtService {
  private _port: SerialPort

  private _lastPromise: Promise<any> = Promise.resolve()

  constructor({ port }: AtServiceDeps) {
    this._port = port
  }

  async getAdcData(channel1: string, channel2: string) {
    await this.sendAtCommand('at+adcs=256')
    await this.sendAtCommand('at+adcd=19')

    await this.sendAtCommand(`at+adc=1, ${channel1}`)
    await this.sendAtCommand(`at+adc=2, ${channel2}`)

    return new Promise<ChannelsData>((res, rej) => {
      let data: Buffer = Buffer.from([])

      const dataListener = (_data: Buffer) => {
        data = Buffer.concat([data, _data])
      }

      const errorListener = (err: Error | null | undefined) => {
        this._port.on('data', dataListener)
        if (err) {
          console.log('Error', err.toString())
          rej(err)
        }
      }

      this._port.write('at+adc\r\n', errorListener)

      setTimeout(() => {
        const adc1: any[] = []
        const adc2: any[] = []

        let result1: any = []
        let result2: any = []

        for (const pair of data.slice(12).entries()) {
          const [i, value] = pair
          if (i % 4 === 0 || i % 4 === 1) {
            result1.push(value)
          } else {
            result2.push(value)
          }
        }

        result1 = Buffer.from(result1)
        result2 = Buffer.from(result2)

        for (let i = 0; i < result1.length; i++) {
          if (!(i % 2)) {
            adc1.push(result1.readInt16LE(i))
          }
        }

        for (let i = 0; i < result2.length; i++) {
          if (!(i % 2)) {
            adc2.push(result2.readInt16LE(i))
          }
        }

        this._port.removeListener('data', dataListener)

        return res({ channel1: mapAdcData(adc1), channel2: mapAdcData(adc2) })
      }, 500)
    })
  }

  sendAtCommand(at: string) {
    const normalizedCommand = `${at}\r\n`

    return this._lastPromise.finally(() => {
      const promise = new Promise<Buffer>((res, rej) => {
        const dataListener = (data: Buffer) => {
          const timeoutId = setTimeout(() => rej(), 5000)

          console.log('Result in sendAtCommand', data.toString())
          if (data.toString().includes('OK')) {
            res(data)
            this._port.removeListener('data', dataListener)
            clearTimeout(timeoutId)
          }
        }

        const errorListener = (err: Error | null | undefined) => {
          this._port.on('data', dataListener)
          if (err) {
            console.log('Error', err.toString())
            rej(err)
          }
        }

        this._port.write(normalizedCommand, errorListener)
      })

      this._lastPromise = promise

      return promise
    })
  }
}

export const sendAtCommand =
  ({ port }: AtServiceDeps) =>
  (at: string) =>
    new Promise<Buffer>((res, rej) => {
      const dataListener = (data: Buffer) => {
        const timeoutId = setTimeout(() => rej(), 5000)

        console.log('Result in sendAtCommand', data.toString())
        if (data.toString().includes('OK')) {
          res(data)
          port.removeListener('data', dataListener)
          clearTimeout(timeoutId)
        }
      }

      const errorListener = (err: Error | null | undefined) => {
        port.on('data', dataListener)
        if (err) {
          console.log('Error', err.toString())
          rej(err)
        }
      }

      port.write(at, errorListener)
    })

type AdcData = {
  channel1: number[]
  channel2: number[]
}

const mapAdcData = (dataArr: number[]): number[] =>
  dataArr.map((item: number) => ((item - 2048) * 10) / 1751)

export const getAdcData =
  ({ port, sendAtCommand }: AtServiceDeps) =>
  async (channel1: string, channel2: string): Promise<AdcData> => {
    await sendAtCommand('at+adcs=256')
    await sendAtCommand('at+adcd=19')

    await sendAtCommand(`at+adc=1, ${channel1}`)
    await sendAtCommand(`at+adc=2, ${channel2}`)

    return new Promise((res, rej) => {
      let data: Buffer = Buffer.from([])
      let reading = false

      const dataListener = (_data: Buffer) => {
        data = Buffer.concat([data, _data])
      }

      const errorListener = (err: Error | null | undefined) => {
        port.on('data', dataListener)
        if (err) {
          console.log('Error', err.toString())
          rej(err)
        }
      }

      port.write('at+adc', errorListener)

      setTimeout(() => {
        const adc1: any[] = []
        const adc2: any[] = []

        let result1: any = []
        let result2: any = []

        for (const pair of data.slice(12).entries()) {
          const [i, value] = pair
          if (i % 4 === 0 || i % 4 === 1) {
            result1.push(value)
          } else {
            result2.push(value)
          }
        }

        result1 = Buffer.from(result1)
        result2 = Buffer.from(result2)

        for (let i = 0; i < result1.length; i++) {
          if (!(i % 2)) {
            adc1.push(result1.readInt16LE(i))
          }
        }

        for (let i = 0; i < result2.length; i++) {
          if (!(i % 2)) {
            adc2.push(result2.readInt16LE(i))
          }
        }

        port.removeListener('data', dataListener)

        return res({ channel1: mapAdcData(adc1), channel2: mapAdcData(adc2) })
      }, 700)
    })
  }
