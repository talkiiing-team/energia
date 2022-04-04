<template>
  <div
    class="mx-auto max-w-full w-fit overflow-hidden overflow-x-visible px-32 py-28"
  >
    <div
      class="grid grid-cols-[repeat(21,minmax(0,3rem))] w-fit min-w-[calc(21*3rem)]"
    >
      <Node />
      <Node hasRight hasBottom />
      <Node hasLeft hasRight />
      <Node hasLeft hasRight />
      <Node
        hasLeft
        hasRight
        hasBottom
        v-bind.props="tpv3Binding.bind"
        labelPlacement="top"
      />
      <Node hasLeft hasRight />
      <Node hasLeft hasRight />
      <Node hasLeft hasRight hasBottom />
      <Node hasLeft hasRight />
      <Node hasLeft hasRight />
      <Node hasLeft hasRight hasBottom />
      <Node hasLeft hasRight />
      <Node hasLeft hasRight />
      <Node
        v-bind.props="sw5Binding.bind"
        orientation="horizontal"
        labelPlacement="top"
      ></Node>
      <Node hasLeft hasRight />
      <Node
        hasLeft
        hasRight
        hasBottom
        v-bind.props="tpv4Binding.bind"
        labelPlacement="top"
      />
      <Node hasLeft hasRight />
      <Node hasLeft hasRight />
      <Node
        v-bind.props="mux4Binding.bind"
        orientation="horizontal"
        labelPlacement="top"
      />
      <Node hasLeft hasRight />
      <Node
        hasLeft
        hasBottom
        v-bind.props="tpv5Binding.bind"
        labelPlacement="top"
      />
      <!---->
      <Node hasRight hasBottom />
      <Node hasTop hasLeft hasBottom />
      <Node />
      <Node />
      <Node hasTop hasBottom />
      <Node />
      <Node />
      <Node v-bind.props="sw4ABinding.bind" />
      <Node />
      <Node />
      <Node v-bind.props="sw7ABinding.bind" labelPlacement="right" />
      <Node />
      <Node />
      <Node />
      <Node />
      <Node v-bind.props="sw7BBinding.bind" />
      <Node />
      <Node />
      <Node />
      <Node />
      <Node v-bind.props="mux5Binding.bind" />
      <!---->
      <Node v-bind.props="sw1Binding.bind" />
      <Node v-bind.props="sw8Binding.bind" labelPlacement="right" />
      <Node />
      <Node />
      <Node v-bind.props="sw4BBinding.bind" labelPlacement="right" />
      <Node />
      <Node />
      <Node hasTop hasBottom />
      <Node />
      <Node />
      <Node
        hasTop
        hasBottom
        v-bind.props="tpv6Binding.bind"
        labelPlacement="right"
        orientation="horizontal"
      />
      <Node />
      <Node />
      <Node />
      <Node />
      <Node
        hasTop
        hasBottom
        v-bind.props="tpv8Binding.bind"
        orientation="horizontal"
        labelPlacement="right"
      />
      <Node />
      <Node />
      <Node />
      <Node />
      <Node v-bind.props="a4Binding.bind" />
      <!---->
      <Node hasTop hasRight />
      <Node hasTop hasLeft hasBottom />
      <Node />
      <Node />
      <Node hasTop hasLeft hasRight />
      <Node />
      <Node
        :hasRight="sw9SupplBinding.displaySupplNode"
        :hasBottom="sw9SupplBinding.displaySupplNode"
      />
      <Node hasTop hasBottom :hasLeft="sw9SupplBinding.displaySupplNode" />
      <Node />
      <Node />
      <Node v-bind.props="sw2Binding.bind" labelPlacement="right" />
      <Node />
      <Node />
      <Node />
      <Node />
      <Node v-bind.props="sw3Binding.bind" />
      <Node />
      <Node />
      <Node />
      <Node />
      <Node hasTop hasLeft hasRight />
      <!---->
      <Node />
      <Node
        v-bind.props="tpv2Binding.bind"
        orientation="horizontal"
        hasTop
        hasBottom
        labelPlacement="right"
      />
      <Node />
      <Node />
      <Node />
      <Node />
      <Node v-bind.props="sw9SupplBinding.bind" />
      <Node v-bind.props="sw9Binding.bind" labelPlacement="right" />
      <Node />
      <Node />
      <Node
        hasTop
        hasBottom
        v-bind.props="tpv7Binding.bind"
        labelPlacement="right"
        orientation="horizontal"
      />
      <Node />
      <Node />
      <Node />
      <Node />
      <Node
        hasTop
        hasBottom
        v-bind.props="tpv9Binding.bind"
        orientation="horizontal"
        labelPlacement="right"
      />
      <Node />
      <Node />
      <Node />
      <Node />
      <Node />
      <!---->
      <Node />
      <Node v-bind.props="mux1Binding.bind" />
      <Node />
      <Node />
      <Node />
      <Node />
      <Node
        :hasTop="sw9SupplBinding.displaySupplNode"
        :hasRight="sw9SupplBinding.displaySupplNode"
      />
      <Node hasTop hasBottom :hasLeft="sw9SupplBinding.displaySupplNode" />
      <Node />
      <Node />
      <Node v-bind.props="mux2Binding.bind" labelPlacement="right" />
      <Node />
      <Node />
      <Node />
      <Node />
      <Node v-bind.props="mux3Binding.bind" />
      <Node />
      <Node />
      <Node />
      <Node />
      <Node />
      <!---->
      <Node />
      <Node
        v-bind.props="tpv1Binding.bind"
        orientation="horizontal"
        hasTop
        hasBottom
        labelPlacement="right"
      />
      <Node />
      <Node />
      <Node />
      <Node />
      <Node
        :hasRight="sw6SupplBinding.displaySupplNode"
        :hasBottom="sw6SupplBinding.displaySupplNode"
      />
      <Node hasTop hasBottom :hasLeft="sw6SupplBinding.displaySupplNode" />
      <Node />
      <Node />
      <Node v-bind.props="a2Binding.bind" labelPlacement="right" />
      <Node />
      <Node />
      <Node />
      <Node />
      <Node v-bind.props="a3Binding.bind" />
      <Node />
      <Node />
      <Node />
      <Node />
      <Node></Node>
      <!---->
      <Node />
      <Node v-bind.props="a1Binding.bind" labelPlacement="right" />
      <Node />
      <Node />
      <Node></Node>
      <Node />
      <Node v-bind.props="sw6SupplBinding.bind" />
      <Node v-bind.props="sw6Binding.bind" labelPlacement="right" />
      <Node />
      <Node />
      <Node hasTop hasLeft hasRight />
      <Node />
      <Node />
      <Node />
      <Node />
      <Node hasTop hasLeft hasRight />
      <Node />
      <Node />
      <Node />
      <Node />
      <Node></Node>
      <!---->
      <Node />
      <Node :type="acDc._tag">
        <template #form>
          <GeneratorForm />
        </template>
      </Node>
      <Node />
      <Node />
      <Node></Node>
      <Node />
      <Node
        :hasTop="sw6SupplBinding.displaySupplNode"
        :hasRight="sw6SupplBinding.displaySupplNode"
      />
      <Node hasTop hasBottom :hasLeft="sw6SupplBinding.displaySupplNode" />
      <Node />
      <Node />
      <Node></Node>
      <Node />
      <Node />
      <Node />
      <Node />
      <Node></Node>
      <Node />
      <Node />
      <Node />
      <Node />
      <Node></Node>
      <!---->
      <!---->
      <Node />
      <Node hasTop hasRight hasLeft />
      <Node />
      <Node />
      <Node></Node>
      <Node />
      <Node />
      <Node hasLeft hasTop hasRight />
      <Node />
      <Node />
      <Node></Node>
      <Node />
      <Node />
      <Node />
      <Node />
      <Node></Node>
      <Node />
      <Node />
      <Node />
      <Node />
      <Node></Node>
      <!---->
    </div>
  </div>
</template>

<script setup lang="ts">
  import Node from '@/ui/circuit/Node.vue'
  import { useNode, useSupplNode } from '../hooks/useNode'
  import { circuitStore } from '../stores/circuit.store'
  import GeneratorForm from './GeneratorForm.vue'
  import { toRefs } from 'vue'
  import {
    sw1 as sw1Options,
    sw2 as sw2Options,
    sw3 as sw3Options,
    sw4A as sw4AOptions,
    sw4B as sw4BOptions,
    sw5 as sw5Options,
    sw6 as sw6Options,
    sw7A as sw7AOptions,
    sw7B as sw7BOptions,
    sw8 as sw8Options,
    sw9 as sw9Options,
    tpv1 as tpv1Options,
    tpv2 as tpv2Options,
    tpv3 as tpv3Options,
    tpv4 as tpv4Options,
    tpv5 as tpv5Options,
    tpv6 as tpv6Options,
    tpv7 as tpv7Options,
    tpv8 as tpv8Options,
    tpv9 as tpv9Options,
    mux1 as mux1Options,
    mux2 as mux2Options,
    mux3 as mux3Options,
    mux4 as mux4Options,
    mux5 as mux5Options,
    a1 as a1Options,
    a2 as a2Options,
    a3 as a3Options,
    a4 as a4Options,
  } from '@energia/common'

  const store = circuitStore()

  const {
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
    mux1,
    mux2,
    mux3,
    mux4,
    mux5,
    a1,
    a2,
    a3,
    a4,
    acDc,
  } = toRefs(store)

  const sw1Binding = useNode('sw1', sw1, sw1Options)
  const sw2Binding = useNode('sw2', sw2, sw2Options)
  const sw3Binding = useNode('sw3', sw3, sw3Options)
  const sw4ABinding = useNode('sw4A', sw4A, sw4AOptions)
  const sw4BBinding = useNode('sw4B', sw4B, sw4BOptions)
  const sw5Binding = useNode('sw5', sw5, sw5Options)
  const sw6Binding = useNode('sw6', sw6, sw6Options)
  const sw6SupplBinding = useSupplNode('sw6Suppl', sw6Suppl)
  const sw7ABinding = useNode('sw7A', sw7A, sw7AOptions)
  const sw7BBinding = useNode('sw7B', sw7B, sw7BOptions)
  const sw8Binding = useNode('sw8', sw8, sw8Options)
  const sw9Binding = useNode('sw9', sw9, sw9Options)
  const sw9SupplBinding = useSupplNode('sw9Suppl', sw9Suppl)
  const mux1Binding = useNode('mux1', mux1, mux1Options)
  const mux2Binding = useNode('mux2', mux2, mux2Options)
  const mux3Binding = useNode('mux3', mux3, mux3Options)
  const mux4Binding = useNode('mux4', mux4, mux4Options)
  const mux5Binding = useNode('mux5', mux5, mux5Options)
  const tpv1Binding = useNode('tpv1', tpv1, tpv1Options)
  const tpv2Binding = useNode('tpv2', tpv2, tpv2Options)
  const tpv3Binding = useNode('tpv3', tpv3, tpv3Options)
  const tpv4Binding = useNode('tpv4', tpv4, tpv4Options)
  const tpv5Binding = useNode('tpv5', tpv5, tpv5Options)
  const tpv6Binding = useNode('tpv6', tpv6, tpv6Options)
  const tpv7Binding = useNode('tpv7', tpv7, tpv7Options)
  const tpv8Binding = useNode('tpv8', tpv8, tpv8Options)
  const tpv9Binding = useNode('tpv9', tpv9, tpv9Options)
  const a1Binding = useNode('a1', a1, a1Options)
  const a2Binding = useNode('a2', a2, a2Options)
  const a3Binding = useNode('a3', a3, a3Options)
  const a4Binding = useNode('a4', a4, a4Options)
</script>
