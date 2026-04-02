<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useForm } from "@/shared/lib/useForm";
import type { Student } from "@/entities/student/model/student.types";
import { useStudentQuery } from "@/entities/student/lib/useStudentQuery";

const route = useRoute();
const id = Number(route.params.id);
const editable = ref(false);
const {data: student, isSuccess} = useStudentQuery(id)
const { data: studentData } = useForm<Student>({
	id: id,
	name: "",
	birthDate: new Date(),
	level: "",
	parentName: "",
	parentPhone: "",
});

const dict: any = {
	id: 0,
	name: "Имя",
	birthDate: "Дата рождения",
	level: "Разряд",
	parentName: "Имя родителя",
	parentPhone: "Телефон родителя",
};

type StudentKey = keyof Student
const studentKeys = computed(() => {
	return Object.keys(studentData.value) as StudentKey[];
});
console.log(studentKeys)

watchEffect(() => {
	if(isSuccess.value && !editable.value && student.value){
		studentData.value = Object.assign(student.value)
	}
})

async function changeEditMode() {
	if (editable.value && confirm("Сохранить изменения?")) {
		// There must be mutation
	}
	editable.value = !editable.value;
}
</script>

<template>
	<div class="selected-student" v-if="student != null">
		<div class="photo">
			<img
				src="/default.jpg"
				alt="Фото студента"
			/>
		</div>
		<div class="data">
			<div class="data-header">
				<h2>{{ student.name }}</h2>
				<div class="edit" @click="changeEditMode">
					<img
						src="/edit.png"
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
						v-else-if="key === 'birthDate' && editable"
						:type="'date'"
						v-model="studentData[key]"
						:disabled="!editable"
					/>
					<input
						v-else-if="key === 'birthDate'"
						:type="'text'"
						:value="studentData[key].toLocaleDateString()"
						:disabled="!editable"
					/>
					<input
						v-else
						:type="'text'"
						:value="studentData[key]"
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
