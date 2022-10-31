<template>
  <transition
    enter-active-class="transition-all duration-300 ease-in"
    leave-active-class="transition-all duration-300 ease-out"
    enter-class="opacity-0 -translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-full"
  >
    <div class="bg-zinc-50 shadow shadow-xl p-8 absolute top-full left-1/2 -translate-x-1/2 z-50" v-if="$store.state.popup.openCats">
      <div class="grid grid-cols-3">
        <nuxt-link class="w-full pl-1 text-xl font-light py-1 hover:bg-zinc-700 hover:text-primary duration-75 whitespace-nowrap
        overflow-ellipsis overflow-hidden" v-for="cat in getCategories" :to="`/categories/${cat.uin}`" :key="cat.uin" @click="clickCat(`/${cat.uin}`)"><fa :icon="cat.icon" class="mr-3 w-4"/>{{ cat.title }}</nuxt-link>
        <nuxt-link class="w-full pl-1 text-xl font-light py-1 hover:bg-zinc-700 hover:text-primary duration-75 whitespace-nowrap
        overflow-ellipsis overflow-hidden" to="/categories" @click.prevent="clickCat('')"><fa icon="ellipsis-h"/> Все категории</nuxt-link>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
// @ts-ignore
import {CategoryModel} from "~/models/category.model";

export default {
  data() {
    return {
      categories: [] as CategoryModel[]
    }
  },
  async mounted() {
    // @ts-ignore
    const categories = await this.$api.get('/category')
    // @ts-ignore
    this.categories = categories.data
  },
  computed: {
    getCategories():any {
      // @ts-ignore
      return this.categories.slice(0, 11)
    }
  },
  methods: {
    clickCat(uin?:string):void {
      // @ts-ignore
      this.$store.commit('popup/toggleCats')
      // @ts-ignore
      this.$router.push(`/categories${uin}`)
    }
  }
}
</script>

<style scoped>

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>
