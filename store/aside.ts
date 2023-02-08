import {CategoryModel} from "~/models/category.model";

export const state = () => ({
  popular: [] as any,
  popularCategories: [] as CategoryModel[]
})

export const getters = {

}

export const mutations = {
  setPopular(state:any, popular:object) {
    state.popular = popular
  },
  setPopularCategories(state:any, categories:object) {
    state.popularCategories = categories
  }
}

export const actions = {
  async getPopularPosts({commit}:any ):Promise<void> {
    try {
      // @ts-ignore
      const resData = await this.$api.get('/popularshops')
      commit('setPopular', resData.data)
    } catch (e) {
      console.log(e)
    }
  },
  async getPopularCategories({commit}:any ):Promise<void> {
    try {
      // @ts-ignore
      const resData = await this.$api.get('/category/popular')
      commit('setPopularCategories', resData.data)
    } catch (e) {
      console.log(e)
    }
  },
  async getBuild({commit}:any):Promise<void> {
    try {
      // @ts-ignore
      const resData = await this.$api.get('/build/site')
      commit("setPopularCategories", resData.data.categories)
      commit("setPopular", resData.data.shops)
    } catch (e) {
      console.log(e)
    }
  },
  async nuxtServerInit({ dispatch }:any) {
    await dispatch('getPopularPosts')
  }
}
