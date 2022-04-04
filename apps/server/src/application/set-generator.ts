export const setGenerator =
  ({ sendAtCommand }: { sendAtCommand: (_: string) => Promise<string> }) =>
  async (generator: string) => {
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

    const result = await getAdcData(map[channel1], map[channel2])

    return result
  }
