<template>
    <div>
        <UModal v-model:open="isOpen" title="Upgrade to pro plan">
            <template #body>
                <div class="p-4">
                    <div class="text-center flex flex-col spcae-y-2">
                        <NuxtLink v-for="tool in aiTools" :key="tool.path" :to="tool.path">
                            <UCard :ui="{ body: 'p-3 sm:p-3' }">
                                <div class="w-full flex items-center justify-between">
                                    <div class="flex items-center gap-x-4">
                                        <UButton :icon="tool.icon" size="md" color="primary" variant="subtle" />
                                        <div class="font-semibold">
                                            {{ tool.title }}
                                        </div>

                                    </div>
                                    <Icon name="lucide-check" class="w-5 h-5 text-primary" />
                                </div>
                            </UCard>
                        </NuxtLink>
                        <UButton  icon="i-lucide-zap" color="error" class="mt-4 p-3  justify-center"
                            @click="upgradeToPro">
                            Upgrade
                        </UButton>
                    </div>
                </div>
            </template>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import { aiTools } from '~~/constants/tools';
const { isOpen, toggleModalState } = useProModal()
const { upgradeToPro } = useAuth()
</script>

<style scoped></style>