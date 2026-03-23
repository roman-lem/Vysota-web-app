import { defineStore } from "pinia";
import { authorize, getMe, registration } from "@/api/auth.api";
import {
	getStudents,
	addStudent,
	getStudentById,
	setStudent,
} from "@/api/student.api";
import { getUsers, getUserById } from "@/api/user.api";

export const useUserStore = defineStore("user", {
	state: () => ({
		access_token: null,
		refresh_token: null,
		user_id: null,
		roles: [],
		isAdminAuth: false,
	}),
	actions: {
		async login(credentials) {
			try {
				const res = await authorize(credentials);
				this.access_token = res.data.data.access_token;
				this.refresh_token = res.data.data.refresh_token;
				if (this.access_token) {
					localStorage.setItem("access_token", this.access_token);
				} else {
					localStorage.removeItem("access_token");
				}
				if (this.refresh_token) {
					localStorage.setItem("refresh_token", this.refresh_token);
				} else {
					localStorage.removeItem("refresh_token");
				}
				const user = await getMe();
				this.user_id = user.data.data.id;
				this.roles = user.data.data.roles;
				return res;
			} catch (e) {
				this.logout();
				throw e;
			}
		},
		async register(params) {
			try {
				const res = await registration(params);
				return res;
			} catch (e) {
				throw e;
			}
		},
		logout() {
			this.access_token = null;
			this.refresh_token = null;
			this.user_id = null;
			this.roles = [];
			this.isAdminAuth = false;
			localStorage.removeItem("access_token");
			localStorage.removeItem("refresh_token");
		},
		async initAuth() {
			const at = localStorage.getItem("access_token");
			const rt = localStorage.getItem("refresh_token");
			if (at && rt) {
				this.access_token = at;
				this.refresh_token = rt;
				return getMe()
					.then((response) => {
						this.user_id = response.data.data.id;
						this.roles = response.data.data.roles;
					})
					.catch((e) => {
						this.logout();
					});
			}
		},
		authAsAdmin() {
			if (this.hasAnyRoles("admin", "owner")) {
				this.isAdminAuth = true;
			}
		},
		hasAnyRoles(...roles) {
			return roles.some((role) => this.roles.includes(role));
		},
		async getStudents(params) {
			const res = await getStudents(params);
			return { data: res.data.data, meta: res.data.meta };
		},
		async getStudentById(id) {
			const res = await getStudentById(id);
			return res.data.data;
		},
		async createStudent(data) {
			const res = await addStudent(data);
			return res.data.data;
		},
		async setStudentParams(data) {
			const res = await setStudent(data);
			return res.data;
		},
		//=========================================================
		async getUsers(params) {
			const res = await getUsers(params);
			return { data: res.data.data, meta: res.data.meta };
		},
		async getUserById(id){
			const res = await getUserById(id)
			return res.data.data
		}
	},
	getters: {
		isAuth: (state) => !(state.access_token === null),
		isAdmin: (state) => state.roles.includes("admin") && state.isAdminAuth,
	},
});
