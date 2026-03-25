<script setup lang="ts">
import type { Trainer } from "@/entities/trainer/model/trainer.types";
import { useRouter } from "vue-router";

const { trainers } = defineProps<{
	trainers: Trainer[]
}>();

const router = useRouter();

function showUserById(id:number) {
	router.push(`/admin/users/${id}`);
}
</script>

<template>
	<div class="table-wrapper">
		<table class="table">
			<thead>
				<tr class="headers">
					<th>ID</th>
					<th>Никнейм</th>
					<th>Роли</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="trainer in trainers"
					:key="trainer.id"
					@click="showUserById(trainer.id)"
				>
					<td>{{ trainer.id }}</td>
					<td>{{ trainer.username }}</td>
					<td>{{ trainer.roles.join(", ") }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style scoped>
.table-wrapper {
	width: 100%;
	padding: 20px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	font-family: "Manrope", sans-serif;
	color: var(--text-color);
	font-size: 20px;
	font-weight: normal;
	border-radius: 10px;
	max-height: 60vh;
	scrollbar-width: 5px;
}
.data-container {
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	gap: 20px;
	height: 300px;
}
input {
	height: 50px;
	border: none;
	background-color: #ffffff00;
	font-size: 25px;
	font-weight: normal;
	color: var(--text-color);
}
table {
	width: 100%;
	border-collapse: collapse;
	position: relative;
	padding-top: 50px;
}
.headers {
	position: sticky;
	top: -20px;
	background-color: #fff;
	height: 50px;
}
th,
td {
	padding: 10px;
	text-align: left;
	border-bottom: 1px solid #ddd;
}
</style>
