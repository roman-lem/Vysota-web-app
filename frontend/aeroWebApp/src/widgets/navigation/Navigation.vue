<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "@/entities/user/model/user.store";
import { computed } from "vue";
import { logout, authAsAdmin } from "@/features/auth/api/auth.api";

const store = useUserStore();
const router = useRouter();

const menuItems = [
	{ name: "Главная", path: "", isAdminNeeded: false },
	{ name: "Студенты", path: "students", isAdminNeeded: false },
	{ name: "Пользователи", path: "users", isAdminNeeded: true },
];

const possibleItems = computed(() => {
	return menuItems.filter((i) => {
		if (i.isAdminNeeded) {
			if (store.isAdmin && store.isAdminAuth) return true;
			else return false;
		} else return true;
	});
});

function goTo(path: string) {
	if (store.isAdminAuth) {
		router.push(`/admin/${path}`);
	} else {
		router.push(`/${path}`);
	}
}

function becomeAdmin() {
	authAsAdmin()
	if (store.isAdminAuth){
		router.push("/admin")
	}
}

</script>

<template>
	<div class="nav-wrapper">
		<div class="header">
			<h1>Высота</h1>
			Продвинутое управление
		</div>
		<nav>
			<ul>
				<li
					class="link"
					v-for="item in possibleItems"
					:key="item.name"
					@click="goTo(item.path)"
				>
					{{ item.name }}
				</li>
			</ul>
		</nav>
		<button @click="() => {logout(); router.push('/auth')}">Выйти</button>
		<p to="/admin" id="admin-link" @click="becomeAdmin">
			Вход для администратора
		</p>
	</div>
</template>

<style scoped>
.nav-wrapper {
	display: flex;
	flex-direction: column;
	color: var(--text-color);
	font-family: "Manrope", sans-serif;
	background-color: #fff;
	width: 300px;
	height: 100%;
    position: relative;
}
.header {
	margin: 50px auto;
	font-family: "Lexand", sans-serif;
}
h1 {
	font-size: 30px;
	color: var(--primary-color);
	margin-bottom: 10px;
	font-weight: bold;
}
nav {
	display: flex;
	gap: 20px;
	margin-bottom: 20px;
	flex-direction: column;
}
.link {
	margin: 0 auto;
	font-weight: bold;
	width: 80%;
	height: 40px;
	line-height: 40px;
	background-color: var(--background-color);
	text-align: left;
	border-radius: 5px;
	padding-left: 30px;
	box-sizing: border-box;
}

ul {
	list-style-type: none;
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: center;
	padding: 0;
}

li:hover {
	background-color: var(--secondary-color-transparent);
	cursor: pointer;
}

button {
	width: 80%;
	height: 40px;
	margin: 0 auto;
	border-radius: 5px;
	border: none;
	background-color: var(--primary-color);
	color: white;
	cursor: pointer;
}

#admin-link {
	color: var(--text-color);
	border-bottom:
		1px var(--text-color),
		solid;
	position: absolute;
	bottom: 100px;
	left: 60px;
	font-size: 14px;
	background-color: #fff;
	cursor: pointer;
}
</style>
