<template>
  <div class="container mt-10 shadow shadow-xl p-4">
    <form @submit.prevent="getCoupons(inputShopId)" class="">
      <h2 class="mt-3 font-bold">Выберите магазин</h2>
      <select class="focus:outline-0 placeholder-zinc-800 bg-gray-200 p-2 mb-3 focus:outline-0 focus:ring focus:ring-primary" v-model="inputShopId">
        <option v-for="shop in slonShops" :value="shop.id">{{ shop.title }}</option>
      </select>
      <m-button type="submit" :disabled="!inputShopId || loadTable">Найти купоны</m-button>
    </form>


    <div class="flex justify-center items-center" v-if="loadTable">
      <div class="lds-dual-ring"></div>
    </div>

    <div class="overflow-auto">
      <table class="min-w-full text-center my-10" v-if="slonCoupons.length">
        <thead class="border-b bg-gray-800 overflow-scroll">
        <tr>

          <th scope="col" class="text-sm font-medium text-white px-6 py-4">
            выбранные
          </th>
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
        <tr v-for="shop in slonCoupons" :key="shop.id" class="py-2 border-y">
          <th>
            <input type="checkbox" v-model="shop.toSite"/>
          </th>
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
      <m-button v-if="couponsToSite.length" @click="pushCoupons">Добавить выбранные купоны</m-button>
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
      categories: [] as CategoryModel[],
      loadTable: false as boolean,
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
    async getCoupons(idShop:string) {
      try {
        //@ts-ignore
        this.loadTable = true
        //@ts-ignore
        const coupons = await this.$api.get(`/slon/shop/${idShop}`)

        //@ts-ignore
        this.loadTable = false

        //@ts-ignore
        this.slonCoupons = coupons.data
      } catch (e) {
        console.log(e)
        //@ts-ignore
        this.loadTable = false
      }
    },
    async pushCoupons() {
      try {
        //@ts-ignore
        for (const item of this.couponsToSite) {
          //@ts-ignore
          await this.$api.post('/post', {
            title: item.title,
            description: item.description,
            type: 'sale',
            shopUin: item.shopUin,
            endDate: item.endDate,
            url: item.url,
            code: '',
            category: item.category,
            recomended: item.recomended,
          })

        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  computed: {
    couponsToSite():object[] {
      //@ts-ignores
      return this.slonCoupons.filter(i => i.toSite)
    }
  }
}
</script>

<style scoped>
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fdb13c;
  border-color: #fdb13c transparent #fdb13c transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
