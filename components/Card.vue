<template>
  <div class="shadow-lg rounded-lg w-72">
    <div 
      class="h-48 bg-cover bg-center "
      :style="{ backgroundImage: `url(${imageUrl})` }"
    ></div>
    <div class="p-4">
      <div class="flex items-center text-sm text-gray-500 mb-2">
        <span class="text-cyan-500 font-semibold mr-2">{{ category }}</span>
        <span>{{ date }}</span>
      </div>
      <h3 class="text-lg font-bold text-gray-800 mb-2">
        {{ title }}
      </h3>
      <p class="text-gray-600 mb-4">
        {{ description }}
      </p>
      <button 
        class="bg-purple-100 text-purple-700 px-4 py-2 rounded-full hover:bg-purple-200 transition-colors"
      >
        Read More
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SanityImageSource } from '@sanity/image-url/lib/types/types.js';
import imageUrlBuilder from "@sanity/image-url";

import { defineProps } from 'vue'
import type { content } from '#tailwind-config';

const props = defineProps({
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>