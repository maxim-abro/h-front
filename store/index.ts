export const actions = {
  async nuxtServerInit({ dispatch }:any) {
    await dispatch('aside/getPopularPosts')
    await dispatch('aside/getPopularCategories')
  }
}
