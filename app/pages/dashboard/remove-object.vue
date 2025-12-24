<template>
    <div>
        <UContainer class="h-[calc(100dvh - 88px)] flex flex-col py-4">
            <PageHeading title='Object Removal'
                description="Easily erase unwanted elements form your photos using our precise AI object remover.">
            </PageHeading>
            <UAlert v-if="error" color="error" variant="subtle" :title="error?.statusCode + ''"
                :description="error?.statusMessage + ''" class="mb-2" close>

            </UAlert>
            <div class="py-4 w-full max-w-full flex flex-col xl:flex-row xl:justify-evenly gap-4">
                <div class="flex flex-wrap gap-5">
                    <UCard>
                        <UForm :schema="schema" :state="state" class="space-y-4 min-w-96" @submit="onSubmit">
                            <UFormField label="Describe object to remove in one word" name="object">
                                <UInput v-model="state.object" class="w-full"></UInput>
                            </UFormField>
                            <UFormField name="image" label="Image" description="JPG, GIF or PNG. 2MB Max.">
                                <UFileUpload v-model="state.image" accept="image/*" layout="grid"
                                    class="w-96 min-h-52" />
                            </UFormField>

                            <UButton type="submit" label="Submit" color="neutral" class="cursor-pointer" />
                        </UForm>
                    </UCard>
                </div>
                <UCard v-if="mappedImageUrl && !isLoading" :ui="{ body: 'p-3 sm:p-3 h-full' }"
                    class="flex-1 max-w-75 mt-4">
                    <div v-if="mappedImageUrl" class="h-full">
                        <NuxtImg :src="mappedImageUrl" />
                    </div>
                </UCard>
                <div v-if="isLoading" class="flex items-start space-x-2">
                    <USkeleton class="h-10 w-md rounded-sm" />
                </div>
            </div>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { FetchError } from 'ofetch'

definePageMeta({
    layout: 'dashboard',
     middleware: "auth"
})
const {toggleModalState} = useProModal();
const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const MIN_DIMENSIONS = { width: 200, height: 200 }
const MAX_DIMENSIONS = { width: 4096, height: 4096 }
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const schema = z.object({
    image: z
        .instanceof(File, {
            message: 'Please select an image file.'
        })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: `The image is too large. Please choose an image smaller than ${formatBytes(MAX_FILE_SIZE)}.`
        })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: 'Please upload a valid image file (JPEG, PNG, or WebP).'
        })
        .refine(
            (file) =>
                new Promise((resolve) => {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        const img = new Image()
                        img.onload = () => {
                            const meetsDimensions =
                                img.width >= MIN_DIMENSIONS.width &&
                                img.height >= MIN_DIMENSIONS.height &&
                                img.width <= MAX_DIMENSIONS.width &&
                                img.height <= MAX_DIMENSIONS.height
                            resolve(meetsDimensions)
                        }
                        img.src = e.target?.result as string
                    }
                    reader.readAsDataURL(file)
                }),
            {
                message: `The image dimensions are invalid. Please upload an image between ${MIN_DIMENSIONS.width}x${MIN_DIMENSIONS.height} and ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height} pixels.`
            }
        ),
    object: z.string().min(1, 'Object to remove is required')
})

type schema = z.output<typeof schema>

const state = reactive<Partial<schema>>({
    image: undefined,
    object: ''
})

const mappedImageUrl = ref("")
const error = ref<AppError | null>()
const isLoading = ref(false);

const onSubmit = async (event: FormSubmitEvent<schema>) => {
    const formData = new FormData()
    if (event.data.image instanceof File) {
        formData.append('image', event.data.image)
        formData.append('object', event.data.object)
    }
    try {
        isLoading.value = true
        const data = await $fetch('/api/cloudinary-tools/remove-object', {
            method: 'POST',
            body: formData
        })

        if (data) {
            mappedImageUrl.value = data
        }
        await refreshNuxtData('userData')
    } catch (e) {
        const err = e as FetchError
         if(err.statusCode === 401){
            navigateTo('/auth/login')
        }
          if(err.statusCode === 403){
            toggleModalState(true)
        }
        error.value = getError(err)
    } finally {
        isLoading.value = false
    }
}

</script>

<style scoped></style>