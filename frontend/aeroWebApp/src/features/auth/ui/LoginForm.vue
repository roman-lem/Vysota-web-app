<script setup lang="ts">
import { useAuth } from "@/features/auth/model/useAuth";
import { useForm } from "@/shared/lib/useForm";
import { ref } from "vue";
import { useRouter } from "vue-router";
import SimpleInput from "@/shared/ui/SimpleInput.vue";
import PrimaryButton from "@/shared/ui/PrimaryButton.vue";
import type { Credentials } from "../api/auth.api";
const router = useRouter();

const { loading, login } = useAuth();
const { data: formData } = useForm<Credentials>({ username: "", password: "" });
const isPasswordShown = ref<boolean>(false);

function toReg() {
	router.push("/auth/register");
}
</script>

<template>
	<div class="login">
		<h1>Авторизация</h1>
		<div class="auth">
			<simple-input class="simple-input" type="text" placeholder="Логин" v-model="formData.username" />
			<div class="password">
				<simple-input
				class="simple-input"
					:type="isPasswordShown ? 'text' : 'password'"
					placeholder="Пароль"
					v-model="formData.password"
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="25"
					height="25"
					fill="currentColor"
					class="bi bi-eye-slash"
					viewBox="0 0 16 16"
					@click="isPasswordShown = !isPasswordShown"
					v-if="!isPasswordShown"
				>
					<path
						d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"
					/>
					<path
						d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"
					/>
					<path
						d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"
					/>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="25"
					height="25"
					fill="currentColor"
					class="bi bi-eye"
					viewBox="0 0 16 16"
					@click="isPasswordShown = !isPasswordShown"
					v-else
				>
					<path
						d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
					/>
					<path
						d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
					/>
				</svg>
			</div>
			<primary-button
			class="primary-button"
				:disabled="loading"
				@click="
					login({ username: formData.username, password: formData.password })
				"
			>
				Войти
			</primary-button>
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
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.login h1 {
	font-size: 30px;
	font-weight: 600;
	font-family: "Lexand", sans-serif;
	color: var(--primary-color);
	margin-bottom: 20px;
}
.login p {
	color: var(--text-color);
	text-align: center;
	cursor: pointer;
	border-bottom: 0.3px solid var(--text-color);
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
	font-family: "Manrope", sans-serif;
}


.password {
	position: relative;
	gap: 5px;
}

.password svg {
	position: absolute;
	top: 10px;
	left: 210px;
}

.simple-input {
	width: 200px;
}

.auth .primary-button {
	width: 200px;
}

.auth .primary-button:disabled {
	background-color: #bbb;
}

.register {
	margin-top: 20px;
	font-family: "Manrope", sans-serif;
	font-size: 18px;
}
</style>
