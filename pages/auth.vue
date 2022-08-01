<template>
  <div class="flex w-[100vw] h-[100vh] justify-center items-center">
    <div class="w-[700px] h-1/2 border">
      <h1 class="text-5xl mx-auto text-center font-bold flex items-center uppercase">
        <img src="/logo.png" alt="" class="h-16 w-auto">
      </h1>

      <form class="px-3 sm:px-32" @submit.prevent="fetchForm">
        <input
          name="email"
          v-model="email"
          type="email"
          placeholder="Ваша почта"
          :disabled="isAuth"
          class="focus:outline-0 focus:ring focus:ring-primary bg-gray-200 p-2 my-5 w-full mx-auto block"
        />

        <input
          name="password"
          v-model="password"
          type="password"
          placeholder="Ваш пароль"
          :disabled="isAuth"
          class="focus:outline-0 focus:ring focus:ring-primary bg-gray-200 p-2 my-5 w-full mx-auto block"
        />
        <div :class="err ? 'text-red-500' : `${isAuth ? 'text-green-500 mb-4' : ''}`">{{ err || ok }}</div>
        <button
          type="submit"
          class="h-full px-3 bg-primary hover:bg-yellow-500 transition-all duration-300 hover:transition-all hover:duration-300"
          v-if="!isAuth"
        >
          войти
        </button>

        <nuxt-link v-else-if="isAuth" class="h-full px-3 py-3 bg-primary hover:bg-yellow-500 transition-all duration-300 hover:transition-all hover:duration-300" to="/admin">Войти в панель администратора</nuxt-link>


      </form>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  layout: 'auth',
  data() {
    return {
      email: '' as string,
      password: '' as string,
      err: '' as string,
      ok: 'Введите корректный логин и пароль',
      isAuth: false as boolean,
    }
  },
  methods: {
    async fetchForm() {
      try {
        // @ts-ignore
        const result = await this.$store.dispatch('auth/login', {email: this.email, password: this.password})
        if(result === 'ok') {
          console.log(result)
          // @ts-ignore
          this.isAuth = true
          // @ts-ignore
          this.err = ''
          // @ts-ignore
          this.ok = 'Вы вошли в систему'
        } else {
          // @ts-ignore
          this.err = 'Неправильный логин или пароль'
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
