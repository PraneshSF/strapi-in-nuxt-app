<script setup>
import { useRoute } from 'vue-router';

const config = useRuntimeConfig();
const route = useRoute(); // Get query params safely

const lang = computed(() => route.query.lang || 'en');

// Define landingPage as a reactive state
const { data: landingPage, pending, error } = await useAsyncData('landingPage', async () => {
  try {
    const langId = lang.value === 'en' ? 'jpgv6r7xi6zg7ijm3lfk7hqz' : 't6m91ylztdqbvuxxai8dq1ml';
    const response = await $fetch(`${config.public.base_url}/landing-pages/${langId}?populate[overviews][populate]=taglines&populate=Testimonials`, {
      headers: { Authorization: `Bearer ${config.public.accessToken}` },
    });
    return response?.data || {}; // Ensure default return value
  } catch (err) {
    console.error("Error fetching landing page:", err);
    return {}; // Fallback to empty object
  }
});

// Function to convert markdown-style links to proper anchor tags
const formatLinks = computed(() => (text) => {
  return text?.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 font-semibold">$1</a>') || '';
});
</script>


<template>
  <section v-if="!pending && landingPage?.HeroHeading"
    class="bg-gradient-to-b from-gray-100 to-white py-16 px-6 text-center">
    <!-- Hero Section -->
    <h1 class="text-4xl md:text-5xl font-bold text-gray-900" v-html="landingPage?.HeroHeading"></h1>
    <p class="mt-4 text-gray-600">{{ landingPage?.HeroDescription }}</p>

    <!-- Input and Button -->
    <div class="mt-6">
      <input type="email" :placeholder="landingPage.EmailPlaceHolder || 'enter your mail'" class="border p-3 rounded-lg w-full md:w-1/3" />
    </div>

    <div class="flex justify-center items-center mt-4 space-x-2">
      <input type="checkbox" class="w-5 h-5">
      <p class="text-sm text-gray-600">
        <span v-html="formatLinks(landingPage?.RecivePromotionPhrase)"></span>
      </p>
    </div>

    <button class="bg-purple-600 text-white font-bold px-6 py-3 rounded-lg mt-4">
      {{ landingPage?.ButtonLabel }}
    </button>

    <!-- Section Heading -->
    <p class="mt-4 text-gray-800 font-semibold" v-html="landingPage?.SectionHeading"></p>

    <!-- CTA Button -->
    <a :href="landingPage?.SectionCTALink" class="text-blue-600 font-semibold">
      {{ landingPage?.SectionCTALabel }}
    </a>
    <!-- Reviews -->
    <section class="grid grid-cols-3 justify-between items-center mt-8 gap-8 w-full">
      <div v-for="testimonial in landingPage?.Testimonials" :key="testimonial.id"
        class="bg-white p-4 rounded-lg shadow-md w-full h-full">
        <p class="text-gray-600">{{ testimonial.ClientName }}</p>
        <p class="text-gray-300">{{ testimonial.ClientLocation }}</p>
        <p class="text-gray-800 font-semibold mt-2" v-html="testimonial.Review"></p>
      </div>
    </section>

    <section v-for="overview in landingPage?.overviews" :key="overview.id"
      class="flex flex-col gap-4 w-full items-start mt-8">
      <h2 class="text-2xl font-bold text-gray-900">{{ overview.heading }}</h2>
      <p class="text-gray-600" v-html="overview.description"></p>
      <ul>
        <li v-for="tagline in overview.taglines" :key="tagline.id" class="flex items text-black"> ✅
          {{ tagline.Tagline }}
        </li>
      </ul>
    </section>

    <h2 class="text-4xl md:text-5xl font-bold text-gray-900" v-html="landingPage?.BottomSectionHeading"></h2>

    <button class="bg-green-600 text-white font-bold px-6 py-3 rounded-lg mt-4">
      {{ landingPage?.BottomSectionCTALabel }}
    </button>

  </section>

  <!-- Loading State -->
  <p v-else-if="pending" class="text-center text-gray-600 py-10">Loading...</p>

  <!-- Error State -->
  <p v-else class="text-center text-red-500 py-10">Failed to load content.</p>
</template>
