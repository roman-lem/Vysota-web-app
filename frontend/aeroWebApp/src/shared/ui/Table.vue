<script setup lang="ts">
import { ref } from "vue"
import { computed } from 'vue';

const { headers, data, rel_width } = defineProps<{
	headers: string[];
	data: any[][];
    rel_width: number[]
}>();

const table = ref<HTMLElement | null>(null)

const widths = computed(() => {
    const res: string[] = []
    const el = table.value
    if (el !== null){
        const total = rel_width.reduce((s, e) => s + e)
        rel_width.forEach((e) => {
            res.push(`${e/total*el.clientWidth}px`)
        })
    }
    return res
})

</script>

<template>
	<div class="table-wrapper">
		<table ref="table">
			<thead>
				<tr>
					<th v-for="(header, index) in headers" :key="header" :style="{width: widths[index]}">
						{{ header }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(row, row_index) in data"
					:key="row_index"
					@click="$emit('row_click', row[0])"
				>
					<td v-for="(el, el_index) in row.slice(1)" :key="el_index">
						{{ el }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style scoped>
.table-wrapper {
	width: 100%;
	padding: 20px;
	font-family: "Manrope", sans-serif;
	color: var(--text-color);
	font-size: 20px;
	font-weight: normal;
	border-radius: 10px;
}

table {
	width: 100%;
	table-layout: fixed;
}

th {
    text-align: left;
}

tr {
	height: 50px;
	overflow: hidden; 
	white-space: nowrap; 
	text-overflow: ellipsis;
}
th,
td {
	padding: 10px;
	text-align: left;
	border-bottom: 1px solid #ddd;
	overflow: hidden; 
	white-space: nowrap; 
	text-overflow: ellipsis;
}
</style>
