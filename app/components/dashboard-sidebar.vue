<template>
    <div>
        <aside class="fixed top-0 left-0 transition-all duration-300 hidden sm:block w-72">
            <div class="h-screen flex flex-col border-r border-gray-200 dark:border-gray-800">
                <div class="h-16 px-5 flex item-center">
                    <logo />
                </div>
                <div class="flex-1 overflow-auto">
                    <u-separator></u-separator>
                    <div class="px-3 py-3">
                        <UNavigationMenu :items="sideBarRoutes" orientation="vertical"
                            :ui="{ label: 'py-2.5', link: 'py-3' }">
                        </UNavigationMenu>
                    </div>
                </div>
            </div>
        </aside>
    </div>
</template>

<script setup lang="ts">
import { sideBarRoutes } from "~~/constants/tools"
</script>

<style scoped></style>