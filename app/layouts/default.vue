<template>
    <div class="min-h-screen flex flex-col items-center relative">
        <!-- navbar -->
            <AppNavbar>
                <template #right>
                   <theme-toggler></theme-toggler>
                </template>
            </AppNavbar>
        <div class="flex flex-1 pt-16 w-full justify-center">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>