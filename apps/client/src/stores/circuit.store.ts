import { defineStore } from 'pinia'
import { reactive, toRefs, watch } from 'vue'
import {
  a1,
  a2,
  a3,
  a4,
  Circuit,
  mux1,
  mux2,
  mux3,
  mux4,
  mux5,
  sw1,
  sw2,
  sw3,
  sw4A,
  sw4B,
  sw5,
  sw6,
  sw6Suppl,
  sw7A,
  sw7B,
  sw8,
  sw9,
  sw9Suppl,
  tpv1,
  tpv2,
  tpv3,
  tpv4,
  tpv5,
  tpv6,
  tpv7,
  tpv8,
  tpv9,
} from '@energia/common'

export const circuitStore = defineStore('circuit', () => {
  const elements = reactive<Circuit>({
    sw1: sw1[0],
    sw2: sw2[0],
    sw3: sw3[0],
    sw4A: sw4A[0],
    sw4B: sw4B[0],
    sw5: sw5[0],
    sw6: sw6[0],
    sw6Suppl: sw6Suppl[0],
    sw7A: sw7A[0],
    sw7B: sw7B[0],
    sw8: sw8[0],
    sw9: sw9[0],
    sw9Suppl: sw9Suppl[0],
    mux1: mux1[0],
    mux2: mux2[0],
    mux3: mux3[0],
    mux4: mux4[0],
    mux5: mux5[0],
    tpv1: tpv1[0],
    tpv2: tpv2[0],
    tpv3: tpv3[0],
    tpv4: tpv4[0],
    tpv5: tpv5[0],
    tpv6: tpv6[0],
    tpv7: tpv7[0],
    tpv8: tpv8[0],
    tpv9: tpv9[0],
    a1: a1[0],
    a2: a2[0],
    a3: a3[0],
    a4: a4[0],
  })

  type ElementKey = keyof typeof elements

  const setElement = <Key extends ElementKey>(
    el: Key,
    val: typeof elements[Key],
  ) => {
    elements[el] = val
  }

  return { ...toRefs(elements), setElement }
})
