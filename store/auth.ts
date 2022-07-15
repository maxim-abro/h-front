const TOKEN_KEY = "jwt-token";
const EMAIL_KEY = "email";

// type ResultAuth = {
//   avatar?: string;
//   email: string;
//   id: number;
//   login: string;
//   passwordHash: string;
//   registerDate: string;
//   uin: string;
// };

export const state = () => ({
  token: '' as string,
  email: '' as string,
})

export const getters = {
  isAuth: (state:any) => !!state.token,
}

export const mutations = {
  setToken(state:any, token:string) {
    // @ts-ignore
    this.$cookies.set(TOKEN_KEY, token, {
      maxAge: 2678400
    })

    state.token = token
  },
  setEmail(state: any, email:string) {
    // @ts-ignore
    this.$cookies.set(EMAIL_KEY, email, {
      maxAge: 2678400
    })

    state.email = email
  },
  logout(state:any) {
    state.token = ''
    state.email = ''
    // @ts-ignore
    this.$cookies.remove(EMAIL_KEY)
    // @ts-ignore
    this.$cookies.remove(TOKEN_KEY)
  },
  addCookie(state:any) {
    // @ts-ignore
    state.email = this.$cookies.get(EMAIL_KEY)
    // @ts-ignore
    state.token = this.$cookies.get(TOKEN_KEY)
  }
}

export const actions = {
  async login({commit}:any, data:any) {
    try {
      // @ts-ignore
      const result = await this.$api.post('/auth/login', {
        email: data.email,
        password: data.password,
      })

      commit('setEmail', result.data.dataValues.email)
      commit('setToken', result.data.hash)
      return 'ok'
    } catch (e) {
      console.log(e)
      // @ts-ignore
      return e.response.status
    }
  }
}
