<template>
  <div class="relative dark:bg-zinc-900">
    <header class="mb-3 pt-2 md:py-2 shadow shadow-xl relative md:shadow-none dark:bg-zinc-900">
      <div class="container flex justify-between items-center">
        <button class="text-primary bg-zinc-100 dark:bg-zinc-800 w-10 h-10 block md:hidden" @click="$store.commit('popup/toggleMenu', true)"><fa icon="bars"/></button>
        <nuxt-link
          to="/"
          class="text-2xl font-black flex items-center text-primary drop-shadow"
        >
          <img loading='lazy' src="/logo-min.png" class="h-16 mr-1 xs:h-20 w-auto" alt="логотип">
        </nuxt-link>
        <button class="text-primary bg-zinc-100 dark:bg-zinc-800 w-10 h-10 block md:hidden" @click="openSearchMobile = !openSearchMobile"><fa icon="magnifying-glass"/></button>
        <div class='w-5/12 hidden md:flex items-center justify-end'>
          <form @submit.prevent="submitSearch" class="relative w-9/12">
            <m-input
              type="search"
              placeholder="поиск товара или сайт"
              class="h-full w-full"
              v-model="searchQuery"
              @blur="blurInput"
            />
            <m-button
              type="submit"
              class="absolute right-0 top-0 h-full px-3 bg-primary hover:bg-yellow-500 transition-all duration-300 hover:transition-all hover:duration-300"
            >
              <fa icon="magnifying-glass" />
            </m-button>
            <m-header-search v-if="searchShops.length" :shops="searchShops"/>
          </form>
          <button class="h-8 ml-4 w-8 rounded hidden sm:block bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 block dark:hover:bg-zinc-700" @click='changeColorMode'>
            <fa v-if='$colorMode.preference === "dark"' icon='moon' class='text-primary'/>
            <fa v-if='$colorMode.preference === "light"' icon='sun' class='text-primary'/>
          </button>
        </div>
      </div>
      <m-header-search-mobile v-if="openSearchMobile" @close="openSearchMobile = false"/>
      <mobile-menu />

      <nuxt-link class="p-3 inline-block md:hidden bg-second text-white w-full sign-wrap-3" to="/tags/kiberponedelnik">
        <span class='logo-1'>Киберпонедельник</span>
      </nuxt-link>
    </header>

    <nav class="bg-second dark:bg-zinc-800 text-primary hidden md:block">
      <div class="container">
        <ul class="flex justify-center items-center">
          <li>
            <nuxt-link class="p-3 inline-block bg-second dark:bg-zinc-800 hover:bg-zinc-700 dark:hover:bg-zinc-700" to="/">
              <fa icon="house" />
              Главная
            </nuxt-link>
          </li>
          <li>
            <button @click="$store.commit('popup/toggleCats')" class="p-3 inline-block bg-second dark:bg-zinc-800 hover:bg-zinc-700 dark:hover:bg-zinc-700" href="#">
              <fa icon="braille" />
              Категории
            </button>
          </li>
          <li>
            <nuxt-link class="p-3 inline-block bg-second dark:bg-zinc-800 hover:bg-zinc-700 dark:hover:bg-zinc-700" to="/alphabet">
              <fa icon="arrow-down-a-z" />
              Сайты по алфавиту
            </nuxt-link>
          </li>
          <li>
            <nuxt-link class="p-3 inline-block bg-second dark:bg-zinc-800 hover:bg-zinc-700 dark:hover:bg-zinc-700" to="/blog">
              <fa icon="newspaper" />
              Блог
            </nuxt-link>
          </li>
          <li>
            <nuxt-link class="p-3 inline-block bg-second dark:bg-zinc-800 text-white hover:bg-zinc-700 dark:hover:bg-zinc-700" to="/tags/kiberponedelnik">
              <span class="logo-1">Киберпонедельник</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>

    <m-header-categories />
  </div>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      searchQuery: '',
      searchShops: [],
      openSearchMobile: false,
    }
  },
  methods: {
    blurInput() {
      setTimeout(() => {
        this.searchShops = []
      }, 500)
    },
    submitSearch() {
      this.$router.push(`/search?q=${this.searchQuery}`)
      this.searchShops = []
      this.searchQuery = ''
    },
    changeColorMode() {
      this.$colorMode.preference === "dark" ? this.$colorMode.preference = "light" : this.$colorMode.preference = "dark"
    }
  },
  watch: {
    searchQuery: _.debounce(async function() {
      if (this.searchQuery.length > 2) {
        const response = await this.$api.get(`/search?q=${encodeURI(this.searchQuery.toLowerCase())}`)

        this.searchShops = response.data
      }
    }, 1000)
  }
}
</script>

<style scoped>
.logo-1 {
  /*   text-shadow: 0 0 5px #f562ff, 0 0 15px #f562ff, 0 0 25px #f562ff,
      0 0 20px #f562ff, 0 0 30px #890092, 0 0 80px #890092, 0 0 80px #890092;
    color: #fccaff; */
  text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500, 0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
  color: #fff6a9;
  text-align: center;
  animation: blink 12s infinite;
  -webkit-animation: blink 12s infinite;
}
</style>
