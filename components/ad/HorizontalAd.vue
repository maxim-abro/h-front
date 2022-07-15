<template>
    <nuxt-link :to="url" class="w-full block mb-2 sm:mb-5 shadow shadow-md shadow-[#00000070]">
      <img :src="img" alt="ad_top" class="w-full">
    </nuxt-link>
</template>

<script lang="ts">

export default {
  props: {
    img: String,
    url: String
  }
}
</script>
