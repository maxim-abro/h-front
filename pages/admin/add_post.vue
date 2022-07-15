<template>
  <div class="container flex flex-col sm:flex-row">
    <main class="w-full sm:w-9/12 mb-10 sm:mb-0 sm:mr-4">
      <h1 class="text-4xl font-bold">Новый промокод</h1>

      <form @submit.prevent="handleForm" class="w-full">
        <h3 class="mt-3 font-bold">Название</h3>
        <input
          v-model="postData.title"
          type="text"
          placeholder="Скидка"
          name="название"
          class="focus:outline-0 placeholder-zinc-800 bg-gray-200 p-2 w-full mb-3 focus:outline-0 focus:ring focus:ring-primary"
        />

        <h3 class="mt-3 font-bold">Описание</h3>
        <textarea
          v-model="postData.description"
          placeholder="Приобретай технику..."
          class="focus:outline-0 placeholder-zinc-800 bg-gray-200 p-2 w-full mb-3 focus:outline-0 focus:ring focus:ring-primary"
        />

        <h3 class="mt-3 font-bold">Тип скидки</h3>
        <select
          v-model="postData.type"
          type="text"
          name="type"
          class="focus:outline-0 placeholder-zinc-800 bg-gray-200 p-2 w-full mb-3 focus:outline-0 focus:ring focus:ring-primary"
        >
          <option
            v-for="type in types"
            :key="type.value"
            :value="type.value"
          >
            {{ type.label }}
          </option>
        </select>

        <h3 class="mt-3 font-bold">магазин</h3>
        <select
          v-model="postData.shopUin"
          class="focus:outline-0 placeholder-zinc-800 bg-gray-200 p-2 w-full mb-3 focus:outline-0 focus:ring focus:ring-primary"
        >
          <option value="" disabled>Магазин</option>
          <option v-for="shop in shops" :key="shop.uin" :value="shop.uin">
            {{ shop.title }}
          </option>
        </select>

        <h3 class="mt-3 font-bold">Дата окончания промокода</h3>
        <input
          type="date"
          v-model="postData.endDate"
          name="endDate"
          class="focus:outline-0 placeholder-zinc-800 bg-gray-200 p-2 w-full mb-3 focus:outline-0 focus:ring focus:ring-primary"
        />

        <h3 class="mt-3 font-bold">Ссылка на скидку</h3>
        <input
          v-model="postData.url"
          type="url"
          placeholder="https://za-halyavoi.ru/link/125dsffib"
          name="url"
          class="focus:outline-0 placeholder-zinc-800 bg-gray-200 p-2 w-full mb-3 focus:outline-0 focus:ring focus:ring-primary"
        />

        <h3 class="mt-3 font-bold">Промокод</h3>
        <input
          v-model="postData.code"
          type="text"
          placeholder="PROMO112"
          name="code"
          class="focus:outline-0 placeholder-zinc-800 bg-gray-200 p-2 w-full mb-3 focus:outline-0 focus:ring focus:ring-primary"
        />

        <h3 class="mt-3 font-bold">Query запрос</h3>
        <input
          v-model="postData.query"
          type="text"
          placeholder="?type=promo&url=za-halyavoi"
          name="query"
          class="focus:outline-0 placeholder-zinc-800 bg-gray-200 p-2 w-full mb-3 focus:outline-0 focus:ring focus:ring-primary"
        />

        <h3 class="mt-3 font-bold">Категория</h3>
        <select
          v-model="postData.category"
          class="focus:outline-0 placeholder-zinc-800 bg-gray-200 p-2 w-full mb-3 focus:outline-0 focus:ring focus:ring-primary"
        >
          <option value="" selected disabled>Категория</option>
          <option
            v-for="category in categories"
            :key="category.uin"
            :value="category.uin"
          >
            {{ category.title }}
          </option>
        </select>

        <button
          type="submit"
          class="h-full px-3 text-xl py-1 bg-primary hover:bg-primary-600 transition-all duration-300 hover:transition-all hover:duration-300"
        >
          Добавить
        </button>
      </form>
    </main>
    <aside class="w-full sm:w-3/12 sm:ml-4">
      <m-vertical-card :post="postData" />
    </aside>
  </div>
</template>

<script lang="ts">

import {PostModel} from "~/models/post.model";
import {ShopModel} from "~/models/shop.model";
import {CategoryModel} from "~/models/category.model";

export default {
  layout: 'admin',
  middleware({app ,redirect, $api}:any) {
    app.store.getters['auth/isAuth'] ? null : redirect('/')

    $api.post('/auth/check', {token: app.store.state.auth.token}).catch(() => {
      if (app.store.state.auth.token) {
        app.store.commit('auth/logout')
      }
      redirect('/?isAuth=false')
    })
  },
  data() {
    return {
      postData: {} as PostModel,
      shops: [] as ShopModel[],
      categories: [] as CategoryModel[],
      types: [
        {
          value: "promoCode",
          label: "Промокод",
        },
        {
          value: "sale",
          label: "Скидка",
        },
      ],
    }
  },
  async asyncData({$api}:any) {
    try {
      const shops = await $api.get('/shop')
      const categories = await $api.get('/category')

      return {
        shops: shops.data,
        categories: categories.data
      }
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async handleForm() {
      try {
        // @ts-ignore
        await this.$api.post('/post', this.postData)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
