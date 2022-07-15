import {PostModel} from "~/models/post.model";

export const state = () => ({
  openPopup: false as boolean,
  popupData: {} as PostModel,
  openCats: false as boolean,
  openMobileMenu: false as boolean,
})

export const getters = {

}

export const mutations = {
  setPopupData(state:any, popupData: PostModel) {
    state.popupData = popupData
  },
  closePopup(state:any) {
    state.openPopup = false
  },
  toggleCats(state:any) {
    state.openCats = !state.openCats
  },
  toggleMenu(state:any) {
    state.openMobileMenu = !state.openMobileMenu
  }
}

export const actions = {
  async getPost({ commit, state }:any, uin: string): Promise<PostModel | any> {
    try {
      // @ts-ignore
      const resData = await this.$api.get(`/post/${uin}`)
      commit('setPopupData', resData.data)
      state.openPopup = true
      return resData.data
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
