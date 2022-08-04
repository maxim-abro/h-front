<template>
<div class="flex relative">
    <div class="fixed left-0 top-0 bg-white shadow shadow-xl flex flex-col justify-center h-full" v-if="openMenu">
      <nuxt-link
        to="/admin"
        class="p-5 mb-5 hover:text-yellow-400 hover:bg-zinc-700 text-xs"
      >
        Админ панель
      </nuxt-link>
      <nuxt-link
        to="/admin/add_post"
        class="p-5 mb-5 hover:text-yellow-400 hover:bg-zinc-700 text-xs"
      >
        Добавить промокод
      </nuxt-link>
      <nuxt-link
        to="/admin/add_shop"
        class="p-5 mb-5 hover:text-yellow-400 hover:bg-zinc-700 text-xs"
      >
        Добавить магазин
      </nuxt-link>
      <nuxt-link
        to="/admin/add_category"
        class="p-5 mb-5 hover:text-yellow-400 hover:bg-zinc-700 text-xs"
      >
        Добавить категорию
      </nuxt-link>
      <nuxt-link
        to="/admin/gde_slon"
        class="p-5 mb-5 hover:text-yellow-400 hover:bg-zinc-700 text-xs"
      >
        Промокоды gde slon
      </nuxt-link>
      <nuxt-link
        to="/admin/adv_cake"
        class="p-5 mb-5 hover:text-yellow-400 hover:bg-zinc-700 text-xs"
      >
        Промокоды adv cake
      </nuxt-link>
      <button
        class="p-5 mb-5 hover:text-primary hover:-zinc-700 text-xs"
        @click="addPostVk"
      >
        Добавить пост vk
      </button>
      <nuxt-link to="/" class="p-5 mb-5 hover:text-yellow-400 hover:bg-zinc-700 text-xs"
      >
        вернуться на сайт
      </nuxt-link>
    </div>

  <button class="fixed left-10 bg-white top-10 text-2xl px-3 border border-primary" @click="openMenu = !openMenu">
    <fa icon="hamburger" class="text-primary"/>
  </button>

    <Nuxt/>

</div>
</template>

<script lang="ts">

export default {
  data() {
    return {
      openMenu: false as boolean
    }
  },
  methods: {
    async addPostVk() {
      // @ts-ignore
      await this.$api.get('/cron/post_vk')
    }
  }
}
</script>
