<template>
  <div class="">
    <h1 class="text-2xl font-bold mb-8">Контакты</h1>

    <div class="text-second">Если у вас возникли вопросы или есть предложения и пожелания по сайту, то напишите нам и мы вам обязательно ответим.</div>

    <form @submit.prevent>
      <div class="flex">
        <div class="w-1/2">
          <label for="name" class="text-second">Имя</label>
          <m-input
            placeholder="введите имя"
            class="w-full"
            name="name"
            v-model="formData.name"
          />
        </div>
        <div class="w-1/2">
          <label for="email" class="text-second">Имя</label>
          <m-input
            placeholder="введите имя"
            class="w-full"
            name="email"
            v-model="formData.email"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: '',
      }
    }
  }
}
</script>
