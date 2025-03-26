<template>
  <header class="bg-white shadow-md px-6 py-4 flex justify-between items-center">
    <!-- Logo -->
    <div class="text-2xl font-bold text-black">
      <span class="text-green-600">spring</span>
    </div>

    <!-- Navigation Links -->
    <nav class="hidden md:flex space-x-6 text-gray-700">
      <a v-for="link in headerData.links" :href="link.Link || '#'" :key="link.id" class="hover:text-green-500">{{link.Label}}</a>
      <!-- <a href="#" class="hover:text-green-500">Français</a> -->
    </nav>

    <!-- Mobile Menu Icon -->
    <button @click="toggleMenu" class="md:hidden text-gray-700">
      <font-awesome-icon :icon="menuOpen ? 'times' : 'bars'" class="text-2xl"/>
    </button>

    <!-- Mobile Menu -->
    <div v-if="menuOpen" class="absolute top-16 left-0 w-full bg-white shadow-md p-4 md:hidden">
      <a v-for="link in headerData.links" :href="link.Link || '#'" :key="link.id" class="block py-2 hover:text-green-500">{{link.Label}}</a>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';

const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

const route = useRoute(); // Get query params safely
const config = useRuntimeConfig(); 
const lang = computed(() => route.query.lang || 'en');

const { data: headerData, pending, error } = await useAsyncData('headerData', async () => {
  const langId = lang.value === 'en' ? 'y7o0ocuzkyivi7xrg6scrgfv' : 'jyd73ado4k3w8h1jef0kfgrq';
  const response = await $fetch(`${config.public.base_url}/headers/${langId}?populate=*`, {
    headers: { Authorization: `Bearer ${config.public.accessToken}` },
  });
  return response?.data || {}; // Ensure it never returns undefined
});
</script>

<style scoped>
</style>
