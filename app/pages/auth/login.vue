<template>
    <u-container class="flex items-center justify-center sm:p-4">
        <UCard class="w-full max-w-md">
            <template #header>
                <div class="text-center p-4">
                    <h1 class="text-xl font-semibold pb-4">
                        Welcome to Nuxt AI
                    </h1>
                    <div class="space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <UButton icon="mdi:google" color="neutral" class="justify-center" :loading="false"
                                :disabled="false" variant="outline"
                                @click="signIn.social({ provider: 'google', callbackURL: '/dashboard' })">Google</UButton>

                            <UButton icon="mdi:github" color="neutral" class="justify-center" :loading="false"
                                :disabled="false" variant="outline"
                                @click="signIn.social({ provider: 'github', callbackURL: '/dashboard' })">
                                Github
                            </UButton>
                        </div>
                        <USeparator label="or" />
                        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">

                            <UFormField label="Email" name="email">
                                <UInput v-model="state.email" type="email" class="w-full" required
                                    placeholder="Enter your email" />
                            </UFormField>

                            <UFormField label="Password" name="password">
                                <UInput v-model="state.password" type="password" class="w-full" required
                                    placeholder="Enter your password" />
                            </UFormField>

                            <UButton type="submit" color="primary" block>
                                Sign In
                            </UButton>
                            <div class="text-center text-sm">
                                Don't have an account ?
                                <u-button variant="link" color="primary" :disabled="false" to="/auth/register"
                                    class="ml-2">
                                    Create Now
                                </u-button>
                            </div>
                        </UForm>
                    </div>
                </div>

            </template>
        </UCard>
    </u-container>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
    middleware:'guest'
})

const toast = useToast()

const schema = z.object({
    email: z.email('Please enter a valid email address.'),
    password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
    email: '',
    password: '',
})

const { signIn } = useAuth()
async function onSubmit(event: FormSubmitEvent<Schema>) {
    toast.clear()
    const { error , data } = await signIn.email({
        email: event.data.email,
        password: event.data.password,
        callbackURL: '/dashboard'
    })
   if(data){
    toast.add({
            title:'success',
            description: 'Logged in successfully',
            color:'success'
        })
   }
    if(error){
        toast.add({
            title:'error',
            description: error?.message,
            color:'error'
        })
    }
}


</script>

<style scoped></style>