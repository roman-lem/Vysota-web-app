<script setup lang="ts">
import ElementsTable from "@/shared/ui/Table.vue";
import { computed, onMounted, watch, watchEffect } from "vue";
import { useForm } from "@/shared/lib/useForm";
import { debounce } from "vue-debounce";
import { usePagination } from "@/shared/lib/usePagination";
import { useElementStore } from "@/entities/element/model/element.store";

const store = useElementStore()

const { data: filters } = useForm({ name: "", roles: [] });
const { total, pages, pagination } = usePagination();

onMounted(async () => {
	const res = await store.loadElements({ ...filters.value, ...pagination });
    total.value = res.total
});

function goToPage(page: number) {
	pagination.page = page;
}

const elements_data = computed(() => {
	return store.elements.map((element) => [
		element.id,
        element.code,
		element.type,
		element.equipment,
        element.score,
        element.description,
	]);
});

watch(
	[filters.value, pagination],
	debounce(async () => {
		const res = await store.loadElements({ ...filters.value, ...pagination });
        total.value = res.total
	}, 300),
	{ deep: true },
);
</script>

<template>
	<div class="elements-wrapper">
		<div class="desc">
			<h2>Элементы</h2>
			<p>Общая база</p>
		</div>
		<div class="elements-int-wrapper">
			<div class="table">
				<div class="filters">
				</div>
				<elements-table
					:headers="['Код', 'Категория', 'Снаряд', 'Стоимость', 'Описание']"
					:data="elements_data"
					class="users-table"
				></elements-table>
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
.elements-wrapper {
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

.elements-int-wrapper {
	display: grid;
	grid-template-columns: 1fr;
	gap: 50px;
}
.elements-int-wrapper input {
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
