<template>
    <div>
        <UContainer class="h-[calc(100dvh - 88px)] flex flex-col py-4">
            <PageHeading title='AI Article Writer'
                description="Craft well structured and engaging article on any subject">
            </PageHeading>
            <UAlert v-if="error" color="error" variant="subtle" :title="error?.statusCode + ''"
                :description="error?.statusMessage + ''" class="mb-2" close>

            </UAlert>
            <div class="py-4 w-full max-w-full">
                <div class="flex flex-col space-y-2">
                    <UCard>
                        <UForm :schema="schema" :state="state" class="space-y-4" @submit="generateArticle">
                            <UFormField name="articleTitle" label="Article Title">
                                <UInput v-model="state.articleTitle" class="w-full"></UInput>
                            </UFormField>
                            <UFormField name="articleLength" label="Article Length">
                                <USelect v-model="state.articleLength" :items="articleItems" class="w-full"></USelect>
                            </UFormField>
                            <UButton type="submit" label="submit" class="cursor-pointer" color="neutral">Submit
                            </UButton>
                        </UForm>
                    </UCard>
                </div>
                <UCard v-if="content" :ui="{ body: 'h-[calc-(100dvh-350px)]' }" class=" mt-4 relative group">
                    <div class="flex justify-end" v-if="content">
                        <UButton size="sm" @click="copy(content)"
                            class="flex justify-end rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            variant="soft" color="primary" :icon="isCopied ? 'lucide:check' : 'lucide:copy'">
                        </UButton>
                    </div>
                    <div v-if="Content" class="h-full p-4">
                        <MDC :value="content" />
                    </div>
                </UCard>
                <div v-if="isLoading" class="flex items-start space-x-2 mt-4">
                    <USkeleton class="h-10 w-full rounded-sm" />
                </div>
            </div>



        </UContainer>
    </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { FetchError } from 'ofetch'
import { Content } from 'openai/resources/containers/files/content.mjs'
definePageMeta({
    layout: 'dashboard'
})

const {toggleModalState} = useProModal();
const { isCopied, copy } = useClipboard()

const schema = z.object({
    articleTitle: z.string().min(1, 'Title is required'),
    articleLength: z.number()
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
    articleTitle: '',
    articleLength: 500
})

const content = ref("")

const error = ref<AppError | null>()
const isLoading = ref(false);
const generateArticle = async (event: FormSubmitEvent<Schema>) => {
    try {
        isLoading.value = true
        const data = await $fetch('/api/ai-tools/generate-article', {
            method: 'POST',
            body: {
                articleTitle: event.data.articleTitle,
                articleLength: event.data.articleLength
            }
        })

        if (data) {
            content.value = data
            state.articleTitle = ""
            state.articleLength = 500
        }
        await refreshNuxtData('userData')
    } catch (e) {
        const err = e as FetchError
        if(err.statusCode === 403){
            toggleModalState(true)
        }
        error.value = getError(err)
    } finally {
        isLoading.value = false
    }
}

const articleItems = ref([
    {
        label: 'Short(500-800 words)',
        value: 500
    },
    {
        label: 'Medium(800-1200 words)',
        value: 1200
    },
    {
        label: 'Long(1200+ words )',
        value: 1600
    }
])
</script>

<style scoped></style>