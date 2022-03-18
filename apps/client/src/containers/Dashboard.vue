<template>
  <div class="w-full mx-auto max-w-2xl flex flex-col space-y-5">
    <Speedometer :value="3" :min="0" :max="10" unit="В" />
    <Speedometer status="warning" :value="3" :min="0" :max="10" unit="В" />
  </div>
</template>

<script setup lang="ts">
  import Speedometer from '../ui/common/Speedometer.vue'
</script>
