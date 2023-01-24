<template>
  <div class="shadow shadow-md shadow-[#00000070] w-full border-zinc-200 p-3">
    <img
      v-if="data.image"
      :src="`https://za-halyavoi.ru/api/static/${data.image}`"
      :alt="data.title"
      class="mx-auto w-max-[100%]"
    />
    <a
      :href="data.url"
      target="_blank"
      class="w-full rounded border bg-white inline-block text-lg text-center border-primary text-primary py-1.5 hover:bg-primary hover:text-white transition-all duration-300 hover:transition-all hover:duration-300"
    >
      <fa icon="up-right-from-square" />
      Перейти на сайт
    </a>

    <button
      class="text-center rounded w-full mt-3 py-1.5 bg-zinc-200 text-second hover:text-primary transition-all duration-300 hover:transition-all hover:duration-300"
      @click="$router.push(`/shop/add/${data.uin}`)"
    >
      <fa icon="circle-chevron-down" />
      Предложить купон
    </button>

    <hr class="border-zinc-200 my-5 -mx-3" />
    <div class="">
      {{ data.description }}
    </div>

    <hr class="border-zinc-200 my-5 -mx-3" />

    <button
      class="text-sm hover:text-primary duration-300 hover:transition-all hover:duration-300"
      @click="openInfo = !openInfo"
    >
      <fa icon="circle-info" class="text-primary" />
      Информация о магазине "{{ data.title }}"
    </button>

    <div class="mt-3" v-if="openInfo">
      <div class="mb-1.5">
        <b>Контакты {{ data.title }}: </b>
        {{ data.contacts }}
      </div>

      <div class="mb-1.5" v-if="data.dostavka">
        <b>{{ data.title }} доставка: </b>
        {{ data.dostavka }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ShopModel } from "~/models/shop.model";

export default {
  data() {
    return {
      openInfo: false as boolean,
    }
  },
  props: {
    data: {} as ShopModel,
  }
}
</script>
