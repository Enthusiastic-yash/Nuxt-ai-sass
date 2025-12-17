<template>
    <div>
        <UContainer class="h-[calc(100dhv-88px)] flex flex-col py-4">
            <PageHeading title="Settings" description="Manage account settings" />
            <div class="flex flex-col space-y-4">
                <div class="text-muted text-sm">
                    {{ subscriptionMessage }}
                </div>
                <div class="flex gap-4">
                    <UButton v-if="userData && isProUser" :disabled="status === 'pending'"
                        :to="userData.customerPortalUrl.customerPortalUrl">
                        Manage Subscription
                    </UButton>
                    <UButton v-else icon="i-lucide-zap" color="error" :disabled="status === 'pending'"
                        @click="upgradeToPro">
                        Upgrade
                    </UButton>

                </div>
            </div>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard'
})

const { upgradeToPro } = useAuth()
const { data: userData, status } = useFetch('/api/user', {
    key: 'userData'
})

const isProUser = computed(() => userData.value?.subscription)

const subscriptionMessage = computed(() => {
    const subscription = userData.value?.subscription;
    console.log(subscription);
    if (!subscription) {
        return "You are currently on the **Free Plan**.";
    }
    // --- Determine Next Date ---
    const nextBillingDate = subscription.endsAt ? new Date(subscription.endsAt) : null;
    // Safety check: If endsAt is missing (highly unlikely for active sub)
    if (!nextBillingDate) {
        // This should not happen, but provides a clean fallback instead of "unknown"
        return "You are currently on the **Pro Plan**. Please check your billing portal for the next renewal date.";
    }
    const endDateString = nextBillingDate.toDateString();
    // --- Check for Cancellation ---
    if (subscription.cancelAtPeriodEnd) {
        // The user has scheduled cancellation; the date shown is the final access date.
        return `You are currently on the **Pro Plan**, but your subscription will be canceled on **${endDateString}**.`;
    }

    // --- Active & Renewing ---
    // User is active and the next billing date is the end of the current period.
    return `You are currently on the **Pro Plan**. Your next billing date is **${endDateString}**.`;
});



</script>

<style scoped></style>