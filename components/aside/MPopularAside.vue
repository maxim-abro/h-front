<template>
  <div class="shadow rounded shadow-md shadow-[#00000070] border dark:border-zinc-700">
    <div class="p-4 text-second font-bold text-center bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-200">
      <fa icon="crown" class="text-primary mr-2"/>
      Популярные предложения
    </div>

    <div class="grid grid-cols-2 gap-2 p-4">
      <nuxt-link :to="`/shop/${i.shop.uin}`" class="cursor-pointer hover:shadow hover:shadow-lg hover:-translate-y-1 flex items-center" v-for="i in popular" :key="i.shop.uin">
        <img :title='i.shop.title' loading='lazy' :src="`https://za-halyavoi.ru/api/static/${i.shop.image}`" :alt="i.shop.title" class="w-full">
      </nuxt-link>
    </div>

    <nuxt-link to="/alphabet" class="text-center bg-zinc-100 dark:bg-zinc-700 text-second dark:text-zinc-200 font-bold block w-full p-4 hover:text-primary dark:hover:text-primary">Все предложения</nuxt-link>
  </div>
</template>

<script lang="ts">

export default {
  props: {
    popular: Array
  }
}
</script>
