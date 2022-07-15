<template>
  <div class="shadow shadow-md shadow-[#00000070] w-full py-4 px-8 border border-2">
    <img
      v-if="post.shop"
      :src="`https://za-halyavoi.ru/api/static/${post.shop.image}`"
      class="mx-auto h-[59px] cursor-pointer"
      alt=""
      @click="openLink"
    />

    <div class="mx-auto text-xl w-max px-3 bg-zinc-100 mb-3">
      <button class="group p-0.5">
        <fa
          class="group-hover:text-primary transition-all duration-300 hover:transition-all hover:duration-300"
          icon="heart"
        />
      </button>

      {{ post.rating || 0 }}
    </div>

    <hr class="-mx-8 border-t-[2px]" />

    <div class="mx-auto mt-1 text-center text-xl h-[112px] font-medium hover:text-primary cursor-pointer" @click="openLink">
      {{ post.title }}
    </div>

    <router-link
      v-if="post.shop"
      :to="`/shop/${post.shop.uin}`"
      class="text-sm block mb-3 text-zinc-400 hover:text-primary transition-all duration-300 hover:transition-all hover:duration-300"
    >
      <fa icon="check" class="text-primary" /> Все промокоды
      {{ post.shop.title }}
    </router-link>

    <button  @click="openLink"
      class="text-second block text-center mb-3 bg-primary w-full text-second font-medium text-xl hover:-translate-y-0.5 hover:shadow hover:shadow-md hover:shadow-[#00000070]"
    >
      {{ post.type === "promoCode" ? "Показать код" : "открыть купон" }}
    </button>

    <div class="text-sm" v-if="post.endDate">
      Действителен до: {{ $calendar(post.endDate) }}
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
