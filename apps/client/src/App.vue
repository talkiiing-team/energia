<template>
  <div class="w-full container mx-auto pb-32">
    <Header /><Circuit /><Dashboard />
  </div>
</template>
<script setup lang="ts">
  import Header from '@/ui/common/Header.vue'
  import Circuit from '@/containers/Circuit.vue'
  import Dashboard from '@/containers/Dashboard.vue'
</script>
