import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User } from "./user.types";

export const useUserStore = defineStore("user", () => {
	const user = ref<User | null>(null);
	const isAdminAuth = ref<boolean>(false);

	const access_token = ref<string>("");
	const refresh_token = ref<string>("");

	function hasAnyRoles(...roles: string[]): boolean {
		if (!user.value?.roles) return false;
		const userRoles = user.value.roles;
		return roles.some((role) => userRoles.includes(role));
	}

	const isAdmin = computed<boolean>(() => {
		return hasAnyRoles("admin", "owner");
	});

	const isAuth = computed<boolean>(() => {
		return access_token.value != "";
	});
	

	return {
		user,
		isAdmin,
		access_token,
		refresh_token,
		isAuth,
		isAdminAuth,
		hasAnyRoles,
	};
});
