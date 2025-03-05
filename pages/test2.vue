<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const POST_QUERY = groq`*[_type == "post" && _id == "ff97e376-46b0-4b97-b628-9478f44feaab"]{ _id, title, slug, image , body, publishedAt}[0]`;
const { params } = useRoute();

const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, params);
const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

</script>

<template>
  <main
    v-if="post"
    class="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4"
  >
    <a href="/posts" class="hover:underline">&larr; Back to posts</a>
    <img
      v-if="post.image"
      :src="urlFor(post?.image)?.width(850).height(310).url()"
      :alt="post?.title"
      class="aspect-video rounded-xl contain-content"
      width="550"
      height="310"
    />
    <h1 v-if="post.title" class="text-4xl font-bold mb-8">{{ post?.title }}</h1>
    <div class="prose">
      <p v-if="post.publishedAt">
        Published: {{ new Date(post?.publishedAt).toLocaleDateString() }}
      </p>
      <SanityContent v-if="post.body" :blocks="post.body" />
    </div>
  </main>
</template>