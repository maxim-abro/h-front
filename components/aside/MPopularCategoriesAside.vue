<template>
  <div class="shadow shadow-md rounded shadow-[#00000070] border">
    <div class="p-4 text-second font-bold text-center bg-zinc-100">
      <fa icon="star" class="text-primary mr-2"/>
      Популярные Категории
    </div>

    <div class="p-4">
      <nuxt-link
        v-for="i in popularCategories"
        :key="i.uin"
        :to="`/categories/${i.uin}`"
        class="cursor-pointer mb-2 py-1 group decoration-primary hover:underline hover:underline-offset-2 flex items-center"
      >
        <fa :icon="i.icon" class="text-primary mr-3 group-hover:rotate-[360deg]"/>
        {{ i.title }}
      </nuxt-link>
    </div>

    <nuxt-link to="/categories" class="text-center bg-zinc-100 text-second font-bold block w-full p-4 hover:text-primary">Все предложения</nuxt-link>
  </div>
</template>

<script lang="ts">

export default {
  props: {
    popularCategories: Array
  }
}
</script>
