<script setup>
import UsersTable from "../Components/UsersTable.vue";
import { onMounted, watch } from "vue";
import { useUsers } from "@/composables/useUsers";
import { useForm } from "@/composables/useForm";
import { debounce } from "vue-debounce";
import { usePagination } from "@/composables/usePagination";

const { users, getUsers } = useUsers();

const { form: filters } = useForm({ name: "", roles: [] });
const {total, pages, pagination} = usePagination()

onMounted(() => {
	getUsers({...filters, ...pagination});
	total.value = users.total
});

function goToPage(page){
	pagination.page = page
}

watch(() => users.total, () => {total.value = users.total})

watch([filters, pagination], debounce(() => {getUsers({...filters, ...pagination})}, 300), { deep: true });

</script>

<template>
	<div class="users-wrapper">
		<div class="desc">
			<h2>Студенты</h2>
			<p>Управление учениками</p>
		</div>
		<div class="users-int-wrapper">
			<div class="table">
				<div class="filters">
					<input
						type="text"
						placeholder="Поиск по имени"
						v-model="filters.name"
					/>
				</div>
				<users-table
					:users="users.data"
					class="users-table"
				></users-table>
				<div class="page-number">
					<div class="page-icon" v-for="page in pages" :key="page" @click="goToPage(page)" :class="(page == pagination.page) ? 'selected':''">{{ page }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.users-wrapper {
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

.users-int-wrapper {
	display: grid;
	grid-template-columns: 1fr;
	gap: 50px;
}
.users-int-wrapper input {
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
.users-table {
	margin-top: 50px;
	background-color: #fff;
}

.page-number{
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
