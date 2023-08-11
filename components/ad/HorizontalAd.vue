<template>
  <nuxt-link
    :to="url"
    class="w-full rounded block mb-2 sm:mb-5 shadow shadow-md shadow-[#00000070]"
  >
    <img loading="lazy" :src="img" alt="ad_top" class="w-full rounded" />
  </nuxt-link>
</template>

<script lang="ts">
export default {
  props: {
    img: String,
    url: String,
  },
}
</script>
