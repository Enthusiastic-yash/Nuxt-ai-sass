<template>
    <div class="w-full fixed h-16 top-0 left-0   border-b border-gray-200 dark:border-gray-800">
        <u-container class=" w-full flex h-full items-center justify-between sm:justify-end">
            <UDrawer v-model:open="open" direction="left" :handle="false"
                :ui="{ header: 'flex item-center justify-between h-16 px-5 ', container: 'p-0 w-72 gap-0' }">

                <UButton color="neutral" variant="subtle" trailing-icon="i-lucide-menu" class="sm:hidden" />
                <template #header>
                    <logo />
                    <u-button color="neutral" variant="ghost" trailing-icon="bitcoin-icons:cross-filled"
                        @click="open = false"></u-button>
                </template>
                <template #body>
                    <div class="flex flex-col ">
                        <div class="flex-1 overflow-auto">
                            <u-separator></u-separator>
                            <div class="px-3 py-3">
                                <UNavigationMenu :items="sideBarRoutes" orientation="vertical"
                                    :ui="{ label: 'py-2.5', link: 'py-3' }" class="data-orientation-vertical:w-full">
                                </UNavigationMenu>
                            </div>
                        </div>
                        <!-- user counter -->
                        <UserCounter />
                    </div>
                </template>
            </UDrawer>
            <UDropdownMenu v-if="user" :items="items" :content="{
                align: 'start',
                side: 'bottom',
                sideOffset: 8
            }" :ui="{
                content: 'w-48'
            }">
                <UButton label="Open" :icon="!user?.image ? 'lucide-circle-user-round' : undefined" color="neutral" variant="outline">
                    <UAvatar v-if="user && user.image"
                    :src="user.image"
                    :alt="user.name"
                    size="sm"
                    />
                     <span>
                           {{ user?.name }}
                           <UBadge class="ml-2" v-if="userData && userData.subscription" label="Pro"/>
                     </span>
                   
                </UButton>
                  
            </UDropdownMenu>
            <ThemeToggler />
        </u-container>
    </div>
</template>

<script setup lang="ts">
import { sideBarRoutes } from "~~/constants/tools"
import type { DropdownMenuItem } from '@nuxt/ui'

const open = ref(false)
const { logout , user } = useAuth()
const { data: userData } = useFetch('/api/user', {
    key: 'userData'
})
const items = ref<DropdownMenuItem[]>([
    {
        label: 'Profile',
        icon: 'i-lucide-user'
    },
    {
        label: 'Billing',
        icon: 'i-lucide-credit-card',
        to: '/dashboard/setting'
    },
    {
        label: 'Logout',
        icon: 'i-lucide-log-out',
        onSelect: async (e: Event) => {
            await logout()
        }
    }
])
</script>

<style scoped></style>