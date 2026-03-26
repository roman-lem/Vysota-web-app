<script setup lang="ts">
import ToasterAside from '@/shared/notifications/ui/ToasterAside.vue';
import { onMounted } from 'vue';
import { initAuth } from '@/features/auth/api/auth.api'
import { errorHandler } from '@/shared/notifications/providers/errorHandler'


onMounted(() => {
  initAuth().catch(errorHandler)
})
</script>

<template>
	<toaster-aside></toaster-aside>
	<RouterView />
</template>

<style scoped>
</style>
