<template>
  <header
    class="fixed flex flex-row justify-between z-50 top-0 left-0 right-0 select-none text-2xl uppercase text-white font-thin rounded-b-xl bg-black bg-opacity-80 backdrop-blur-sm shadow-md px-10 py-3 tracking-widest"
  >
    <h1>Energia</h1>
    <NButton  type="success" secondary @click="store.token = ''">Выход</NButton>
  </header>
</template>

<script lang="ts" setup>
  import {NButton} from 'naive-ui'

  import { authStore } from '../../stores/auth.store';

  const store = authStore()
</script>
