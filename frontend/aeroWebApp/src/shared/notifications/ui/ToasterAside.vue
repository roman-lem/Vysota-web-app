<script setup lang="ts">
import ToastNote from "./Toast.vue";
import { useNoteStore } from "../store/notifications.store";
import { TransitionGroup } from "vue";

const store = useNoteStore();
</script>

<template>
	<div class="toast-wrapper">
		<transition-group name="toast">
			<toast-note
				v-for="note in store.queue"
				:class="store.notifications.get(note)?.type"
				:key="note"
                :note-id="note"
			>
				{{ store.notifications.get(note)?.message }}</toast-note
			>
		</transition-group>
	</div>
</template>

<style scoped>
.toast-move,
.toast-enter-active,
.toast-leave-active {
	transition: all 0.5s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.toast-leave-active {
  position: absolute;
}

.toast-wrapper {
	position: fixed;
	top: 50px;
	right: 20px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 400px;
}
</style>
