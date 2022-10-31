<template>
  <div class="flex fixed top-0 left-0 w-full h-full z-50" v-if="$store.state.popup.openMobileMenu">
    <div class="w-9/12 h-full bg-white overflow-auto z-50 p-3">
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
                <nuxt-link class="ml-4 block my-1" v-for="category in $store.state.aside.popularCategories" :key="category.uin" :to="`/categories/${category.uin}`"><fa :icon="category.icon" class="text-second mr-1"/> {{ category.title }}</nuxt-link>
                <nuxt-link to="/categories" class="ml-4 block my-1"><fa class="text-secont mr-1" icon="ellipsis-h"/> Все категории</nuxt-link>
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
                <nuxt-link v-for="shop of $store.state.aside.popular" :key="shop.shop.uin" :to="`/shop/${shop.shop.uin}`" class="block">
                  <img :src="`https://za-halyavoi.ru/api/static/${shop.shop.image}`" :alt="shop.shop.title">
                </nuxt-link>
              </div>
            </template>
          </m-collapse>
        </li>
        <li v-if="$store.getters['auth/isAuth']">
          <a href="/admin" class="mb-2 block" @click.prevent="clickLink('/admin')"><fa class="text-primary mr-1" icon="user-shield"/> админ панель</a>
        </li>
        <li v-if="$store.getters['auth/isAuth']">
          <button @click="$store.commit('auth/logout')" class="mb-2 block"><fa class="text-primary mr-1" icon="sign-out-alt"/> выйти</button>
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
