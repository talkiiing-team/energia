<template>
  <NLoadingBarProvider>
    <NMessageProvider>
      <div class="w-full mx-auto pt-16 pb-32">
        <Header />
        <!-- <template v-if="true"> -->
        <!-- <LoginForm /> -->
        <!-- </template> -->

        <!-- <template v-else> -->
        <Circuit />
        <Dashboard />
        <!-- </template> -->
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
</script>
