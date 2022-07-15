<template>
  <div class="relative">
    <header class="mb-3 py-2 shadow shadow-xl sm:shadow-none">
      <div class="container flex justify-between items-center">
        <button class="text-primary bg-zinc-100 w-10 h-10 block sm:hidden" @click="$store.commit('popup/toggleMenu')"><fa icon="bars"/></button>
        <nuxt-link
          to="/"
          class="text-2xl font-black flex items-center text-primary drop-shadow"
        >
          <img src="/za-halyavoi.png" class="h-16 mr-1 xs:h-20 w-auto" alt="">
          za-halyavoi
        </nuxt-link>
        <button class="text-primary bg-zinc-100 w-10 h-10 block sm:hidden"><fa icon="magnifying-glass"/></button>
        <div class="w-5/12 relative hidden sm:block">
          <input
            type="search"
            placeholder="поиск товара или сайт"
            class="focus:outline-0 bg-gray-200 p-2 w-full"
          />
          <button
            class="absolute right-0 top-0 h-full px-3 bg-primary hover:bg-yellow-500 transition-all duration-300 hover:transition-all hover:duration-300"
          >
            <fa icon="magnifying-glass" />
          </button>
        </div>
      </div>
      <mobile-menu />
    </header>

    <nav class="bg-second text-primary hidden sm:block">
      <div class="container">
        <ul class="flex justify-center items-center">
          <li>
            <nuxt-link class="p-3 inline-block bg-second hover:bg-zinc-700" to="/">
              <fa icon="house" />
              Главная
            </nuxt-link>
          </li>
          <li>
            <button @click="$store.commit('popup/toggleCats')" class="p-3 inline-block bg-second hover:bg-zinc-700" href="#">
              <fa icon="braille" />
              Категории
            </button>
          </li>
          <li>
            <nuxt-link class="p-3 inline-block bg-second hover:bg-zinc-700" to="/alphabet">
              <fa icon="arrow-down-a-z" />
              Сайты по алфавиту
            </nuxt-link>
          </li>
          <li>
            <a class="p-3 inline-block bg-second hover:bg-zinc-700" href="/blog">
              <fa icon="newspaper" />
              Блог
            </a>
          </li>
          <li v-if="$store.getters['auth/isAuth']">
            <nuxt-link to="/admin" class="p-3 inline-block bg-second hover:bg-zinc-700">админ панель</nuxt-link>
          </li>
          <li v-if="$store.getters['auth/isAuth']">
            <button class="p-3 inline-block bg-second hover:bg-zinc-700" @click="$store.commit('auth/logout')">выйти</button>
          </li>
        </ul>
      </div>
    </nav>
    <m-header-categories />
  </div>
</template>

<script>

export default {
  data() {
    return {

    }
  },
}
</script>
