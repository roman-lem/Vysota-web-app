<script setup>
import StudentTable from "../Components/UsersTable.vue";
</script>

<template>
	<div class="student-wrapper">
		<div class="desc">
			<h2>Студенты</h2>
			<p>Управление учениками</p>
		</div>
		<div class="user-int-wrapper">
			<div class="table">
				<input
					type="text"
					placeholder="Поиск по имени"
					v-model="filter"
					id="search"
				/>
				<student-table
					:students="students"
					:removeStudent
					:filter
					class="student-table"
				></student-table>
			</div>
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
input {
	width: 300px;
	height: 40px;
	border-radius: 5px;
	border: 1px solid var(--text-color);
	padding: 0 10px;
}

.user-int-wrapper {
	display: grid;
	grid-template-columns: 1fr 300px;
	gap: 50px;
}
.user-int-wrapper input {
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
