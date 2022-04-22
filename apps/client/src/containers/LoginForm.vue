<template>
  <form class="mx-auto max-w-2xl container text-center space-y-3 flex flex-col">
    <NH2>Введите пароль</NH2>
    <NInput placeholder="Ваш пароль" v-model:value="token" />
    <NButton type="primary" @click="onLogin">Приступить к выполнению</NButton>
    <NButton type="tertiary">Я администратор</NButton>
  </form>
</template>

<script setup lang="ts">
  import { NH2, NInput, NButton } from 'naive-ui'
  import { authStore } from '../stores/auth.store'

  const { authorize } = authStore()

  const token = $ref('')

  const onLogin = () => {
    authorize(token)
  }
</script>
