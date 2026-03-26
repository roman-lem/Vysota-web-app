import { ref } from "vue";
import { useRouter } from "vue-router";
import { authorize, registration } from "../api/auth.api";
import { type Credentials } from "../api/auth.api";
import type { CreatingUser, User } from "@/entities/user/model/user.types";
import { errorHandler } from "@/shared/notifications/providers/errorHandler";

export function useAuth() {
	const loading = ref<boolean>(false);
    const router = useRouter()
	

	async function login(credentials: Credentials){
		try {
			loading.value = true;
				await authorize(credentials);
			router.push("/");
		} catch (e: any) {
			errorHandler(e)
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
        login,
        register
    }
}