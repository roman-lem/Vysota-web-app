<script setup lang="ts">
import { useNoteStore } from "../store/notifications.store";

const { noteId } = defineProps<{
	noteId: string;
}>();

function deleteThis() {
	const store = useNoteStore();
	store.deleteNote(noteId);
}
</script>

<template>
	<div class="toast">
		<div class="message">
			<p>
				<slot></slot>
			</p>
		</div>
		<button @click="deleteThis">🞪</button>
	</div>
</template>

<style scoped>
.toast {
	width: 100%;
	min-height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
    padding: 10px 40px 10px 10px;
    color: #888;
    font-family: "Manrope", sans-serif;
    font-size: 16px;
}

button {
	width: 20px;
	height: 20px;
	text-align: center;
	line-height: 20px;
	margin-left: 10px;
	padding: 0;
	background-color: #00000050;
	border: none;
	border-radius: 5px;
	color: #fff;
	position: absolute;
	right: 30px;
}

.error {
	background-color: #ed3939a6;
	color: #ddd
}

.info {
	background-color: #758efa50;
}

.warning {
	background-color: #f5a54570;
}

.success {
	background-color: #6cff5250;
}
</style>
