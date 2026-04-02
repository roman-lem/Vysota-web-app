<script setup lang="ts">
const model = defineModel()
</script>

<template>
	<select v-model="model" name="level" id="level">
		<option value="" selected>Любой уровень</option>
		<option value="without">Без разряда</option>
		<option value="3jun">3 юношеский</option>
		<option value="2jun">2 юношеский</option>
		<option value="1jun">1 юношеский</option>
		<option value="3sport">3 спортивный</option>
		<option value="2sport">2 спортивный</option>
		<option value="1sport">1 спортивный</option>
		<option value="CMS">КМС</option>
	</select>
</template>

<style scoped>
select {
	opacity: 0.8;
	border: none;
	width: 100%;
	height: 40px;
	border-radius: 5px;
	padding: 0 10px;
	box-sizing: border-box;
}
</style>
