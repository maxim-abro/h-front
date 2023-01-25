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
          property: "og:title",
          // @ts-ignore
          content: `Блог про шоппинг, промокоды, акции, купоны на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год.`
        },
        {
          property: "og:description",
          // @ts-ignore
          content: `Блог про шоппинг, промокоды, акции, купоны - Свежие промокоды, скидки и акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`
        },
        {
          property: "og:url",
          // @ts-ignore
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
