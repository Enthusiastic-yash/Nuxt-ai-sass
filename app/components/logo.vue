<template>
    <ClientOnly>
        <NuxtLink to="/" class="flex item-center gap-2">
            <span class="font-bold text-xl flex items-center">
                <NuxtImg src="/logo.svg" class="w-6 h-6 mr-1"
                    :class="[colorMode.value === 'light' ? '' : 'invert-100']">
                </NuxtImg>
                Nuxt AI
            </span>
        </NuxtLink>
    </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
</script>

<style scoped></style>