<template>
    <u-container class="flex items-center justify-center sm:p-4">
        <UCard class="w-full max-w-md">
            <template #header>
                <div class="p-4">
                    <h1 class="text-xl font-semibold pb-4 text-center">
                        Create your account
                    </h1>
                    <div class="space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <UButton icon="mdi:google" color="neutral" class="justify-center" :loading="false"
                                :disabled="false" variant="outline"
                                @click="signIn.social({ provider: 'google', callbackURL: '/' })">Google</UButton>

                            <UButton icon="mdi:github" color="neutral" class="justify-center" :loading="false"
                                :disabled="false" variant="outline"
                                @click="signIn.social({ provider: 'github', callbackURL: '/' })">Github</UButton>
                        </div>
                        <USeparator label="or" />
                        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                            <UFormField label="Name" name="name">
                                <UInput v-model="state.name" class="w-full" required placeholder="Enter your name" />
                            </UFormField>
                            <UFormField label="Email" name="email">
                                <UInput v-model="state.email" type="email" class="w-full" required
                                    placeholder="Enter your email" />
                            </UFormField>

                            <UFormField label="Password" name="password">
                                <UInput v-model="state.password" type="password" class="w-full" required
                                    placeholder="Enter your password" />
                            </UFormField>
                            <UFormField label="Confirm password" name="confirmPassword">
                                <UInput v-model="state.confirmPassword" type="password" class="w-full" required
                                    placeholder="confirm password" />
                            </UFormField>


                            <UButton type="submit" color="primary" block>
                                Submit
                            </UButton>
                            <div class="text-center text-sm">
                                Already have an account ?
                                <u-button variant="link" color="primary" :disabled="false" to="/auth/login"
                                    class="ml-2">
                                    Sign In
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
const schema = z.object({
    name: z.string().trim().min(3, "Name must be at least 3 characters long"),
    email: z.email('Please enter a valid email address.'),
    password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ['confirmPassword']
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
})

const { signUp, signIn } = useAuth()
async function onSubmit(event: FormSubmitEvent<Schema>) {
    const { error } = await signUp.email({
        name: event.data.name,
        email: event.data.email,
        password: event.data.password,
        callbackURL: '/dashboard'
    })
    console.log(error);
}


</script>

<style scoped></style>