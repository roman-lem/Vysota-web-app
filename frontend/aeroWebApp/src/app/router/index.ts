import { createRouter, createWebHistory } from "vue-router";
import Home from "@/widgets/home/Home.vue";
import StudentsPage from "@/widgets/students_widgets/StudentsPage.vue";
import StudentInfo from "@/widgets/students_widgets/StudentInfo.vue";
import LoginForm from "@/features/auth/ui/LoginForm.vue";
import RegisterForm from "@/features/auth/ui/RegisterForm.vue";
import AuthPage from "@/pages/auth/AuthPage.vue";
import TrainersPage from "@/widgets/trainer_widgets/TrainersPage.vue";
import TrainerInfo from "@/widgets/trainer_widgets/TrainerInfo.vue";
import MainPage from "@/pages/main/MainPage.vue";
import { useUserStore } from "@/entities/user/model/user.store";
import { useNoteStore } from "@/shared/notifications/store/notifications.store";

const router = createRouter({
	history: createWebHistory(),
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
				{ path: "", name: "Login", component: LoginForm },
				{ path: "register", name: "Register", component: RegisterForm },
			],
		},
		{
			path: "/admin",
			name: "admin",
			meta: { requiresAdmin: true, requiresAuth: true },
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
				{ path: "users", name: "Users", component: TrainersPage },
				{
					path: "users/:id",
					name: "SelectedUser",
					component: TrainerInfo,
				},
			],
		},
	],
});

router.beforeEach((to, from) => {
	const store = useUserStore();
	const notifications = useNoteStore()
	notifications.clear()
	if (to.matched.some((s) => s.meta.guestOnly)) {
		if (store.isAuth) {
			return "/";
		}
	}
	if (to.matched.some((s) => s.meta.requiresAuth)) {
		if (!store.isAuth) {
			return "/auth";
		}
	}
	if (to.matched.some((s) => s.meta.requiresAdmin)) {
		if (!store.isAuth) {
			return "/auth";
		}

		if (!store.isAdmin) {
			return "/";
		}

		if (!store.isAdminAuth) {
			return "/";
		}
	}
});

export default router;
