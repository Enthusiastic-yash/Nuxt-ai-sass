<template>
    <div class="h-full">
        <UContainer>
            <div class="flex flex-col items-center justify-center text-center py-32 sm:py-48 lg:py-56">
                <h1 class="text-3xl sm:text-5xl font-bold tracking-tight">
                    AI Tools Built to Boost Your Productivity
                </h1>
                <p class="mt-4 text-lg max-w-xl">
                    A complete suite of AI tools to help you create, code, write, edit images, and improve your resume.
                </p>
                <div class="mt-6">
                    <div class="flex gap-4 flex-wrap">
                        <UButton to="/dashboard" icon="i-lucide-arrow-up-right" size="lg" color="primary">
                            Get started
                        </UButton>
                        <UButton to="/dashboard" icon="i-lucide-rocket" size="lg" color="neutral" variant="outline"
                            :ui="{ leadingIcon: 'text-primary' }">
                            Explore tools
                        </UButton>
                    </div>
                </div>
                <div class="mt-6 flex flex-wrap items-center gap-4">
                    <UAvatarGroup size="xl">
                        <UAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
                        <UAvatar src="https://github.com/romhml.png" alt="Romain Hamel" />
                        <UAvatar src="https://github.com/noook.png" alt="Neil Richter" />
                    </UAvatarGroup>
                    <p>
                        Love by 10K people
                    </p>
                </div>
            </div>
        </UContainer>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>