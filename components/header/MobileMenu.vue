<template>
  <div class="flex fixed top-0 left-0 w-full h-full z-50" v-if="$store.state.popup.openMobileMenu">
    <div class="w-9/12 h-full bg-white dark:bg-zinc-800 overflow-auto z-50 p-3">
      <ul>
        <li>
          <nuxt-link to="/" class="mb-2 block" @click.prevent="clickLink('/')"><fa class="text-primary mr-1" icon="house" /> Главная</nuxt-link>
        </li>
        <li>
<!--          <a href="/categories" class="mb-2 block" @click.prevent="clickLink('/categories')"><fa class="text-primary mr-1" icon="braille" /> Категории</a>-->
          <m-collapse animation>
            <template #trigger>
              <div class="mb-2 block"><fa class="text-primary mr-1" icon="braille" /> Категории <fa icon="chevron-up" class="arrow"/></div>
            </template>
            <template #content>
              <div class="">
                <a class="ml-4 block my-1" v-for="category in $store.state.aside.popularCategories" @click.prevent="clickLink(`/categories/${category.lat_title}`)" :key="category.uin" :href="`/categories/${category.lat_title}`"><fa :icon="category.icon" class="text-second mr-1"/> {{ category.title }}</a>
                <a @click.prevent="clickLink('/categories')" href="/categories" class="ml-4 block my-1"><fa class="text-second mr-1" icon="ellipsis-h"/> Все категории</a>
              </div>
            </template>
          </m-collapse>
        </li>
        <li>
          <a href="/alphabet" class="mb-2 block" @click.prevent="clickLink('/alphabet')"><fa class="text-primary mr-1" icon="arrow-down-a-z" /> Сайты по алфавиту</a>
        </li>
        <li>
          <m-collapse animation>
            <template #trigger>
              <div class="mb-2 block"><fa icon="crown" class="text-primary mr-1"/>Популярные приложения <fa icon="chevron-up" class="arrow"/></div>
            </template>
            <template #content>
              <div class="grid grid-cols-2">
                <a v-for="shop of $store.state.aside.popular" :key="shop.shop.uin" :href="`/shop/${shop.shop.uin}`" @click.prevent="clickLink(`/shop/${shop.shop.uin}`)" class="block">
                  <img loading='lazy' :src="`https://za-halyavoi.ru/api/static/${shop.shop.image}`" :alt="shop.shop.title">
                </a>
              </div>
            </template>
          </m-collapse>
        </li>
        <li>
          <button class="" @click='changeColorMode'>
            <fa v-if='$colorMode.preference === "dark"' icon='moon' class='text-primary mr-1'/>
            <fa v-if='$colorMode.preference === "light"' icon='sun' class='text-primary mr-1'/>
            цветовая схема
          </button>
        </li>
      </ul>
    </div>

    <div class="w-3/12 h-full bg-[#00000090]" @click="$store.commit('popup/toggleMenu')"></div>
  </div>
</template>

<script lang="ts">

import {CategoryModel} from "~/models/category.model";

export default {
  data() {
    return {
      categories: [] as CategoryModel[]
    }
  },
  methods: {
    clickLink(url:string) {
      // @ts-ignore
      this.$store.commit('popup/toggleMenu')
      // @ts-ignore
      this.$router.push(url)
    },
    changeColorMode() {
      // @ts-ignore
      this.$colorMode.preference === "dark" ? this.$colorMode.preference = "light" : this.$colorMode.preference = "dark"
    }
  },
  async mounted() {
    // // @ts-ignore
    // const categories = await this.$api.get('/category')
    //
    // // @ts-ignore
    // this.categories = categories.data
  }
}
</script>
