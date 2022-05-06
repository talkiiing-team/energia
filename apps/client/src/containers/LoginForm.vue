<template>
  <form class="mx-auto max-w-2xl container text-center space-y-3 flex flex-col" @submit.prevent="onLogin">
    <NH2>Введите пароль</NH2>
    <NInput placeholder="Ваш пароль" v-model:value="current" />
    <NButton type="primary">Приступить к выполнению</NButton>
  </form>
</template>

<script setup lang="ts">
  import { NH2, NInput, NButton } from 'naive-ui'
  import { authStore } from '../stores/auth.store'
  import { ref } from 'vue'

  const store = authStore()

  const current = ref('')

  const onLogin = () => {
    store.token = current.value
  }
</script>
