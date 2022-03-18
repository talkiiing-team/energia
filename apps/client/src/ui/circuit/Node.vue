<template>
  <component
    :is="selectable ? NDropdown : 'div'"
    trigger="click"
    :options="selectable ? optionsMapped : []"
    @select="onSelect"
    :selected="index"
  >
    <div
      class="min-w-12 min-h-12 w-12 h-12 relative flex-shrink-0 select-none"
      :class="
        selectable &&
        'cursor-pointer outline-dashed outline-1 outline-offset-[-2px] rounded-lg outline-zinc-400 hover:outline-blue-500 hover:text-blue-700 hover:bg-blue-100 group-focus:bg-blue-500 transition-colors duration-200'
      "
    >
      <div
        v-if="hasTop || (orientation === 'vertical' && type === 'jumper')"
        class="left-[calc(50%-1px)]"
        :class="styles.stick"
      ></div>
      <div
        v-if="hasBottom || (orientation === 'vertical' && type === 'jumper')"
        class="top-1/2 left-[calc(50%-1px)]"
        :class="styles.stick"
      ></div>
      <div
        v-if="hasLeft || (orientation === 'horizontal' && type === 'jumper')"
        class="rotate-90 left-[calc(25%-1px)] top-1/4"
        :class="styles.stick"
      ></div>
      <div
        v-if="hasRight || (orientation === 'horizontal' && type === 'jumper')"
        class="rotate-90 left-[calc(75%-1px)] top-1/4"
        :class="styles.stick"
      ></div>
      <ElementComponent
        v-if="type && type !== 'jumper'"
        :type="type"
        :orientation="orientation"
      />
      <div
        class="absolute text-zinc-600 whitespace-nowrap"
        :class="{
          'top-1/2 -left-2 -translate-y-1/2 -translate-x-full text-right':
            labelPlacement === 'left',
          'top-1/2 -right-2 translate-x-full -translate-y-1/2 text-left':
            labelPlacement === 'right',
          '-top-2 left-1/2 -translate-x-1/2 -translate-y-full text-center':
            labelPlacement === 'top',
        }"
      >
        <h4 v-if="name" class="text-blue-600 font-bold">
          {{ name }}
        </h4>
        <div v-if="label">
          {{ label }}
        </div>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
  import {
    ELEMENT_TYPE_LOCALE,
    capitalizeFirst,
    createTagged,
  } from '@energia/common'
  import type { Element, ElementType } from '@energia/common'
  import ElementComponent from '@/ui/circuit/Element.vue'
  import { NDropdown } from 'naive-ui'
  import { getLabel } from '../../hooks/useNode'
  import { HTMLAttributes } from 'vue'

  const {
    selectable,
    hasTop,
    hasBottom,
    hasLeft,
    hasRight,
    type,
    orientation = 'vertical',
    options,
    label,
    index,
    labelPlacement = 'left',
  } = defineProps<{
    hasTop?: boolean
    hasBottom?: boolean
    hasLeft?: boolean
    hasRight?: boolean
    selectable?: boolean
    type?: ElementType
    orientation?: 'vertical' | 'horizontal'
    options?: Element[]
    label?: string
    name?: string
    index?: number
    labelPlacement?: 'right' | 'top' | 'left' | 'bottom'
  }>()

  const emit = defineEmits<{
    (event: 'select', value: number): void
  }>()

  const onSelect = (val: number) => {
    emit('select', val)
  }

  const styles = {
    stick: 'absolute w-[2px] h-6 bg-black',
    selected: 'bg-blue-200 !select-none',
  }

  const selectedProps = {
    class: styles.selected,
  }

  type Option = {
    label: string
    key: number
    children?: Option[]
    disabled?: boolean
    props: HTMLAttributes
  }

  const optionsMapped = $computed(() => {
    const opts = options?.map(({ _tag: tag, value: element }, i) => {
      const name = ELEMENT_TYPE_LOCALE[tag]

      return {
        label: capitalizeFirst(name),
        key: i,
        tag,
        element,
      }
    })

    const groupedMap = new Map<ElementType, Option[]>()

    opts?.forEach(({ label, key, element, tag }) => {
      const newLabel = getLabel(createTagged(tag, element) as Element)

      if (!groupedMap.has(tag)) {
        return groupedMap.set(tag, [
          {
            label: newLabel ?? '',
            key,
            props: key === index ? selectedProps : {},
          },
        ])
      }

      return groupedMap.get(tag)?.push({
        label: newLabel ?? '',
        key,
        props: key === index ? selectedProps : {},
      })
    })

    return [...groupedMap.entries()].map(([key, val]) =>
      val.length > 1
        ? {
            label: capitalizeFirst(ELEMENT_TYPE_LOCALE[key]),
            key,
            children: val,
            props: val.some(({ key }) => key === index) ? selectedProps : {},
          }
        : {
            label: capitalizeFirst(ELEMENT_TYPE_LOCALE[key]),
            key: val[0].key,
            props: val[0].key === index ? selectedProps : {},
          },
    )
  })
</script>
