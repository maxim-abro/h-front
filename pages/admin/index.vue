<template>
  <div class="container mt-10">
    <div class="">
      <h2 class="text-3xl mb-5 font-bold">Пустые магазины</h2>
    </div>
    <div class="overflow-auto">
      <table class="min-w-full text-center">
        <thead class="border-b bg-gray-800">
        <tr>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">
            uin
          </th>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">
            Название
          </th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="shops of emptyShops" :key="shops.uin">
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
          >
            {{ shops.uin }}
          </td>

          <td
            class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
          >
            {{ shops.title }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>


    <div class="flex justify-between items-center" @click="openShops = !openShops">
      <h2 class="text-3xl mb-5 font-bold">Магазины</h2>
      <router-link to="/admin/add_shop">Добавить магазин</router-link>
    </div>
    <div class="overflow-auto" v-if="openShops">
      <table class="min-w-full text-center">
        <thead class="border-b bg-gray-800">
        <tr>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">
            uin
          </th>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">
            Название
          </th>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">
            Теги
          </th>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">
            url
          </th>
        </tr>
        </thead>

        <tbody>
        <tr
          v-for="shop in shops"
          :key="shop.uin"
          class="bg-white border-b cursor-pointer hover:bg-zinc-100 transition-all duration-100 hover:transition-all hover:duration-100"
          @click="$router.push(`/admin/edit_shop/${shop.uin}`)"
        >
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
          >
            {{ shop.uin }}
          </td>
          <td
            class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
          >
            {{ shop.title }}
          </td>
          <td
            class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
          >
            {{ shop.tags }}
          </td>
          <td
            class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
          >
            {{ shop.url }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-between items-center mt-10" @click="openCategories = !openCategories">
      <h2 class="text-3xl mb-5 font-bold">Категории</h2>
      <router-link to="/admin/add_category">Добавить категорию</router-link>
    </div>
    <div class="overflow-auto" v-if="openCategories">
      <table class="min-w-full text-center">
        <thead class="border-b bg-gray-800">
        <tr>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">
            uin
          </th>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">
            Название
          </th>
        </tr>
        </thead>

        <tbody>
        <tr
          v-for="category in categories"
          :key="category.uin"
          class="bg-white border-b"
        >
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
          >
            {{ category.uin }}
          </td>

          <td
            class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
          >
            {{ category.title }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {ShopModel} from "~/models/shop.model";
import {CategoryModel} from "~/models/category.model";

export default {
  layout: 'admin',
  middleware({app ,redirect, $api}:any) {
    // @ts-ignore
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
      shops: [] as ShopModel[],
      categories: [] as CategoryModel[],
      emptyShops: [] as ShopModel[],
      openShops: false as boolean,
      openCategories: false as boolean,
    }
  },
  async asyncData({$api}:any) {
    try {
      const shopsResult = await $api.get('/shop')
      const categoryResult = await $api.get('/category')
      const emptyShops = await $api.get('/shop/is/empty')

      return {
        shops: shopsResult.data,
        categories: categoryResult.data,
        emptyShops: emptyShops.data,
      }
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
