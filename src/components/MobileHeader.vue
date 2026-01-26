<template>
  <div
    class="
      h-12
      px-4
      flex
      items-center
      justify-between
      border-b
      dark:border-gray-800
      bg-white
      dark:bg-gray-900
      z-20
    "
  >
    <div class="flex items-center gap-2">
      <button
        class="p-2 -ms-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        @click="toggleSidebar"
      >
        <feather-icon name="menu" class="w-5 h-5 dark:text-gray-200" />
      </button>
      <h1 class="text-lg font-semibold dark:text-gray-100 truncate max-w-[200px]">
        {{ companyName }}
      </h1>
    </div>
    <div class="flex items-center gap-2">
      <button
        class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        @click="search"
      >
        <feather-icon name="search" class="w-5 h-5 dark:text-gray-200" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toggleSidebar } from 'src/utils/ui';

defineProps<{
  companyName: string;
}>();

const search = () => {
  // Trigger search logic
};
</script>
