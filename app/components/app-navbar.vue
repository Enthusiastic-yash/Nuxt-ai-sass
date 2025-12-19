<template>
    <nav class="fixed h-15 w-full z-50 bg-white dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <UContainer class="flex h-full items-center justify-between">
            <Logo/>
            <slot name="center"/>
            <slot name="right"/>
        </UContainer>
    </nav>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>