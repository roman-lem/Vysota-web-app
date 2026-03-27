<template>
	<button><slot></slot></button>
</template>

<style scoped>
button {
	height: 40px;
	border-radius: 10px;
	border: none;
	background-color: var(--primary-color);
	color: white;
	cursor: pointer;
	font-weight: 400;
	font-size: 18px;
}
</style>
