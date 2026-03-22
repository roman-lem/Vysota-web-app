<script setup>
import StudentsTable from "../Components/StudentsTable.vue";
import StudentForm from "../Components/StudentForm.vue";
import { useUserStore } from "@/store/userState";
import { onMounted, ref, watchEffect } from "vue";

const store = useUserStore()
const filterByName = ref("")
const students = ref([])
const filters = ref({
	name: "",
	level: ""
})

onMounted(async () => {
	students.value = await store.getStudents(filters.value)
})

async function submit(){
	students.value = await store.getStudents(filters.value)
}

</script>

<template>
	<div class="student-wrapper">
		<div class="desc">
			<h2>Студенты</h2>
			<p>Управление учениками</p>
		</div>
		<div class="student-int-wrapper">
			<div class="table">
				<div class="filters">
					<input
						type="text"
						placeholder="Поиск по имени"
						v-model="filters.name"
						id="search"
					/>
					<input
						type="text"
						placeholder="Поиск по уровню"
						v-model="filters.level"
						id="search"
					/>
					<button @click="submit">Применить</button>
				</div>
				<students-table
					:students="students"
					class="student-table"
				></students-table>
			</div>
			<student-form></student-form>
		</div>
	</div>
</template>

<style scoped>
.student-wrapper {
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 50px;
	box-sizing: border-box;
}
h2 {
	font-size: 50px;
	margin-bottom: 25px;
	font-weight: bolder;
}
p {
	font-size: 20px;
	margin-bottom: 30px;
}
.desc {
	font-family: "Manrope", sans-serif;
}
.filters {
	display: flex;
	gap: 20px;
}
input {
	width: 300px;
	height: 40px;
	border-radius: 5px;
	border: 1px solid var(--text-color);
	padding: 0 10px;
	display: inline-block;
}

.student-int-wrapper {
	display: grid;
	grid-template-columns: 1fr 300px;
	gap: 50px;
}
.student-int-wrapper input {
	width: 200px;
	height: 40px;
	border-radius: 5px;
	border: none;
	padding: 0 10px;
	display: block;
}
button {
	width: 150px;
	height: 40px;
	border-radius: 5px;
	border: none;
	background-color: var(--primary-color);
	color: white;
	cursor: pointer;
}
.student-table {
	margin-top: 50px;
	background-color: #fff;
}
</style>
