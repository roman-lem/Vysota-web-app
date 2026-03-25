import { axios } from "@/shared/api/client.api";
import type { User, CreatingUser } from "@/entities/user/model/user.types";
import type { Response } from "@/shared/types/shared.types";
import { useUserStore } from "@/entities/user/model/user.store";
import type { AxiosResponse } from "axios";
import { useRoute, useRouter } from "vue-router";

interface Credentials {
	username: string;
	password: string;
}

async function getMe(): Promise<User> {
	const res: AxiosResponse =  await axios.get("/access");
	return res.data.data
}

async function registration(userData: CreatingUser): Promise<AxiosResponse> {
	try {
		const res = await axios.post("/register", userData);
		return res;
	} catch (e) {
		throw e;
	}
}

function authAsAdmin() {
	const store = useUserStore()
	if (store.hasAnyRoles("admin", "owner")) {
		store.isAdminAuth = true;
	}
}

async function checkAdminAccess(): Promise<Response<object>> {
	return await axios.get("/admin");
}

function logout() {
	const store = useUserStore();
	store.access_token = "";
	store.refresh_token = "";
	store.user = null;
	store.isAdminAuth = false
	localStorage.removeItem("access_token");
	localStorage.removeItem("refresh_token");
}

async function initAuth() {
	const at = localStorage.getItem("access_token");
	const rt = localStorage.getItem("refresh_token");
	if (at && rt) {
		const store = useUserStore();
		store.access_token = at;
		store.refresh_token = rt;
		return getMe()
			.then((response) => {
				store.user = response;
				store.isAdminAuth = false
				console.log("initAuth set:", store.isAdminAuth);
			})
			.catch((e) => {
				logout();
			});
	}
}

async function authorize(credentials: Credentials): Promise<AxiosResponse> {
	const res = await axios.post("/auth", credentials);
	const store = useUserStore();
	try {
		const authRes = await axios.post("/auth", credentials);
		store.access_token = authRes.data.data.access_token;
		store.refresh_token = authRes.data.data.refresh_token;
		if (store.access_token) {
			localStorage.setItem("access_token", store.access_token);
		} else {
			localStorage.removeItem("access_token");
		}
		if (store.refresh_token) {
			localStorage.setItem("refresh_token", store.refresh_token);
		} else {
			localStorage.removeItem("refresh_token");
		}
		store.user = await getMe();
	} catch (e) {
		logout();
		throw e;
	}
	return res;
}

export {
	getMe,
	registration,
	checkAdminAccess,
	authorize,
	initAuth,
	logout,
	authAsAdmin,
	type Credentials,
};
