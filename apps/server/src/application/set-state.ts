import { Circuit } from '@energia/common'
import { getAtCommand } from '../domain/at'
import { SetStateDeps } from './deps'

export const setState =
  ({ atService, state }: SetStateDeps) =>
  async (stateNext: Record<keyof Circuit, any>) => {
    const commands = getAtCommand(stateNext)

    for await (const command of commands) {
      await atService.sendAtCommand(command)
    }

    const { acDc } = stateNext

    if (acDc._tag === 'ac') {
      await atService.sendAtCommand(`at+ddsf=${acDc.value.frequency}`)
      await atService.sendAtCommand(
        `at+ddsa=${Math.floor(6016 * acDc.value.voltage)}`,
      )
      await atService.sendAtCommand(`at+dds=1`)
    } else {
      await atService.sendAtCommand(`at+dds=0`)
      await atService.sendAtCommand(
        `at+dac=${Math.floor(acDc.value.voltage * 3008)}`,
      )
    }

    await atService.sendAtCommand('at+swa?')
    await atService.sendAtCommand('at+muxa?')

    state.circuit = stateNext
  }
