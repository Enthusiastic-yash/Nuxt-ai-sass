<template>
    <div>
        <UContainer class="h-[calc(100dvh - 88px)] flex flex-col py-4">
            <PageHeading title='Resume Reviewer'
                description="Enhance your resume with AI-powered insights to boost your chances of getting hired.">
            </PageHeading>
            <UAlert v-if="error" color="error" variant="subtle" :title="error?.statusCode + ''"
                :description="error?.statusMessage + ''" class="mb-2" close>

            </UAlert>
            <div class="py-4 w-full max-w-full">
                <div class="flex flex-col space-y-4">
                    <div class="w-full">
                        <UCard>
                            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                                <UFormField name="resume" label="Resume File" description="PDF 5MB Max.">
                                    <UFileUpload v-model="state.resume" :multiple="false" accept=".pdf"
                                        class="min-h-48" />
                                </UFormField>

                                <UButton type="submit" label="Submit" color="neutral" class="cursor-pointer" />
                            </UForm>
                        </UCard>
                    </div>
                </div>
                <UCard v-if="content" :ui="{ body: 'p-3 sm:p-3 h-full' }" class="flex-1 w-full mt-4">
                    <div v-if="content" class="h-full">
                        <MDC :value="content" />
                    </div>
                    <div v-else-if="isLoading && !content" class="flex flex-col justify-center items-center">
                        Reviewing the resume...
                    </div>
                </UCard>
            </div>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { FetchError } from 'ofetch'

definePageMeta({
    layout: 'dashboard'
})

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const ACCEPTED_IMAGE_TYPES = ['application/pdf']

const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const schema = z.object({
    resume: z
        .instanceof(File, {
            message: 'Please select a resume file.'
        })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: `The resume file is too large. Please choose a resume file smaller than ${formatBytes(MAX_FILE_SIZE)}.`
        })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: 'Please upload a valid resume file (PDF).'
        })
})

type schema = z.output<typeof schema>

const state = reactive<Partial<schema>>({
    resume: undefined
})

console.log(state.resume);
const content = ref("")
const error = ref<AppError | null>()
const isLoading = ref(false);

const onSubmit = async (event: FormSubmitEvent<schema>) => {
    const formData = new FormData()
    if (event.data.resume instanceof File) {
        formData.append('resume', event.data.resume)

    }
    try {
        isLoading.value = true
        const data = await $fetch('/api/ai-tools/review-resume', {
            method: 'POST',
            body: formData
        })

        if (data) {
            content.value = data
        }
    } catch (e) {
        const err = e as FetchError
        error.value = getError(err)
    } finally {
        isLoading.value = false
    }
}

</script>

<style scoped></style>