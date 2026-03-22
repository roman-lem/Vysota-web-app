<script setup>
import { onMounted } from "vue";
import { useUserStore } from "./store/userState";

const store = useUserStore();

</script>

<template>
	<RouterView />
</template>

<style scoped></style>
