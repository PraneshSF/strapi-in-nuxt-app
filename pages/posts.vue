<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
// import Card from "./../components/Card.vue";

const POSTS_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, image, publishedAt, body}`;

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>

<template>
  <main class="container mx-auto min-h-screen mix-w-l p-8 flex flex-col justify-content-center align-items-center">
    <a href="/" class="hover:underline">&larr; Back to Home</a>
    <h1 class="text-2xl font-bold mb-8 justify-center flex">Posts</h1>
    <ul class="flex flex-row gap-y-4">
      <li v-for="post in posts" :key="post._id" class="hover:underline">
        <nuxt-link :to="`/${post.slug.current}`">
            <div class="grid grid-cols-3 md:grid-cols-3">
              <Card
                :imageUrl="urlFor(post?.image)?.width(850).height(310).url()"
                :date="new Date(post.publishedAt).toLocaleDateString()"
                :title="post.title"
                :description="post.body[0]?.children[0]?.text"
              />
            </div>
        </nuxt-link>
      </li>
    </ul>
  </main>
</template>