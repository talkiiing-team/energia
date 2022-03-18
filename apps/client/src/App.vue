<template>
  <NLoadingBarProvider>
    <NMessageProvider :duration="50000" :max="1">
      <div class="w-full mx-auto pt-16 pb-32">
        <Header />
        <template v-if="!store.isAuthorized">
          <LoginForm />
        </template>

        <template v-else>
          <Circuit />
          <Dashboard />
        </template>
      </div>
    </NMessageProvider>
  </NLoadingBarProvider>
</template>

<script setup lang="ts">
  import { NLoadingBarProvider, NMessageProvider } from 'naive-ui'
  import Header from '@/ui/common/Header.vue'
  import Circuit from '@/containers/Circuit.vue'
  import Dashboard from '@/containers/Dashboard.vue'
  import LoginForm from '@/containers/LoginForm.vue'
  import { authStore } from './stores/auth.store'

  const store = authStore()
</script>
