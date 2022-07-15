<template>
  <div class="flex fixed top-0 left-0 w-full h-full" v-if="$store.state.popup.openMobileMenu">
    <div class="w-9/12 h-full bg-white p-3">
      <ul>
        <li>
          <nuxt-link to="/" class="mb-2 block" @click="$store.commit('popup/toggleMenu')"><fa class="text-primary mr-1" icon="house" /> Главная</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/categories" class="mb-2 block" @click="$store.commit('popup/toggleMenu')"><fa class="text-primary mr-1" icon="braille" /> Категории</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/alphabet" class="mb-2 block" @click="$store.commit('popup/toggleMenu')"><fa class="text-primary mr-1" icon="arrow-down-a-z" /> Сайты по алфавиту</nuxt-link>
        </li>
        <li v-if="$store.getters['auth/isAuth']">
          <nuxt-link to="/admin" class="mb-2 block" @click="$store.commit('popup/toggleMenu')"><fa class="text-primary mr-1" icon="user-shield"/> админ панель</nuxt-link>
        </li>
        <li v-if="$store.getters['auth/isAuth']">
          <button @click="$store.commit('auth/logout')" class="mb-2 block"><fa class="text-primary mr-1" icon="sign-out-alt"/> выйти</button>
        </li>
      </ul>
    </div>

    <div class="w-3/12 h-full bg-[#00000090]" @click="$store.commit('popup/toggleMenu')"></div>
  </div>
</template>
