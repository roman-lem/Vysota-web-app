<script setup lang="ts">
import ElementsTable from "@/shared/ui/Table.vue";
import SimpleInput from "@/shared/ui/SimpleInput.vue";
import { computed, onMounted, watchEffect} from "vue";
import { useForm } from "@/shared/lib/useForm";
import { usePagination } from "@/shared/lib/usePagination";
import { refDebounced } from "@vueuse/core"
import { useElementsQuery } from "@/entities/element/lib/useElementsQuery";


const { data: filters } = useForm({ code: "" });
const { total, pages, pagination } = usePagination();
const debouncedFilters = refDebounced<any>(filters, 300)
const {data: elements} = useElementsQuery(debouncedFilters, pagination)


onMounted(async () => {
	pagination.limit = 10
});

watchEffect(() => {
	if (elements.value != undefined){
		total.value = elements.value.meta.total
	}
})

function goToPage(page: number) {
	pagination.page = page;
}

const elementsData = computed(() => {
	if (elements.value != undefined){
		return elements.value.data.map((element) => [
			element.id,
			element.code,
			element.type,
			element.sportsmenCount,
			element.equipment,
			element.score,
			element.description,
		]);
	}
	else {
		return []
	}
});

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
					<simple-input v-model="filters.code" placeholder="Код" type="text"></simple-input>
				</div>
				<elements-table
					:rel_width="[1, 1.5, 2, 2, 2, 8]"
					:headers="['Код', 'Категория', 'Кол-во спортсменов', 'Снаряд', 'Стоимость', 'Описание']"
					:data="elementsData"
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
