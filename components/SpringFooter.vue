<template>
  <footer class="bg-white px-6 py-4 mt-1">
 
    <section class="flex justify-between gap-4 text-gray-700">
   <!-- Logo -->
      <div class="text-2xl font-bold text-black">
        <span class="text-green-600">spring</span>
      </div>

      <!-- Navigation Links -->
      <section class="grid grid-cols-4 gap-20">
        <div v-for="links in footerData.links_collections" class="flex flex-col gap-4 text-gray-700" :key="links.id">
          <b>{{links.CollectionName}}</b>
          <a v-for="link in links.links" :href="link.Link || '#'" :key="link.id" class="hover:text-green-500">{{link.Label}}</a>
        </div>
      </section>
    </section>
    <div v-html="footerData.FooterContent" class="text-gray-500"></div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

const config = useRuntimeConfig(); 

const { data: footerData, pending, error } = await useAsyncData('footerData', async () => {
  const response = await $fetch(`${config.public.base_url}/footer?populate[links_collections][populate]=links`, {
    headers: { Authorization: `Bearer ${config.public.accessToken}` },
  });
  return response?.data || {}; // Ensure it never returns undefined
});
</script>

<style scoped>
</style>
