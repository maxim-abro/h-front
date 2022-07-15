export const state = () => ({
  popular: [] as any
})

export const getters = {

}

export const mutations = {
  setPopular(state:any, popular:object) {
    state.popular = popular
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
  async nuxtServerInit({ dispatch }:any) {
    await dispatch('getPopularPosts')
  }
}
