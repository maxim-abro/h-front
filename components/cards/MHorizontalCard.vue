<template>
<div class="shadow shadow-md shadow-[#00000070] flex flex-col sm:flex-row px-8 shadow-md justify-between w-full py-4 border border-2 dark:border-zinc-700 mb-10">
  <div class="flex items-center flex-col sm:flex-row">
    <div class="mr-8">
      <img :src="`https://za-halyavoi.ru/api/static/${post.shop.image}`" alt="логотип магазина" class="mx-auto h-[59px] cursor-pointer" @click="openLink">
      <div class="mx-auto text-xl w-max px-3 bg-zinc-100 dark:bg-zinc-800 mt-3 dark:text-zinc-200">
        <button class="group p-0.5" @click="$emit('like', post.uin)">
          <fa
            class="group-hover:text-primary  transition-all duration-300 hover:transition-all hover:duration-300"
            icon="heart"
          />
        </button>

        {{ post.rating || 0 }}
      </div>
    </div>

    <div class="">
      <h2 class="mx-auto mt-1 text-center text-xl h-[112px] font-medium dark:hover:text-primary hover:text-primary dark:text-zinc-200 cursor-pointer" @click="openLink">{{ post.title }}</h2>
      <button class="text-zinc-400 hover:text-primary transition-all duration-300 hover:transition-all hover:duration-300">
        <fa icon="share-alt" class="text-primary text-base"/> Поделиться
      </button>
    </div>
  </div>

  <div class="flex flex-col justify-center">
    <m-button rel="nofollow" target="_blank" @click="openLink"
       class="w-max self-end"
    >
      {{ post.type === "promoCode" ? "Показать код" : "открыть купон" }}
    </m-button>

    <div class="text-sm self-end text-zinc-400 dark:text-zinc-200" v-if="post.endDate">
      Действителен до: {{ $calendar(post.endDate) }}
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {PostModel} from "~/models/post.model";

export default {
  props: {
    post: [] as PostModel[],
  },
  methods: {
    openLink() {
      // @ts-ignore
      window.open(`https://za-halyavoi.ru/?coupon=${this.post.uin}`)
      // @ts-ignore
      window.location.href = this.post.url
    }
  }
}
</script>
