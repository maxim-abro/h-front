<template>
  <div class="dark:text-zinc-200">
    <m-bread-crumbs :crumbs="breadCrumbs" />
    <h1 class="text-2xl font-bold mb-8">Контакты</h1>

    <div class="text-second dark:text-zinc-200 mb-4">
      Если у вас возникли вопросы или есть предложения и пожелания по сайту, то
      напишите нам и мы вам обязательно ответим.
    </div>

    <form @submit.prevent="fetchForm">
      <div class="flex gap-8 mb-4">
        <div class="w-1/2">
          <label
            for="name"
            class="text-second dark:text-zinc-200 font-medium mb-2"
            >Имя</label
          >
          <m-input
            v-model="formData.name"
            placeholder="Введите имя"
            class="w-full"
            name="name"
          />
        </div>
        <div class="w-1/2">
          <label
            for="email"
            class="text-second dark:text-zinc-200 font-medium mb-2"
            >Электронная почта</label
          >
          <m-input
            v-model="formData.email"
            placeholder="Введите вашу почту"
            class="w-full"
            name="email"
            type="email"
          />
        </div>
      </div>

      <div class="mb-4 relative">
        <label
          for="message"
          class="text-second dark:text-zinc-200 font-medium mb-2"
          >Сообщение</label
        >
        <textarea
          v-model="formData.message"
          name="message"
          placeholder="Введите ваше сообщение"
          class="w-full h-24 focus:outline-0 rounded p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary placeholder-zinc-800 text-zinc-900 bg-gray-200"
        />

        <div class="absolute right-3 bottom-1">
          {{ formData.message.length }} / 2000
        </div>
      </div>

      <div class="text-second dark:text-zinc-200 text-sm">
        Нажимая на кнопку "Отправить", я даю согласие на
        <nuxt-link to="/privacy" class="underline hover:text-primary"
          >обработку персональных данных</nuxt-link
        >
      </div>

      <div v-if="error || validate" class="text-red-500 text-sm">
        {{ validate || 'Неизвестная ошибка' }}
      </div>
      <div v-if="ok" class="text-green-600 text-sm font-medium">
        Ваше сообщение отправлено, мы вам скоро ответим!
      </div>

      <m-button
        type="submit"
        class="uppercase font-bold"
        :disabled="disabledForm"
        >Отправить</m-button
      >
    </form>
  </div>
</template>

<script>
import * as yup from 'yup'
import MBreadCrumbs from '~/components/MBreadCrumbs.vue'
import MButton from '~/components/_core/MButton.vue'
import MInput from '~/components/_core/MInput.vue'
export default {
  components: {
    MBreadCrumbs,
    MButton,
    MInput,
  },
  data() {
    return {
      breadCrumbs: [
        {
          title: 'Контакты',
        },
      ],
      formData: {
        name: '',
        email: '',
        message: '',
        date: new Date(),
      },
      disabledForm: false,
      error: false,
      validate: '',
      ok: false,
    }
  },
  head() {
    return {
      // @ts-ignore
      title: `Обратная связь. Промокоды, скидки акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          // @ts-ignore
          content: `Обратная связь. Свежие промокоды, скидки и акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'обратная, связь, сайты, алфавит, промокоды, скидки, акции, магазины, акция, промокод, скидка',
        },
        {
          property: 'og:title',
          content: `Промокоды, скидки и акции для сайтов и интернет-магазинов на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год`,
        },
        {
          property: 'og:description',
          name: 'og:description',
          content: `Свежие промокоды, скидки и акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год, а также эксклюзивные купоны. бегом za халявой!`,
        },
        {
          property: 'og:url',
          // @ts-ignore
          content: `https://za-halyavoi.ru${this.$route.fullPath}`,
        },
        {
          property: 'og:image',
          content: 'https://za-halyavoi.ru/logo.png',
        },
        {
          property: 'og:type',
          content: 'article',
        },
        {
          property: 'og:site_name',
          content: 'за халявой',
        },
        {
          property: 'og:image:url',
          content: 'https://za-halyavoi.ru/logo.png',
        },
      ],
      link: [
        {
          rel: 'canonical',
          // @ts-ignore
          href: 'https://za-halyavoi.ru/contacts',
        },
      ],
    }
  },
  methods: {
    async validateForm() {
      const schema = yup.object().shape({
        name: yup.string().required().min(2),
        email: yup.string().required().email(),
        message: yup.string().required().min(10).max(2000),
        date: yup.date().default(function () {
          return new Date()
        }),
      })

      return await schema.isValid(this.formData)
    },
    async fetchForm() {
      try {
        this.validate = ''
        this.disabledForm = true
        const validate = await this.validateForm()

        if (!validate) {
          this.validate = 'Некорректный email или имя'
          this.disabledForm = false
          return
        }

        await this.$api.post('/petition', this.formData)
        this.formData = {
          name: '',
          email: '',
          message: '',
          date: new Date(),
        }
        this.ok = true
      } catch (e) {
        console.log(e)
        this.disabledForm = false
        this.error = true
      }
    },
  },
}
</script>
