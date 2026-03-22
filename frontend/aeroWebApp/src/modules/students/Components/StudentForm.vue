<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/userState";
import { useRouter } from "vue-router";

const store = useUserStore();
const router = useRouter();

const data = ref({
	name: "",
	level: "",
	parent_name: "",
	parent_phone: "",
	birth_date: "",
});

function submit() {
	console.log(data.value);
	console.log(Object.values(data.value));
	if (Object.values(data.value).includes("")) {
		alert("Заполните все поля");
		return;
	}
    console.log(data.value.level)
    store.createStudent(data.value)
}
</script>

<template>
	<div class="form-wrapper">
		<div class="form-header">
			<img src="../../../public/aside/addStudent.png" alt="" />
			<h3>Добавить ученика</h3>
		</div>
		<div class="form">
			<input
				type="text"
				v-model="data.name"
				placeholder="Имя ученика"
				id="name"
			/>
			<div class="date">
				<p>Дата рождения</p>
				<input
					type="date"
					v-model="data.birth_date"
					placeholder="Дата рождения"
					id="birthDate"
				/>
			</div>
            <div class="date">
                <p>Уровень</p>
                <select v-model="data.level" name="level" id="level">
                    <option value="Начинающий">Начинающий</option>
                    <option value="Продолжающий">Продолжающий</option>
                    <option value="КМС">КМС</option>
                    <option value="МС">МС</option>
                </select>
            </div>
			<input
				type="text"
				v-model="data.parent_name"
				placeholder="Имя родителя"
				id="parentName"
			/>
			<input
				type="phone"
				v-model="data.parent_phone"
				placeholder="Телефон родителя"
				id="parentPhone"
			/>
			<button @click="submit">Добавить ученика</button>
		</div>
	</div>
</template>

<style scoped>
.form-wrapper {
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	background-color: var(--secondary-color-transparent);
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	max-height: 500px;
}
h3 {
	font-family: "Manrope", sans-serif;
	margin: 0;
}
.form-header {
	display: flex;
	gap: 10px;
	align-items: center;
}

.form {
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: center;
	width: 80%;
	box-sizing: border-box;
}
.form input, select {
	opacity: 0.8;
	border: none;
	width: 100%;
	height: 40px;
	border-radius: 5px;
	padding: 0 10px;
	box-sizing: border-box;
}
.form input:focus {
	opacity: 1;
	border: none;
}
.date p {
    margin-top: 0;
	margin-bottom: 5px;
	font-family: "Manrope", sans-serif;
	color: #888;
}
.date {
	width: 100%;
}

button {
	border: none;
	width: 100%;
	height: 40px;
	border-radius: 5px;
	box-sizing: border-box;
	background-color: var(--primary-color);
	color: #fff;
	font-weight: 500;
	text-align: left;
	padding: 0 10px;
}
</style>
