<template>
  <div class="container mt-10 shadow shadow-xl p-4">
    <form @submit.prevent="getCoupons(inputShopId)" class="">
      <h2 class="mt-3 font-bold">Выберите магазин</h2>
      <select class="focus:outline-0 placeholder-zinc-800 bg-gray-200 p-2 mb-3 focus:outline-0 focus:ring focus:ring-primary" v-model="inputShopId">
        <option v-for="shop in slonShops" :value="shop.id">{{ shop.title }}</option>
      </select>
      <button type="submit" :disabled="!inputShopId" class="block h-full px-3 text-xl py-1 bg-primary hover:bg-primary-600 ">Найти купоны</button>
    </form>


    <div class="overflow-auto">
      <table class="min-w-full text-center mt-10" v-if="slonCoupons.length">
        <thead class="border-b bg-gray-800  overflow-scroll">
        <tr>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">
            Название
          </th>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">
            описание
          </th>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">
            дата окончания
          </th>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">
            категория
          </th>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">
            ссылка
          </th>
          <th scope="col" class="text-sm font-medium text-white px-6 py-4">
            Магазин
          </th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="shop in slonCoupons" :key="shop.id">
          <th>
            {{ shop.title }}
          </th>
          <th>
            {{ shop.description }}
          </th>
          <th>
            {{ shop.endDate }}
          </th>
          <th>
            <select
              class="focus:outline-0 placeholder-zinc-800 bg-gray-200 p-2 mb-3 focus:outline-0 focus:ring focus:ring-primary"
              v-model="shop.category"
            >
              <option v-for="category in categories" :value="category.uin">{{ category.title }}</option>
            </select>
          </th>
          <th class="break-all">
            {{ shop.url }}
          </th>

          <th>
            <select
              class="focus:outline-0 placeholder-zinc-800 bg-gray-200 p-2 mb-3 focus:outline-0 focus:ring focus:ring-primary"
              v-model="shop.shopUin"
            >
              <option :value="i.uin" v-for="i in shops">{{ i.title }}</option>
            </select>
          </th>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {PostModel} from "~/models/post.model";
import {CategoryModel} from "~/models/category.model";
import {ShopModel} from "~/models/shop.model";

type SlonShopModel = {
  id: string;
  title: string;
  description: string;
  url: string;
}

export default {
  layout: 'admin',
  data() {
    return {
      slonShops: [] as SlonShopModel[],
      slonCoupons: [] as object[],
      coupons: [] as PostModel[],
      inputShopId: '' as string,
      shops: [] as ShopModel[],
      categories: [] as CategoryModel[]
    }
  },
  async asyncData({ $api }:any) {
    const slonShops = await $api.get('/slon/shop')
    const shops = await $api.get('/shop')
    const categories = await $api.get('/category')

    return {
      slonShops: slonShops.data,
      categories: categories.data,
      shops: shops.data,
    }
  },
  methods: {
    async getCoupons(idShop) {
      const coupons = await this.$api.get(`/slon/shop/${idShop}`)

      this.slonCoupons = coupons.data
    }
  }
}
</script>
