<script setup lang="ts">
import TrainersTable from "@/shared/ui/Table.vue";
import { computed, watchEffect } from "vue";
import { useForm } from "@/shared/lib/useForm";
import { usePagination } from "@/shared/lib/usePagination";
import { useRouter } from "vue-router";
import { refDebounced } from "@vueuse/core";
import { useTrainersQuery } from "@/entities/trainer/lib/useTrainersQuery";

const { data: filters } = useForm({ name: "", roles: [] });
const { total, pages, pagination } = usePagination();
const debouncedFilters = refDebounced(filters, 300)
const {data: trainers} = useTrainersQuery(debouncedFilters, pagination)
const router = useRouter();

function goToPage(page: number) {
	pagination.page = page;
}

function goToTrainer(id: number) {
	router.push(`/admin/users/${id}`);
}

const trainersData = computed(() => {
	if (trainers.value) {
		return trainers.value.data.map((trainer) => [
			trainer.id,
			trainer.id,
			trainer.username,
			trainer.roles.join(", "),
		]);
	}
	return []
});

watchEffect(() => {
	if (trainers.value){
		total.value = trainers.value.meta.total;
	}
});

</script>

<template>
	<div class="users-wrapper">
		<div class="desc">
			<h2>Тренера</h2>
			<p>Управление пользователями</p>
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
				<trainers-table
					@row_click="goToTrainer"
					:rel_width="[1, 5, 5]"
					:headers="['ID', 'Username', 'Roles']"
					:data="trainersData"
					class="users-table"
				></trainers-table>
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
