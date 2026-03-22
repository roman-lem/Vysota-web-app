<script setup>

import { ref } from 'vue';
import { registration } from '../api/auth.api'



const login = ref('')
const password = ref('')



</script>


<template>
    <div class="form">
        <h1>Регистрация</h1>
        <div class="auth">
            <input type="text" placeholder="Логин" v-model="login">
            <input type="password" placeholder="Пароль" v-model="password">
            <button @click="registration">Зарегистрироваться</button>
        </div>
        <p>Уже есть аккаунт? <RouterLink to="/auth">Войти</RouterLink></p>
    </div>
</template>


<style scoped>
    .form {
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

    .form h1 {
        margin-bottom: 20px;
    }

    input {
        width: 80%;
        padding: 8px;
        box-sizing: border-box;
        margin-bottom: 15px;
        border: none;
        border-radius: 5px;
    }

    button {
        width: 80%;
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
        border: none;
        border-radius: 5px;
    }

    .form p {
        margin-top: 20px;
    }
    .form p a {
        color: var(--text-color);
        text-decoration: none;
        border-bottom: 0.3px solid var(--text-color);
    }
</style>