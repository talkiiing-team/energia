import { Channels } from '@energia/common'
import { GetChannelsDeps } from './deps'

const getAverage = (arr: number[]) =>
  arr.reduce((acc, val) => acc + val) / arr.length

const getAmplitude = (arr: number[]) =>
  [...arr]
    .map(Math.abs)
    .sort((a, b) => b - a)
    .slice(0, 5)
    .reduce((a, b) => a + b) / 5

export const getChannels =
  ({ atService, state }: GetChannelsDeps) =>
  async (channel1: string, channel2: string): Promise<Channels> => {
    console.log(state)
    const map = {
      tpv1: 'v1',
      tpv2: 'v2',
      tpv3: 'v3',
      tpv4: 'v4',
      tpv5: 'v5',
      tpv6: 'v6',
      tpv7: 'v7',
      tpv8: 'v8',
      tpv9: 'v9',
    }

    const result = await atService.getAdcData(map[channel1], map[channel2])

    if (state.circuit.acDc._tag === 'dc') {
      return {
        channel1: {
          values: result.channel1,
          average: getAverage(result.channel1),
          min: -5,
          max: 5,
        },
        channel2: {
          values: result.channel2,
          average: getAverage(result.channel2),
          min: -5,
          max: 5,
        },
      }
    }

    return {
      channel1: {
        values: result.channel1,
        average: getAmplitude(result.channel1) * Math.SQRT1_2,
        min: 0,
        max: 10,
      },
      channel2: {
        values: result.channel2,
        average: getAmplitude(result.channel2) * Math.SQRT1_2,
        min: 0,
        max: 10,
      },
    }
  }
