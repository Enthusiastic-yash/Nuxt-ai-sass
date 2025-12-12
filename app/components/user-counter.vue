<template>
    <div class="mt-auto">
        <u-separator></u-separator>
        <div class="px-3">
            <div class="py-6 px-2">
                <div class="text-sm mb-4 space-y-2">
                    <p>{{ userData ? userData.userApiLimit : 0 }} / {{ maxCount }} Free Generations</p>
                    <u-progress v-model="progress"></u-progress>
                </div>
                <UButton icon="i-lucide-zap" color="error" class="w-full justify-center cursor-pointer">
                    upgrade
                </UButton>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { maxCount } from "~~/shared/utils/user-api-limit"
const { data: userData, status } = useFetch('/api/user', {
    key: 'userData'
})
const progress = computed(() => {
    if (userData.value) {
        return (userData.value.userApiLimit / maxCount) * 100
    } else {
        return 0;
    }
})
</script>

<style scoped></style>
