import { Channels, INITIAL_STATE } from '@energia/common'

export type State = {
  circuit: typeof INITIAL_STATE
}

export type ChannelsData = {
  channel1: number[]
  channel2: number[]
}

export type IAtService = {
  sendAtCommand(at: string): Promise<string>
  getAdcData(channel1: string, channel2: string): Promise<ChannelsData>
}

export type SetStateDeps = {
  atService: IAtService
  state: State
}

export type GetChannelsDeps = {
  atService: IAtService
  state: State
}
