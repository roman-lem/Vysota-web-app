import { ref } from "vue";
import { useUserStore } from "@/store/userState";
import { useRouter } from "vue-router";

export function useAuth() {
	const loading = ref(false);
	const store = useUserStore();
    const error = ref(null);
    const router = useRouter()

	async function authorize(credentials) {
		try {
			loading.value = true;
			await store.login(credentials);
			router.push("/");
		} catch (e) {
			error.value = e;
		} finally {
			loading.value = false;
		}
	}

    async function register(params) {
        try {
			loading.value = true;
			await store.register(params);
			router.push("/");
		} catch (e) {
			error.value = e;
			throw e
		} finally {
			loading.value = false;
		}
    }

    return {
        loading,
        error,
        authorize,
        register
    }
}