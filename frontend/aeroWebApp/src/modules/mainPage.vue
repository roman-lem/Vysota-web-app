<script setup>
    import NavigationSection from './navigation.vue'
    import { RouterView } from 'vue-router';

</script>



<template>
    <div class="main-page-wrapper">
        <div class="service-wrapper">
            <navigation-section></navigation-section>
            <div class="content">
                <RouterView />
            </div>
        </div>
    </div>
</template>


<style scoped>

    .main-page-wrapper{
        --primary-color: #005C7A;
        --secondary-color: #14B8A6;
        --secondary-color-transparent: rgba(20, 184, 166, 0.3);
        --background-color: #daebf5;
        --text-color: #1E293B;

        font-family: "Lexand", sans-serif;
        width: 100%;
    }

    .service-wrapper {
        padding: 0px 100px;
        width: 80%;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 250px 1fr;
        gap: 50px;
        background-color: var(--background-color);
        height: 100vh;
    }
</style>