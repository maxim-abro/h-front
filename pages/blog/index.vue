<template>
  <h1 class="5xl">Скоро здесь будет блог</h1>
</template>

<script lang="ts">

export default {
  head():any {
    return {
      // @ts-ignore
      title: `Блог про шоппинг, промокоды, акции, купоны на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год.`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          // @ts-ignore
          content: `Блог про шоппинг, промокоды, акции, купоны - Свежие промокоды, скидки и акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'блог, новости, промокоды, скидки, акции, магазины, акция, промокод, скидка'
        },
        {
          hid: "og:title",
          name: 'og:title',
          // @ts-ignore
          content: `Блог про шоппинг, промокоды, акции, купоны на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год.`
        },
        {
          hid: "og:description",
          name: "og:description",
          // @ts-ignore
          content: `Блог про шоппинг, промокоды, акции, купоны - Свежие промокоды, скидки и акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`
        },
        {
          hid: "og:url",
          name: 'og:url',
          // @ts-ignore
          content: `https://za-halyavoi.ru${this.$route.fullPath}`
        },
        {
          hid: "og:image",
          name: 'og:image',
          content: "https://za-halyavoi.ru/logo.png"
        },
        {
          hid: "og:type",
          name: 'og:type',
          content: "article"
        },
        {
          hid: "og:site_name",
          name: 'og:site_name',
          content: "за халявой"
        },
        {
          hid: "og:image:url",
          name: 'og:image:url',
          content: "https://za-halyavoi.ru/logo.png"
        },
      ],
      link: [
        {
          rel: 'canonical',
          // @ts-ignore
          href: 'https://za-halyavoi.ru/blog'
        }
      ]
    }
  }
}
</script>
