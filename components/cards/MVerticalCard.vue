<template>
  <div
    class="shadow shadow-md shadow-[#00000070] rounded w-full py-4 px-8 border border-2 dark:border-zinc-700 relative"
    :class="post.recomended ? 'shadow-primary' : ''"
  >
    <img
      v-if="post.shop"
      :title="post.shop.title"
      loading="lazy"
      :src="`https://za-halyavoi.ru/api/static/${post.shop.image}`"
      class="mx-auto h-[59px] cursor-pointer"
      :alt="post.shop.title"
      @click="openLink"
    />

    <div class="mx-auto text-xl w-max px-3 bg-zinc-100 dark:bg-zinc-800 mb-3">
      <button class="group p-0.5">
        <fa
          class="group-hover:text-primary transition-all duration-300 hover:transition-all hover:duration-300"
          icon="heart"
          @click="$emit('like', post.uin)"
        />
      </button>

      {{ post.rating || 0 }}
    </div>

    <hr class="-mx-8 border-t-[2px] dark:border-zinc-800" />

    <div
      class="mx-auto mt-1 text-center text-xl h-[112px] overflow-hidden font-medium hover:text-primary cursor-pointer"
      @click="openLink"
    >
      {{ post.title }}
    </div>

    <router-link
      v-if="post.shop"
      :to="`/shop/${post.shop.lat_title}`"
      class="text-sm block mb-3 text-zinc-400 hover:text-primary transition-all duration-300 hover:transition-all hover:duration-300"
    >
      <fa icon="check" class="text-primary" /> Все промокоды
      {{ post.shop.title }}
    </router-link>

    <m-button
      class="block text-center mb-3 w-full font-medium text-xl py-1"
      @click="openLink"
    >
      {{ post.type === 'promoCode' ? 'Показать код' : 'открыть купон' }}
    </m-button>

    <div v-if="post.endDate" class="text-sm">
      Действителен до:
      {{
        new Date(post.endDate).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      }}
    </div>
  </div>
</template>

<script lang="ts">
import { PostModel } from '~/models/post.model'
import MButton from '~/components/_core/MButton.vue'

export default {
  components: {
    MButton,
  },
  props: {
    post: [] as PostModel[],
  },
  methods: {
    openLink() {
      // @ts-ignore
      window.open(`https://za-halyavoi.ru/?coupon=${this.post.uin}`)
      // @ts-ignore
      window.location.href = this.post.url
    },
  },
}
</script>
