import { Circuit } from '@energia/common'
import { getAtCommand } from '../domain/at'

export const setState =
  ({
    sendAtCommand,
    state,
    getAdcData,
  }: {
    sendAtCommand: (_: string) => Promise<string>
    getAdcData: (
      channel1: string,
      channel2: string,
    ) => Promise<{
      channel1: number[]
      channel2: number[]
    }>
    state: any
  }) =>
  async (stateNext: Record<keyof Circuit, any>) => {
    const commands = getAtCommand(stateNext)

    // // await Promise.all(commands.map(sendAtCommand))
    // await sendAtCommand(commands[0])
    // await sendAtCommand(commands[1])

    // state.circuit = stateNext

    for await (const command of commands) {
      await sendAtCommand(command)
    }

    const { acDc } = stateNext

    if (acDc._tag === 'ac') {
      await sendAtCommand(`at+ddsf=${acDc.value.frequency}\r\n`)
      await sendAtCommand(`at+ddsa=${6016 * acDc.value.voltage}\r\n`)
      await sendAtCommand(`at+dds=1\r\n`)
    } else {
      await sendAtCommand(`at+dds=0\r\n`)
      await sendAtCommand(`at+dac=${acDc.value.voltage * 3008}\r\n`)
    }

    await sendAtCommand('at+swa?\r\n')
    await sendAtCommand('at+muxa?\r\n')

    const result = await getAdcData('v1', 'v2')

    return result
  }
