<template>
  <div
    class="shadow shadow-md rounded shadow-[#00000070] border dark:border-zinc-700"
  >
    <div
      class="p-4 text-second font-bold text-center bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-200"
    >
      <fa icon="star" class="text-primary mr-2" />
      Популярные Категории
    </div>

    <div class="p-4">
      <nuxt-link
        v-for="i in popularCategories"
        :key="i.uin"
        :to="`/categories/${i.lat_title}`"
        class="cursor-pointer mb-2 py-1 group decoration-primary hover:underline hover:underline-offset-2 flex items-center"
      >
        <fa
          :icon="i.icon"
          class="text-primary mr-3 group-hover:rotate-[360deg]"
        />
        {{ i.title }}
      </nuxt-link>
    </div>

    <nuxt-link
      to="/categories"
      class="text-center bg-zinc-100 dark:bg-zinc-700 text-second dark:text-zinc-200 font-bold block w-full p-4 hover:text-primary"
      >Все предложения</nuxt-link
    >
  </div>
</template>

<script lang="ts">
export default {
  props: {
    popularCategories: Array,
  },
}
</script>
