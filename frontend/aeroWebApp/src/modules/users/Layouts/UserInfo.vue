<script setup>
    import { ref } from 'vue'
    import { useRoute } from 'vue-router';
    import { Axios } from 'axios';

    const axios = new Axios()
    const student = ref(null)
    const route = useRoute()
    const id = route.params.id
    const editable = ref(false)

    student.value = getStudentById(id)
    
</script>


<template>
    <div class="selected-student" v-if="student != null">
        <div class="photo">
            <img :src="student.photo || '../../../public/default.jpg'" alt="Фото студента">
        </div>
        <div class="data">
            <div class="data-header">
                <h2>{{ student.name }}</h2>
                <div class="edit">
                    <img src="../../../public/edit.png" alt="Редактировать">
                </div>
            </div>
            <div class="data-container">
                <input type="text" name="" id="" :placeholder="`Имя: ${student['name']}`">
            </div>
        </div>
    </div>
</template>

<style scoped>
    .selected-student {
        box-sizing: border-box;
        font-family: "Manrope", sans-serif;
        display: grid;
        grid-template-columns: 300px 1fr;
        grid-template-rows: 300px 1fr;
        gap: 20px;
        padding: 50px;
    }
    input {
        width: 200px;
        height: 50px;
        border: none;
        background-color: #FFFFFF00;
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