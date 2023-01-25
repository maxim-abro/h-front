<template>
<div class="">
  <m-bread-crumbs
    :crumbs="breadCrumbs"
  />
  <h1 class="text-2xl font-bold mb-8">Добавление вашего купона для "{{ seo.title }}"</h1>

  <img :src="`https://za-halyavoi.ru/api/static/${shop.image}`" :alt="seo.title">

  <form action="">
    <div class="grid grid-cols-2 gap-8 mb-8">
      <div class="">
        <div class="font-bold">Промокод</div>
        <m-input type="text"/>
        <small>Оставьте поле пустым, если промокод не требуется</small>
      </div>

      <div class="">
        <div class="font-bold">Дата окончания акции</div>
        <m-input type="date"/>
      </div>
    </div>

    <div class="font-bold">Описание акции</div>
    <textarea class="w-full focus:outline-0 rounded p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary placeholder-zinc-800 text-zinc-900 bg-gray-200"></textarea>
    <small>Минимум 10 символов</small>

    <div
      style="height: 100px"
      id="captcha-container"
      class="smart-captcha"
      data-sitekey="d8jFIYYKucfxlyJcqWWOshC5fOjXZkDfZyweKSTf"
    ></div>

  </form>
</div>
</template>

<script>

export default {
  head() {
    return {
      title: `Добавить промокод для магазина ${this.seo.title} на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год.`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.seo.description.slice(0, 300) + "..." + " добавление промокода.",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `сайты, алфавит, промокоды, скидки, акции, магазины, акция, промокод, скидка, ${this.seo.title}, ${this.$store.state.seo.month}, ${this.$store.state.seo.year}`,
        },
        {
          property: "og:title",
          content: `Добавить промокод для магазина ${this.seo.title} на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год.`
        },
        {
          property: "og:description",
          content: this.seo.description
        },
        {
          property: "og:url",
          content: `https://za-halyavoi.ru${this.$route.fullPath}`
        },
        {
          property: "og:image",
          content: "https://za-halyavoi.ru/logo.png"
        },
        {
          property: "og:type",
          content: "article"
        },
        {
          property: "og:site_name",
          content: "за халявой"
        },
        {
          property: "og:image:url",
          content: "https://za-halyavoi.ru/logo.png"
        },
      ],
      script: [
        {
          src: "https://captcha-api.yandex.ru/captcha.js",
          defer: true,
        }
      ],
      link: [
        {
          rel: 'canonical',
          // @ts-ignore
          href: 'https://za-halyavoi.ru/shop/add/' + this.$route.params.uin
        }
      ]
    }
  },
  data() {
    return {
      shop: null,
      breadCrumbs: [],
      seo: {
        title: "",
        description: "",
      },
    }
  },
  methods: {

  },
  async asyncData({$api, route}) {
    const shop = await $api.get(`/shop/${route.params.uin}`);

    const breadCrumbs = [
      {link: '/categories', title: 'Категории сайтов'},
      {link: `/categories/${shop.data.category.uin}`, title: shop.data.category.title},
      {link: `/shop/${route.params.uin}`, title: shop.data.title},
      {title: "Добавление купона"},
    ];

    return {
      shop: shop.data,
      seo: {
        title: shop.data.title,
        description: shop.data.description,
      },
      breadCrumbs,
    }
  },
}
</script>
