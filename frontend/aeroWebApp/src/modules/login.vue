<script setup>
import { useUserStore } from "../store/userState";
import { useRouter } from "vue-router";
import { Axios } from "axios";
import { ref } from "vue";

const state = useUserStore();
const router = useRouter();

const login = ref("");
const password = ref("");

function toReg() {
	router.push("/auth/register");
}

const loading = ref(false);

async function authorize(login, password) {
	if (!login || !password) return;

	try {
		loading.value = true;
		await state.login({ login, password });
		router.push("/");
	} catch (e) {
		console.error(e);
	} finally {
		loading.value = false;
	}
}
</script>

<template>
	<div class="login">
		<h1>Авторизация</h1>
		<div class="auth">
			<input type="text" placeholder="Логин" v-model="login" />
			<input type="password" placeholder="Пароль" v-model="password" />
			<button :disabled="loading" @click="authorize(login, password)">Войти</button>
		</div>
		<p class="register" @click="toReg">Зарегистрироваться</p>
	</div>
</template>

<style scoped>
.login {
	width: 400px;
	height: 100vh;
	margin: 0 auto;
	padding: 20px;
	font-family: "Manrope", sans-serif;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.login p {
	color: var(--text-color);
	text-align: center;
	cursor: pointer;
	border-bottom: 0.3px solid var(--text-color);
}

input {
	width: 100%;
	padding: 8px;
	box-sizing: border-box;
}

button {
	width: 100%;
	padding: 10px;
	background-color: #007bff;
	color: white;
	border: none;
	cursor: pointer;
}

.auth {
	display: flex;
	flex-direction: column;
	gap: 20px;
	justify-content: center;
	align-items: center;
	background-color: var(--secondary-color-transparent);
	width: 300px;
	height: 200px;
	border-radius: 10px;
}

.auth input {
	width: 200px;
	height: 40px;
	border-radius: 5px;
	border: none;
	padding: 0 10px;
	background-color: #fff;
}

.auth button {
	width: 150px;
	height: 40px;
	border-radius: 5px;
	border: none;
	background-color: var(--primary-color);
	color: white;
	cursor: pointer;
}

.auth button:disabled{
    background-color: #bbb;
}
</style>
