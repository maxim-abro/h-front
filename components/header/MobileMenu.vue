<template>
  <div class="flex fixed top-0 left-0 w-full h-full" v-if="$store.state.popup.openMobileMenu">
    <div class="w-9/12 h-full bg-white p-3">
      <ul>
        <li>
          <nuxt-link to="/" class="mb-2 block" @click.prevent="clickLink('/')"><fa class="text-primary mr-1" icon="house" /> Главная</nuxt-link>
        </li>
        <li>
          <a href="/categories" class="mb-2 block" @click.prevent="clickLink('/categories')"><fa class="text-primary mr-1" icon="braille" /> Категории</a>
        </li>
        <li>
          <a href="/alphabet" class="mb-2 block" @click.prevent="clickLink('/alphabet')"><fa class="text-primary mr-1" icon="arrow-down-a-z" /> Сайты по алфавиту</a>
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

export default {
  data() {
    return {

    }
  },
  methods: {
    clickLink(url:string) {
      //@ts-ignore
      this.$store.commit('popup/toggleMenu')
      //@ts-ignore
      this.$router.push(url)

    }
  }
}
</script>
