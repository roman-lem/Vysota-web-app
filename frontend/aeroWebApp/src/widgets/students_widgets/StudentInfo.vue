<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useStudents } from "@/features/student_management/model/useStudentManagement";
import { useStudentStore } from "@/entities/student/model/student.store";
import { useForm } from "@/shared/lib/useForm";
import type { Student } from "@/entities/student/model/student.types";

const route = useRoute();
const { fetchStudentById, updateStudent } = useStudents();
const id = Number(route.params.id);
const editable = ref(false);
const store = useStudentStore()
const { data: studentData } = useForm<Student>({
	id: id,
	name: "",
	birth_date: "",
	level: "",
	parent_name: "",
	parent_phone: "",
});
const dict: Student = {
	id: 0,
	name: "Имя",
	birth_date: "Дата рождения",
	level: "Разряд",
	parent_name: "Имя родителя",
	parent_phone: "Телефон родителя",
};
type StudentKey = keyof Student
const studentKeys = computed(() => {
  return Object.keys(studentData.value) as StudentKey[];
});

onMounted(async () => {
	await fetchStudentById(id);
	if (!store.student) return
	Object.assign(studentData.value, store.student)
});

async function changeEditMode() {
	if (editable.value && confirm("Сохранить изменения?")) {
		await updateStudent(studentData.value);
		await fetchStudentById(id);
	}
	editable.value = !editable.value;
}
</script>

<template>
	<div class="selected-student" v-if="store.student != null">
		<div class="photo">
			<img
				:src="'../../../public/default.jpg'"
				alt="Фото студента"
			/>
		</div>
		<div class="data">
			<div class="data-header">
				<h2>{{ store.student.name }}</h2>
				<div class="edit" @click="changeEditMode">
					<img
						src="./../../../../public/edit.png"
						alt="Редактировать"
					/>
				</div>
			</div>
			<div class="data-container">
				<div
					class="field"
					v-for="key in studentKeys"
					:style="{ display: key === 'id' ? 'none' : 'block' }" >
					<p>{{ dict[key] }}</p>
					<div class="level-data" v-if="key == 'level' && editable">
						<select v-model="studentData[key]" name="level" id="level" :disabled="!editable">
							<option value="Начинающий">Начинающий</option>
							<option value="Продолжающий">Продолжающий</option>
							<option value="КМС">КМС</option>
							<option value="МС">МС</option>
						</select>
					</div>
					<input
						v-else
						:type="key === 'birth_date' ? 'date' : 'text'"
						v-model="studentData[key]"
						:disabled="!editable"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.selected-student {
	box-sizing: border-box;
	font-family: "Manrope", sans-serif;
	display: grid;
	grid-template-columns: 300px 1fr;
	grid-template-rows: 300px 1fr;
	gap: 20px;
	padding: 50px;
}

.data-container {
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	gap: 20px;
	height: 300px;
}
input, select {
	height: 50px;
	border: none;
	background-color: #ffffff00;
	font-size: 25px;
	font-weight: normal;
	color: var(--text-color);
}
.photo {
	width: 300px;
	height: 300px;
	border-radius: 10%;
	overflow: hidden;
	margin-bottom: 20px;
	margin-right: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
}
h2 {
	font-family: "Manrope", sans-serif;
	font-size: 40px;
	margin: 0;
	display: inline-block;
}

.data {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.data-header {
	display: flex;
	gap: 20px;
	align-items: center;
}

.edit {
	width: 40px;
	height: 40px;
	border-radius: 5px;
	background-color: var(--secondary-color-transparent);
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	overflow: hidden;
}
.edit img {
	width: 30px;
	height: 30px;
}
</style>
