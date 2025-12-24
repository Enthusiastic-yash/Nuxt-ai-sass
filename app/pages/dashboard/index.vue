<template>
   <div>
        <UContainer>
                <div class="py-4 w-full max-w-fit">
            <PageHeading  title="Explore the power of Ai" description="Access powerful AI tools for chatting, coding, writing, image editing, and resume improvement—all in one place." />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <NuxtLink v-for="tool in aiTools" :key="tool.path" :to="tool.path">
                <UCard class="h-full">
                    <div class="mb-4 flex items-center">
                        <UIcon :name="tool.icon" class="mr-2"></UIcon>
                        <span class="font-semibold">{{ tool.title }}</span>
                    </div>
                    <p >
                        {{ tool.description }}
                    </p>
                </UCard>
            </NuxtLink>
        </div>
        </UContainer>
   </div>
</template>

<script setup lang="ts">
import { aiTools } from '~~/constants/tools';

definePageMeta({
    layout: 'dashboard',
    middleware: "auth"
})
</script>

<style scoped></style>