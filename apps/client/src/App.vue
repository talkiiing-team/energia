<template>
  <NLoadingBarProvider>
    <div class="w-full mx-auto pb-32"><Header /><Circuit /><Dashboard /></div>
  </NLoadingBarProvider>
</template>

<script setup lang="ts">
  import { NLoadingBarProvider } from 'naive-ui'
  import Header from '@/ui/common/Header.vue'
  import Circuit from '@/containers/Circuit.vue'
  import Dashboard from '@/containers/Dashboard.vue'
</script>
