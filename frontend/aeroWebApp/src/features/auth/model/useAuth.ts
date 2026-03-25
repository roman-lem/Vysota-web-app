import { ref } from "vue";
import { useUserStore } from "@/entities/user/model/user.store";
import { useRouter } from "vue-router";
import { type ProcessError } from "@/shared/types/shared.types";
import { authorize, registration } from "../api/auth.api";
import { type Credentials } from "../api/auth.api";
import type { CreatingUser, User } from "@/entities/user/model/user.types";

export function useAuth() {
	const loading = ref<boolean>(false);
	const store = useUserStore();
    const error = ref<ProcessError | null>(null);
    const router = useRouter()
	

	async function login(credentials: Credentials){
		try {
			loading.value = true;
			await authorize(credentials);
			router.push("/");
		} catch (e: any) {
			error.value = {
				status: e.status,
				message: e.message
			};
		} finally {
			loading.value = false;
		}
	}

    async function register(params: CreatingUser) {
        try {
			loading.value = true;
			return await registration(params);
		} catch (e) {
			throw e
		} finally {
			loading.value = false;
		}
    }

    return {
        loading,
        error,
        login,
        register
    }
}