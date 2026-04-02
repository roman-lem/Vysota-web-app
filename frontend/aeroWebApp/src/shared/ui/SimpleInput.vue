<script setup lang="ts">
const model = defineModel()
</script>

<template>
    <input v-model="model" type="text">
</template>

<style scoped> 
input{
	height: 40px;
	border-radius: 5px;
	border: none;
	padding: 0 10px;
	font-size: 18px;
	font-weight: 400;
    background-color: #ffffff;
}
</style>