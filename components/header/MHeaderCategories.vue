<template>
  <transition
    enter-active-class="transition-all duration-300 ease-in"
    leave-active-class="transition-all duration-300 ease-out"
    enter-class="opacity-0 -translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-full"
  >
    <div
      v-if="$store.state.popup.openCats"
      class="bg-zinc-50 dark:bg-zinc-900 shadow shadow-xl p-8 absolute top-full left-1/2 -translate-x-1/2 z-50"
    >
      <div class="grid grid-cols-3">
        <a
          v-for="cat in getCategories"
          :key="cat.uin"
          class="w-full pl-1 text-xl font-light py-1 hover:bg-zinc-700 hover:text-primary duration-75 whitespace-nowrap overflow-ellipsis overflow-hidden"
          :href="`/categories/${cat.lat_title}`"
          @click.prevent="clickCat(`/categories/${cat.lat_title}`)"
          ><fa :icon="cat.icon" class="mr-3 w-4" />{{ cat.title }}</a
        >
        <a
          class="w-full pl-1 text-xl font-light py-1 hover:bg-zinc-700 hover:text-primary duration-75 whitespace-nowrap overflow-ellipsis overflow-hidden"
          href="/categories"
          @click.prevent="clickCat('/categories')"
          ><fa icon="ellipsis-h" /> Все категории</a
        >
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
// @ts-ignore
import { CategoryModel } from '~/models/category.model'

export default {
  data() {
    return {
      categories: [] as CategoryModel[],
    }
  },
  computed: {
    getCategories(): any {
      // @ts-ignore
      return this.categories.slice(0, 11)
    },
  },
  async mounted() {
    // @ts-ignore
    const categories = await this.$api.get('/category')
    // @ts-ignore
    this.categories = categories.data
  },
  methods: {
    clickCat(url?: string): void {
      // @ts-ignore
      this.$store.commit('popup/toggleCats')
      // @ts-ignore
      this.$router.push(url)
    },
  },
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>
