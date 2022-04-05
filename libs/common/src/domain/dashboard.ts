export type ChannelInfo = {
  average: number
  values: number[]
  min: number
  max: number
  unit: string
}

export type Channels = {
  channel1: ChannelInfo
  channel2: ChannelInfo
}

export const tpv = [
  'tpv1',
  'tpv2',
  'tpv3',
  'tpv4',
  'tpv5',
  'tpv6',
  'tpv7',
  'tpv8',
  'tpv9',
] as const

export const amp = ['a1', 'a2', 'a3', 'a4'] as const

export type TpvUnion = typeof tpv[number]

export type AmpUnion = typeof amp[number]

export type ChannelUnion = TpvUnion | AmpUnion

export const isTpv = (channel: ChannelUnion): channel is TpvUnion =>
  tpv.includes(channel as TpvUnion)
export const isAmp = (channel: ChannelUnion): channel is AmpUnion =>
  amp.includes(channel as AmpUnion)
