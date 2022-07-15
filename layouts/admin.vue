<template>
<div class="">
  <div class="container shadow shadow-xl flex flex-wrap justify-center">
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
    <nuxt-link to="/" class="p-5 mb-5 hover:text-yellow-400 hover:bg-zinc-700 text-xs"
    >
      вернуться на сайт
    </nuxt-link>
  </div>

  <Nuxt/>

</div>
</template>

<script lang="ts">

export default {

}
</script>
