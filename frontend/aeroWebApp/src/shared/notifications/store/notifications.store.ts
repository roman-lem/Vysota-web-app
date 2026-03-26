import { defineStore } from "pinia";
import { ref } from "vue";
import type { Notification } from "./notifications.types";

export const useNoteStore = defineStore("notifications", () => {
	const notifications = ref<Map<string, Notification>>(new Map());
	const queue = ref<string[]>([]);
	const dedupeMap = ref<Map<string, number>>(new Map());

	function deleteNote(id: string) {
		notifications.value.delete(id);
		if (queue.value.indexOf(id) !== -1) {
			queue.value.splice(queue.value.indexOf(id), 1);
		}
	}

	function createNote(note: Notification) {
		const dedupe = dedupeMap.value.get(note.dedupeKey);
		if (dedupe && Date.now() - dedupe < 3000) return;
		notifications.value.set(note.id, note);
		if (queue.value.length >= 5) {
			const idToDelete = queue.value.shift();
			notifications.value.delete(idToDelete!);
		}
		queue.value.push(note.id);
		dedupeMap.value.set(note.dedupeKey, Date.now());
		if (!note.persistent) {
			setTimeout(() => {
				deleteNote(note.id);
			}, note.duration);
		}
	}

	function clear() {
		notifications.value.clear();
		queue.value = [];
	}

	return {
		notifications,
		deleteNote,
		createNote,
		clear,
		queue,
	};
});
