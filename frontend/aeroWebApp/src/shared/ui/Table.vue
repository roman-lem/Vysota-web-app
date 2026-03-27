<script setup lang="ts">

const {headers, data} = defineProps<{
    headers: string[],
    data: any[][]
}>()

</script>

<template>
    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <td v-for="header in headers" :key="header">{{ header }}</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, row_index) in data" :key="row_index" @click="$emit('row_click', row[0])">
                    <td v-for="(el, el_index) in row.slice(1)" :key="el_index">{{ el }}</td>
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
}

.headers {
	background-color: #fff;
	height: 50px;
}
td {
	padding: 10px;
	text-align: left;
	border-bottom: 1px solid #ddd;
}

</style>