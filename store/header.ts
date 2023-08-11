interface HolidayModel {
  id_holiday: number
  title: string
  description: string
  image: string
  lat_title: string
}
export const state = () => ({
  holiday: {} as HolidayModel,
})

export const getters = {
  getHoliday(state: any): HolidayModel {
    return state.holiday
  },
}

export const mutations = {
  setHoliday(state: any, holiday: HolidayModel) {
    state.holiday = holiday
  },
}

export const actions = {
  async getRandomHoliday({ commit }: any): Promise<void> {
    // @ts-ignore
    const holiday = await this.$api.get('/holiday/random')
    commit('setHoliday', holiday.data)
  },
  async nuxtServerInit({ dispatch }: any): Promise<any> {
    dispatch('getRandomHoliday')
  },
}
