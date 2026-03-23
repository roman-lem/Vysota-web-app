
<script setup>

    const emit = defineEmits(['authorized'])

    

</script>

<template>
    <div class="login-wrapper">
        <RouterView />
    </div>
</template>

<style scoped>
.login-wrapper {
    --primary-color: #005C7A;
    --secondary-color: #14B8A6;
    --secondary-color-transparent: rgba(20, 184, 166, 0.3);
    --background-color: #F8FAFC;
    --text-color: #1E293B;
    
    width: 400px;
    height: 100vh;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


</style>