<template>
  <header class="bg-white shadow-md px-6 py-4 flex justify-between items-center">
    <!-- Logo -->
    <div class="text-2xl font-bold text-black">
      <span class="text-green-600">spring</span>
    </div>

    <!-- Navigation Links -->
    <nav class="hidden md:flex space-x-6 text-gray-700">
      <a href="#" class="hover:text-green-500">Products</a>
      <a href="#" class="hover:text-green-500">Reviews</a>
      <a href="#" class="hover:text-green-500">Blog</a>
      <a href="#" class="hover:text-green-500">About</a>
      <a href="#" class="hover:text-green-500">Help Centre</a>
      <a href="#" class="hover:text-green-500">Français</a>
    </nav>

    <!-- Mobile Menu Icon -->
    <button @click="toggleMenu" class="md:hidden text-gray-700">
      <font-awesome-icon :icon="menuOpen ? 'times' : 'bars'" class="text-2xl"/>
    </button>

    <!-- Mobile Menu -->
    <div v-if="menuOpen" class="absolute top-16 left-0 w-full bg-white shadow-md p-4 md:hidden">
      <a href="#" class="block py-2 hover:text-green-500">Products</a>
      <a href="#" class="block py-2 hover:text-green-500">Reviews</a>
      <a href="#" class="block py-2 hover:text-green-500">Blog</a>
      <a href="#" class="block py-2 hover:text-green-500">About</a>
      <a href="#" class="block py-2 hover:text-green-500">Help Centre</a>
      <a href="#" class="block py-2 hover:text-green-500">Français</a>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}
</script>

<style scoped>
</style>
