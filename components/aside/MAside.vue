<template>
  <div class="bg-second text-white p-5 w-full shadow shadow-md shadow-[#00000070]">
    <div class="font-bold text-xl text-center mb-3">
      Узнавайте первыми про скидки!
    </div>

    <form class="mb-5">
      <input
        type="text"
        placeholder="Имя"
        class="bg-zinc-700 text-zinc-500 mb-2 w-full p-1"
      />
      <input
        type="email"
        placeholder="email"
        class="bg-zinc-700 text-zinc-500 mb-2 w-full p-1"
      />
      <button class="bg-primary w-full p-1">Подписаться</button>
    </form>

    <div class="text-xs text-zinc-500 w-10/12 mx-auto text-center">
      Нажимая на кнопку «Подписаться», я даю согласие на
      <nuxt-link
        class="underline text-zinc-500 hover:text-primary transition-all duration-300 hover:transition-all hover:duration-300"
        to="/privacy"
      >обработку персональных данных.</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">

export default {

}
</script>
