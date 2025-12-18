<template>
    <div>
        <DashboardSidebar></DashboardSidebar>
        <!-- sidebar -->
        <div class="p-2 h-screen transition-all duration-300 overflow-hidden flex flex-col ml-0 sm:ml-72">
            <!-- navbar -->
            <DashboardNavbar></DashboardNavbar>
            <div class="p-2 pt-16 flex-1 overflow-auto">
                <slot />
            </div>
        </div>
    </div>
    <pro-modal />
</template>

<script setup lang="ts">


</script>

<style scoped></style>