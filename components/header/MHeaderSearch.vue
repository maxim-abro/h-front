<template>
  <div class="bg-white absolute left-0 w-full rounded-b shadow shadow-md shadow-[#00000070] z-50">
    <nuxt-link :to="`/shop/${shop.uin}`" class="border-b flex items-center px-3 py-2 border-b-2 hover:bg-gray-100" v-for="shop of shops" :key="shop.uin">
      <img :src="`https://za-halyavoi.ru/api/static/${shop.image}`" :alt="shop.image" class="mr-2 h-10 xl:h-16 w-auto">
      <div class="uppercase">{{ shop.title }}</div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">

export default {
  props: {
    shops: Array,
  }
}
</script>
