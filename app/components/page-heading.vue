<template>
    <div class="mb-8 space-y-1">
        <h2 class="text-2xl font-bold">
            {{ title }}
        </h2>
        <p class="text-muted font-light text-sm md:text-lg">
            {{ description }}
        </p>
    </div>
</template>

<script setup lang="ts">
interface HeadingProps {
    title: string;
    description: string;
}
const props = defineProps<HeadingProps>()
</script>

<style scoped></style>