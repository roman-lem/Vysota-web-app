import { createRouter, createWebHistory } from "vue-router";
import Home from "../modules/home/Home.vue";
import StudentsPage from "../modules/students/Layouts/StudentsPage.vue";
import StudentInfo from "../modules/students/Layouts/StudentInfo.vue";
import LoginPage from "../modules/login.vue";
import RegisterPage from "../modules/register.vue";
import AuthPage from "../modules/authPage.vue";
import UsersPage from "../modules/users/Layouts/UsersPage.vue";
import UserInfo from "../modules/users/Layouts/UserInfo.vue";
import MainPage from "../modules/mainPage.vue";
import { useUserStore } from "@/store/userState";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "MainInterface",
			meta: { requiresAuth: true },
			component: MainPage,
			children: [
				{ path: "", name: "Home", component: Home },
				{ path: "students", name: "Students", component: StudentsPage },
				{
					path: "students/:id",
					name: "SelectedStudent",
					component: StudentInfo,
				},
			],
		},
		{
			path: "/auth",
			name: "auth",
			meta: { guestOnly: true },
			component: AuthPage,
			children: [
				{ path: "", name: "Login", component: LoginPage },
				{ path: "register", name: "Register", component: RegisterPage },
			],
		},
		{
			path: "/admin",
			name: "admin",
			meta: { requiresAdmin: true, requiresAuth: true},
			component: MainPage,
			children: [
				{ path: "", name: "adminHome", component: Home },
				{
					path: "students",
					name: "adminStudents",
					component: StudentsPage,
				},
				{
					path: "students/:id",
					name: "adminSelectedStudent",
					component: StudentInfo,
				},
				{ path: "users", name: "Users", component: UsersPage },
				{
					path: "users/:id",
					name: "SelectedUser",
					component: UserInfo,
				},
			],
		},
	],
});

router.beforeEach((to, from) => {
    const store = useUserStore();
	if (to.matched.some((s) => s.meta.guestOnly)) {
		if (store.isAuth) {
			return "/"
		}
	}
	if (to.matched.some((s) => s.meta.requiresAuth)) {
		if (!store.isAuth) {
			return "/auth"
		}
	}
	if (to.matched.some((s) => s.meta.requiresAdmin)) {
		if (!store.isAuth) {
			return "/auth"
		} else if (!store.isAdmin) {
			return "/"
		}
	}
});

export default router;
