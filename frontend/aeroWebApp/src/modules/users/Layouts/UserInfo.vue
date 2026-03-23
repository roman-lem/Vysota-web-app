<script setup>
import { useUsers } from "@/composables/useUsers";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const { user, getUserById } = useUsers();
const route = useRoute();
const id = route.params.id;
const editable = ref(false);

onMounted(() => {
	getUserById(id);
});
</script>

<template>
	<div class="selected-user" v-if="user != null">
		<div class="photo">
			<img
				:src="user.photo || '../../../public/default.jpg'"
				alt="Фото студента"
			/>
		</div>
		<div class="data">
			<div class="data-header">
				<h2>{{ user.name }}</h2>
				<div class="edit">
					<img src="../../../../public/edit.png" alt="Редактировать" />
				</div>
			</div>
			<div class="data-container">
				<div class="field" v-for="(value, key) in user">
					<p>{{ key }}</p>
					<input
						v-model="user[key]"
						:disabled="!editable"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.selected-user {
	box-sizing: border-box;
	font-family: "Manrope", sans-serif;
	display: grid;
	grid-template-columns: 300px 1fr;
	grid-template-rows: 300px 1fr;
	gap: 20px;
	padding: 50px;
}
input {
	height: 50px;
	border: none;
	background-color: #ffffff00;
	font-size: 25px;
	font-weight: normal;
	color: var(--text-color);
}
.photo {
	width: 300px;
	height: 300px;
	border-radius: 10%;
	overflow: hidden;
	margin-bottom: 20px;
	margin-right: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
}
h2 {
	font-family: "Manrope", sans-serif;
	font-size: 40px;
	margin: 0;
	display: inline-block;
}

.data {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.data-header {
	display: flex;
	gap: 20px;
	align-items: center;
}

.edit {
	width: 40px;
	height: 40px;
	border-radius: 5px;
	background-color: var(--secondary-color-transparent);
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	overflow: hidden;
}
.edit img {
	width: 30px;
	height: 30px;
}
</style>
