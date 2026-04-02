<script setup lang="ts">
import StudentForm from "@/entities/student/ui/StudentForm.vue";
import StudentsTable from "@/shared/ui/Table.vue";
import { watchEffect, computed, type Ref } from "vue";
import { useRouter } from "vue-router";
import { useForm } from "@/shared/lib/useForm";
import { usePagination } from "@/shared/lib/usePagination";
import { useStudentsQuery } from "@/entities/student/lib/useStudentsQuery";
import { refDebounced } from "@vueuse/core";

const { data: filters } = useForm({ name: "", level: "" });
const { total, pages, pagination } = usePagination();
const debouncedFilter = refDebounced<any>(filters, 300);
const { data: students } = useStudentsQuery(debouncedFilter, pagination);
const router = useRouter();
function goToPage(page: number) {
	pagination.page = page;
}

function goToStudent(id: number) {
	router.push(`/students/${id}`);
}

watchEffect(() => {
	if (students.value) {
		total.value = students.value.meta.total;
	}
});

const studentsData = computed(() => {
	if (students.value) {
		return students.value.data.map((student) => [
			student.id,
			student.name,
			student.birthDate.toLocaleDateString(),
			student.level,
		]);
	}
	return [];
});
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
					/>
					<select v-model="filters.level" name="level" id="level">
						<option value="">Любой уровень</option>
						<option value="Начинающий">Начинающий</option>
						<option value="Продолжающий">Продолжающий</option>
						<option value="КМС">КМС</option>
						<option value="МС">МС</option>
					</select>
				</div>
				<students-table
					:rel_width="[2, 1, 1]"
					@row_click="goToStudent"
					:headers="['Имя', 'Дата рождения', 'Разряд']"
					:data="studentsData"
					class="student-table"
				></students-table>
				<div class="page-number">
					<div
						class="page-icon"
						v-for="page in pages"
						:key="page"
						@click="goToPage(page)"
						:class="page == pagination.page ? 'selected' : ''"
					>
						{{ page }}
					</div>
				</div>
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
	font-family: "Manrope", sans-serif;
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
.filters {
	display: flex;
	gap: 20px;
}
select {
	width: 200px;
	height: 40px;
	border-radius: 5px;
	border: none;
	padding: 0 10px;
	display: block;
	color: var(--text-color);
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
	margin-top: 10px;
	background-color: #fff;
}

.page-number {
	display: flex;
	gap: 5px;
	justify-content: center;
	margin-top: 10px;
}

.page-icon {
	width: 30px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	font-size: 14px;
	border-radius: 5px;
	background-color: #fff;
	cursor: pointer;
}

.selected {
	background-color: var(--secondary-color-transparent);
	color: #fff;
}
</style>
