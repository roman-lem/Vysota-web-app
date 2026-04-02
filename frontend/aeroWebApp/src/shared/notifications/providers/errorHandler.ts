import { isAxiosError } from "axios";
import { useNoteStore } from "../store/notifications.store";
import { v4 as uuidv4 } from "uuid";

export function errorHandler(error: unknown) {
	const store = useNoteStore();
	if (isAxiosError(error)) {
		if (error.response?.status === 401) {
			store.createNote({
				id: uuidv4(),
				type: "error",
				message: "Ошибка авторизации",
				createdAt: Date.now(),
				persistent: false,
				source: "api",
				duration: 8000,
				dedupeKey: "auth_error",
			});
		} else if (error.response?.status === 400) {
			let msg = error.response.data.error.description as string;
			msg = error.response?.data?.error?.description ?? msg;
			if (msg.includes("unique")) {
				msg = "Пользователь с таким никнеймом уже существует";
			}
			store.createNote({
				id: uuidv4(),
				type: "error",
				message: msg ?? "Проверьте введенные данные",
				createdAt: Date.now(),
				persistent: false,
				source: "api",
				duration: 8000,
				dedupeKey: "bad_request",
			});
		} else if (error.response?.status === 404) {
			store.createNote({
				id: uuidv4(),
				type: "error",
				message: "Данные не найдены",
				createdAt: Date.now(),
				persistent: false,
				source: "api",
				duration: 8000,
				dedupeKey: "not_found",
			});
		} else if (error.response?.status === 500) {
			store.createNote({
				id: uuidv4(),
				type: "error",
				message: "Внутренняя ошибка сервера",
				createdAt: Date.now(),
				persistent: false,
				source: "api",
				duration: 8000,
				dedupeKey: "internal_server_error",
			});
		} else {
			store.createNote({
				id: uuidv4(),
				type: "error",
				message: "Ошибка сети",
				createdAt: Date.now(),
				persistent: false,
				source: "api",
				duration: 8000,
				dedupeKey: "network_error",
			});
		}

		return;
	} else {
		store.createNote({
			id: uuidv4(),
			type: "error",
			message: `Неизвестная ошибка: ${error}`,
			createdAt: Date.now(),
			persistent: false,
			source: "api",
			duration: 8000,
			dedupeKey: "uncaught",
		});
	}
}
