export const actions = {
  async nuxtServerInit({ dispatch }:any) {
    await dispatch('aside/getBuild')
    await dispatch('header/getRandomHoliday')
  }
}
