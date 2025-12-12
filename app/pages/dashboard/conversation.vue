<template>
    <div>
        <UContainer class="h-[calc(100dvh - 88px)] flex flex-col py-4">
            <PageHeading title='conversation'
                description="Engage in natural, intelligent conversation with AI for brainstorming , questions and casual chat">
            </PageHeading>
            <UAlert v-if="error" color="error" variant="subtle" :title="error?.statusCode + ''"
                :description="error?.statusMessage + ''" class="mb-2" close>

            </UAlert>

            <UCard v-if="messages.length" variant="subtle" class="flex-1 overflow-y-auto space-y-4 px-4 py-2">
                <div class="flex flex-col gap-y-4">
                    <div v-for="(message, index) in messages" :key="index" class="flex items-start space-x-2"
                        :class="[message.role === 'user' ? 'justify-end' : 'justify-start']">

                        <div class="flex items-start space-x-4">
                            <UButton size="sm" variant="soft" class="rounded-full"
                                :icon="message.role === 'user' ? 'lucide:user' : 'lucide:cpu'"
                                :color="message.role === 'user' ? 'primary' : 'success'">

                            </UButton>
                        </div>
                        <UCard :ui="{ body: 'p-3 sm:p-3' }" class="relative group">
                            <div class="flex justify-end" v-if="message.role !== 'user'">
                                <UButton size="sm" @click="copy(message.content, index)"
                                    class="flex justify-end rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    variant="soft" color="primary"
                                    :icon="copiedId === index ? 'lucide:check' : 'lucide:copy'">
                                </UButton>
                            </div>
                            <div class="text-sm max-w-prose">
                                <MDC :value="message.content" />
                            </div>
                        </UCard>
                    </div>
                    <!-- 👉 Skeleton while AI is generating -->
                    <div v-if="isLoading" class="flex items-start space-x-2">
                        <USkeleton class="h-10 w-1/2 rounded-full" />
                    </div>
                </div>
            </UCard>

            <!-- chat input -->
            <div class="pt-4">
                <UForm @submit="sendMessage" :schema="schema" :state="state" class="space-y-4">
                    <div class="flex space-x-2 w-full">
                        <UFormField class="flex-1" name="userPrompt">
                            <U-textarea v-model="state.userPrompt" :rows="1" class="w-full" placeholder="Ask anything"
                                autoresize></U-textarea>
                        </UFormField>
                        <UButton type="submit" icon="lucide-arrow-right" color="primary">
                        </UButton>
                    </div>
                </UForm>
            </div>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { FetchError } from 'ofetch'

const { copiedId, copy } = useClipboard()
definePageMeta({
    layout: 'dashboard'
})
const schema = z.object({
    userPrompt: z.string().min(1, 'Prompt is required')
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
    userPrompt: ''
})

const error = ref<AppError | null>()
const isLoading = ref(false);
const sendMessage = async (event: FormSubmitEvent<Schema>) => {
    try {
        isLoading.value = true
        messages.value.push({
            role: 'user',
            content: event.data.userPrompt.trim()
        })

        const data = await $fetch('/api/ai-tools/conversation', {
            method: 'POST',
            body: {
                message: messages.value
            }
        })

        if (data) {
            messages.value.push({
                role: 'system',
                content: data
            })
            await refreshNuxtData('userData')
            state.userPrompt = ""
        }
    } catch (e) {
        const err = e as FetchError
        error.value = getError(err)
    } finally {
        isLoading.value = false
    }
}

type Message = {
    role: 'user' | 'system'
    content: string
}

const messages = ref<Message[]>([])
</script>

<style scoped></style>