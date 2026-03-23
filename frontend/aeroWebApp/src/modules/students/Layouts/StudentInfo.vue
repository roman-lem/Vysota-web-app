<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStudents } from "@/composables/useStudents";
import { useForm } from "@/composables/useForm";

const route = useRoute();
const { student, getStudentById, setStudentParams } = useStudents();
const id = route.params.id;
const editable = ref(false);
const { form: studentData } = useForm({
	id: id,
	name: "",
	birth_date: "",
	level: "",
	parent_name: "",
	parent_phone: "",
});
const dict = {
	name: "Имя",
	birth_date: "Дата рождения",
	level: "Разряд",
	parent_name: "Имя родителя",
	parent_phone: "Телефон родителя",
};

onMounted(async () => {
	await getStudentById(id);
	for (const key in studentData) {
		studentData[key] = student.value[key];
	}
});

async function changeEditMode() {
	if (editable.value && confirm("Сохранить изменения?")) {
		await setStudentParams(studentData);
		await getStudentById(id);
	}
	editable.value = !editable.value;
}
</script>

<template>
	<div class="selected-student" v-if="student != null">
		<div class="photo">
			<img
				:src="student.photo || '../../../public/default.jpg'"
				alt="Фото студента"
			/>
		</div>
		<div class="data">
			<div class="data-header">
				<h2>{{ student.name }}</h2>
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
					v-for="(value, key) in studentData"
					:style="{ display: key === 'id' ? 'none' : 'block' }"
				>
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
