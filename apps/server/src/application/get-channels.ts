import { Channels, tpv, amp, isTpv, isAmp, ChannelUnion } from '@energia/common'
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
  async (channel1: ChannelUnion, channel2: ChannelUnion): Promise<Channels> => {
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
      a1: 'a1',
      a2: 'a2',
      a3: 'a3',
      a4: 'a4',
    }

    const result = await atService.getAdcData(map[channel1], map[channel2])

    const coefficient = (channel: ChannelUnion) =>
      isTpv(channel) ? 1 : channel === 'a4' ? 3.99392 / 1.06 : 4.67289 / 1.072

    if (state.circuit.acDc._tag === 'dc') {
      return {
        channel1: {
          values: result.channel1,
          average: getAverage(result.channel1) * coefficient(channel1),
          min: isTpv(channel1) ? -5 : channel1 === 'a4' ? -43 : -45,
          max: isTpv(channel1) ? 5 : channel1 === 'a4' ? 43 : 45,
          unit: isTpv(channel1) ? 'В' : 'мА',
        },
        channel2: {
          values: result.channel2,
          average: getAverage(result.channel2) * coefficient(channel2),
          min: isTpv(channel2) ? -5 : channel2 === 'a4' ? -43 : -45,
          max: isTpv(channel2) ? 5 : channel2 === 'a4' ? 43 : 45,
          unit: isTpv(channel2) ? 'В' : 'мА',
        },
      }
    }

    return {
      channel1: {
        values: result.channel1,
        average:
          getAmplitude(result.channel1) * Math.SQRT1_2 * coefficient(channel1),
        min: 0,
        max: isTpv(channel2)
          ? 10
          : Math.floor(
              11.6 * Math.floor(coefficient(channel1)) * Math.SQRT1_2 - 1,
            ),
        unit: isTpv(channel1) ? 'В' : 'мА',
      },
      channel2: {
        values: result.channel2,
        average:
          getAmplitude(result.channel2) * Math.SQRT1_2 * coefficient(channel2),
        min: 0,
        max: isTpv(channel2)
          ? 10
          : Math.floor(
              11.6 * Math.floor(coefficient(channel2)) * Math.SQRT1_2 - 1,
            ),
        unit: isTpv(channel2) ? 'В' : 'мА',
      },
    }
  }
