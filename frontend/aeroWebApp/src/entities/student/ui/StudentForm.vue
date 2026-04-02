<script setup lang="ts">
import LevelSelect from "@/shared/ui/LevelSelect.vue";
import { useForm } from "@/shared/lib/useForm";
import { useNoteStore } from "@/shared/notifications/store/notifications.store";
import { v4 as uuid4 } from "uuid";
import { useCreateStudent } from "../lib/useStudentsQuery";
import { watch } from "vue";
import { useQueryClient } from "@tanstack/vue-query";
import type { NewStudent, StudentDto } from "../model/student.types";
import { newStudentToDto } from "../lib/mapper";

const { data: form, reset } = useForm<NewStudent>({
	name: "",
	level: "",
	parentName: "",
	parentPhone: "",
	birthDate: new Date(),
});
const addStudent = useCreateStudent();
const noteStore = useNoteStore();
const client = useQueryClient()

async function submit() {
	if (Object.values(form.value).includes("")) {
		noteStore.createNote({
			id: uuid4(),
			message: "Заполните все поля",
			createdAt: Date.now(),
			type: "warning",
			duration: 4000,
			persistent: false,
			source: "ui",
			dedupeKey: "empty_form",
		});
		return;
	}
	addStudent.mutate(newStudentToDto(form.value));
}

watch(addStudent.isSuccess, (newValue, oldValue) => {
	if (!oldValue && newValue) {
		noteStore.createNote({
			id: uuid4(),
			message: "Ученик успешно добавлен",
			createdAt: Date.now(),
			type: "success",
			duration: 2000,
			persistent: false,
			source: "ui",
			dedupeKey: "empty_form",
		});
		client.invalidateQueries({queryKey: ["students"]})
		reset();
	}
});
</script>

<template>
	<div class="form-wrapper">
		<div class="form-header">
			<img src="./../../../../public/aside/addStudent.png" alt="" />
			<h3>Добавить ученика</h3>
		</div>
		<div class="form">
			<input
				type="text"
				v-model="form.name"
				placeholder="Имя ученика"
				id="name"
			/>
			<div class="date">
				<p>Дата рождения</p>
				<input
					type="date"
					v-model="form.birthDate"
					placeholder="Дата рождения"
					id="birthDate"
				/>
			</div>
			<div class="date">
				<p>Уровень</p>
				<level-select v-model="form.level"></level-select>
			</div>
			<input
				type="text"
				v-model="form.parentName"
				placeholder="Имя родителя"
				id="parentName"
			/>
			<input
				type="phone"
				v-model="form.parentPhone"
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
.form input{
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
