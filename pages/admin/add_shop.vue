<template>
  <div class="container mt-10 flex flex-col sm:flex-row">
    <main class="w-full sm:w-9/12 mb-10 sm:mb-0 sm:mr-4">
      <h1 class="text-4xl font-bold">Добавить магазин</h1>
      <form @submit.prevent="handleForm">
        <input
          v-model="shopData.title"
          type="text"
          placeholder="Название сайта"
          name="название"
          class="focus:outline-0 placeholder-zinc-800 bg-gray-200 p-2 w-full my-3 focus:outline-0 focus:ring focus:ring-primary"
        />
        <textarea
          v-model="shopData.description"
          placeholder="Описание сайта"
          class="focus:outline-0 placeholder-zinc-800 bg-gray-200 p-2 w-full my-3 focus:outline-0 focus:ring focus:ring-primary"
        />
        <input
          type="text"
          v-model="shopData.contacts"
          placeholder="Контакт сайта"
          name="контакты"
          class="focus:outline-0 placeholder-zinc-800 bg-gray-200 p-2 w-full my-3 focus:outline-0 focus:ring focus:ring-primary"
        />
        <input
          type="url"
          v-model="shopData.url"
          placeholder="Ссылка на сайт"
          name="url"
          class="focus:outline-0 placeholder-zinc-800 bg-gray-200 p-2 w-full my-3 focus:outline-0 focus:ring focus:ring-primary"
        />
        <input
          type="text"
          v-model="shopData.dostavka"
          placeholder="Доставка"
          name="доставка"
          class="focus:outline-0 placeholder-zinc-800 bg-gray-200 p-2 w-full my-3 focus:outline-0 focus:ring focus:ring-primary"
        />
        <input
          type="text"
          v-model="shopData.tags"
          placeholder="Теги"
          name="теги"
          class="focus:outline-0 placeholder-zinc-800 bg-gray-200 p-2 w-full my-3 focus:outline-0 focus:ring focus:ring-primary"
        />
        <input
          @change="inputImage"
          type="file"
          class="focus:outline-0 placeholder-zinc-800 bg-gray-200 p-2 w-full my-3 focus:outline-0 focus:ring focus:ring-primary"
        />

        <select
          multiple
          v-model="shopData.categories"
          class="focus:outline-0 h-[200px] placeholder-zinc-800 bg-gray-200 p-2 w-full my-3 focus:outline-0 focus:ring focus:ring-primary"
        >
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
          class="h-full px-3 bg-primary hover:bg-primary-6 transition-all duration-300 hover:transition-all hover:duration-300"
        >
          Добавить
        </button>
      </form>
    </main>

    <aside class="w-full sm:w-3/12 mb-10 sm:mb-0 sm:ml-4">
      <shop-aside :data="shopData" />
    </aside>
  </div>
</template>

<script lang="ts">

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
      shopData: {} as ShopModel,
      categories: [] as CategoryModel[],
    }
  },
  async asyncData({$api, route}:any) {
    try {
      const categoriesRes = await $api.get('/category')
      return {
        categories: categoriesRes.data
      }
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async handleForm() {
      try {
        // @ts-ignore
        const dataRes = await this.$api.post('/shop', this.shopData)

        // @ts-ignore
        this.$router.push(`/shop/${dataRes.data.uin}`)
      } catch (e) {
        console.log(e)
      }
    },
    async inputImage(event:any) {
      try {
        const formData = new FormData()
        formData.append('file', event.target.files[0])

        // @ts-ignore
        const res = await this.$api.post('/upload', formData)

        // @ts-ignore
        this.shopData.image = res.data
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
